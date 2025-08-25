import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';

import * as path from 'path';
import { expect } from 'chai';

import { createTestApp, createStandaloneTestApp } from '../testing/workspace';
import { Schema } from './schema';
import {
  angularCalendarVersion,
  momentVersion,
  angularDraggableDroppableVersion,
  angularResizableElementVersion,
} from './version-names';
import { getProjectFromWorkspace, getProjectTargetOptions } from '../utils';
import { getWorkspace } from '@schematics/angular/utility/workspace';

const collectionPath = path.join(__dirname, '../collection.json');

export interface PackageJson {
  dependencies: DependencyMap;
  devDependencies: DependencyMap;
}

export interface DependencyMap {
  [dependencyName: string]: string;
}

const defaultAngularCalendarStylePath =
  'node_modules/angular-calendar/css/angular-calendar.css';

describe('angular-calendar schematics', () => {
  const projectName = 'angular-calendar-app';
  const defaultOptions = {} as Schema;
  let tree: UnitTestTree;
  let appTree: UnitTestTree;
  let runner: SchematicTestRunner;
  let packageJsonPath: string;
  let packageJson: PackageJson;

  beforeEach(async () => {
    appTree = await createTestApp({ name: projectName });
    runner = new SchematicTestRunner(
      'angular-calendar-schematics',
      collectionPath,
    );
    packageJsonPath = '/package.json';
  });

  it('should add angular-calendar to dependencies', async () => {
    const { name, version } = {
      name: 'angular-calendar',
      version: angularCalendarVersion,
    };
    tree = await runner.runSchematic('ng-add', defaultOptions, appTree);
    packageJson = JSON.parse(tree.readContent(packageJsonPath));
    expect(packageJson.dependencies[name]).equal(version);
  });

  it('should add date adapter to dependencies based on option selected ', async () => {
    const { name, version } = { name: 'moment', version: momentVersion };
    defaultOptions.dateAdapter = 'moment';
    tree = await runner.runSchematic('ng-add', defaultOptions, appTree);
    packageJson = JSON.parse(tree.readContent(packageJsonPath));
    expect(packageJson.dependencies[name]).equal(version);
  });

  it('should schedule install dependencies task', async () => {
    await runner.runSchematic('ng-add', defaultOptions, appTree);
    const tasks = runner.tasks;
    expect(tasks.length).to.equal(1);
  });

  it('should import angular-calendar module to root module', async () => {
    const rootModulePath = `/projects/${projectName}/src/app/app-module.ts`;
    tree = await runner.runSchematic('ng-add', defaultOptions, appTree);
    expect(tree.files).contain(rootModulePath);

    const rootModule = tree.readContent(rootModulePath);

    const calendarModuleImport = `import { CalendarModule, DateAdapter } from 'angular-calendar';`;
    expect(rootModule).contain(calendarModuleImport);
  });

  it('should import angular-calendar module to root module when passed as an option', async () => {
    const rootModulePath = `/projects/${projectName}/src/app/app-module.ts`;
    tree = await runner.runSchematic(
      'ng-add',
      {
        ...defaultOptions,
        module: 'src/app/app-module.ts',
      },
      appTree,
    );
    expect(tree.files).contain(rootModulePath);

    const rootModule = tree.readContent(rootModulePath);

    const calendarModuleImport = `import { CalendarModule, DateAdapter } from 'angular-calendar';`;
    expect(rootModule).contain(calendarModuleImport);
  });

  it('should add angular-calendar css to architect builder', async () => {
    tree = await runner.runSchematic('ng-add', defaultOptions, appTree);

    const workspace = await getWorkspace(tree);
    const project = getProjectFromWorkspace(workspace);
    const styles = getProjectTargetOptions(project, 'build').styles;
    const stylesTest = getProjectTargetOptions(project, 'test').styles;

    expect(styles[0]).to.contains(defaultAngularCalendarStylePath);
    expect(stylesTest[0]).to.contains(defaultAngularCalendarStylePath);
  });

  it('should add the momentAdapterFactory when using moment', async () => {
    const rootModulePath = `/projects/${projectName}/src/app/app-module.ts`;
    tree = await runner.runSchematic(
      'ng-add',
      {
        ...defaultOptions,
        dateAdapter: 'moment',
      },
      appTree,
    );
    expect(tree.files).contain(rootModulePath);

    const rootModule = tree.readContent(rootModulePath);

    expect(rootModule).contain(
      `import { adapterFactory } from 'angular-calendar/date-adapters/moment';`,
    );
    expect(rootModule).contain(`import * as moment from 'moment';`);
    expect(rootModule).contain(`export function momentAdapterFactory() {
  return adapterFactory(moment);
}`);
    expect(rootModule).contain(`useFactory: momentAdapterFactory`);
  });

  it('should add angular-draggable-droppable to dependencies', async () => {
    const { name, version } = {
      name: 'angular-draggable-droppable',
      version: angularDraggableDroppableVersion,
    };
    tree = await runner.runSchematic('ng-add', defaultOptions, appTree);
    packageJson = JSON.parse(tree.readContent(packageJsonPath));
    expect(packageJson.dependencies[name]).equal(version);
  });

  it('should add angular-resizable-element to dependencies', async () => {
    const { name, version } = {
      name: 'angular-resizable-element',
      version: angularResizableElementVersion,
    };
    tree = await runner.runSchematic('ng-add', defaultOptions, appTree);
    packageJson = JSON.parse(tree.readContent(packageJsonPath));
    expect(packageJson.dependencies[name]).equal(version);
  });

  describe('standalone component support', () => {
    let standaloneAppTree: UnitTestTree;

    beforeEach(async () => {
      // Create a standalone app
      standaloneAppTree = await createStandaloneTestApp({ name: projectName });
    });

    it('should install to standalone component when standalone=true', async () => {
      // In standalone apps, the component file is named app.ts, not app.component.ts
      const componentPath = `/projects/${projectName}/src/app/app.ts`;
      tree = await runner.runSchematic(
        'ng-add',
        {
          ...defaultOptions,
          standalone: true,
        },
        standaloneAppTree,
      );

      expect(tree.files).contain(componentPath);
      const component = tree.readContent(componentPath);

      // Check that standalone component has calendar imports
      expect(component).contain('CalendarPreviousViewDirective');
      expect(component).contain('CalendarTodayDirective');
      expect(component).contain('CalendarNextViewDirective');
      expect(component).contain('CalendarMonthViewComponent');
      expect(component).contain('CalendarWeekViewComponent');
      expect(component).contain('CalendarDayViewComponent');
      expect(component).contain('CalendarDatePipe');

      // Check that it has the providers
      expect(component).contain('provideCalendar');
      expect(component).contain('DateAdapter');
      expect(component).contain('adapterFactory');
    });

    it('should install to standalone component with moment adapter', async () => {
      const componentPath = `/projects/${projectName}/src/app/app.ts`;
      tree = await runner.runSchematic(
        'ng-add',
        {
          ...defaultOptions,
          standalone: true,
          dateAdapter: 'moment',
        },
        standaloneAppTree,
      );

      expect(tree.files).contain(componentPath);
      const component = tree.readContent(componentPath);

      // Check that it has moment-specific imports
      expect(component).contain("import * as moment from 'moment'");
      expect(component).contain('momentAdapterFactory');
      expect(component).contain('useFactory: momentAdapterFactory');
    });

    it('should throw error when component has standalone: false', async () => {
      // First create a component with standalone: false
      const componentPath = `/projects/${projectName}/src/app/non-standalone.component.ts`;
      standaloneAppTree.create(
        componentPath,
        `
import { Component } from '@angular/core';

@Component({
  selector: 'app-non-standalone',
  standalone: false,
  template: '<div>Non-standalone component</div>'
})
export class NonStandaloneComponent {}
      `,
      );

      let error: any;
      try {
        tree = await runner.runSchematic(
          'ng-add',
          {
            ...defaultOptions,
            standalone: true,
            module: 'src/app/non-standalone.component.ts',
          },
          standaloneAppTree,
        );
      } catch (e) {
        error = e;
      }

      expect(error).to.exist;
      expect(error.message).contain('has standalone: false');
    });

    it('should install to custom component path when provided', async () => {
      const customComponentPath = `/projects/${projectName}/src/app/custom.component.ts`;
      // Create custom component
      standaloneAppTree.create(
        customComponentPath,
        `
import { Component } from '@angular/core';

@Component({
  selector: 'app-custom',
  template: '<div>Custom component</div>'
})
export class CustomComponent {}
      `,
      );

      tree = await runner.runSchematic(
        'ng-add',
        {
          ...defaultOptions,
          standalone: true,
          module: 'src/app/custom.component.ts',
        },
        standaloneAppTree,
      );

      expect(tree.files).contain(customComponentPath);
      const component = tree.readContent(customComponentPath);

      // Check that custom component has calendar imports
      expect(component).contain('CalendarPreviousViewDirective');
      expect(component).contain('provideCalendar');
    });

    it.skip('should auto-detect standalone components and use standalone approach', async () => {
      // TODO: Implement auto-detection in a future version
      const componentPath = `/projects/${projectName}/src/app/app.ts`;
      tree = await runner.runSchematic(
        'ng-add',
        {
          ...defaultOptions,
          // Note: standalone is not explicitly set, should auto-detect
        },
        standaloneAppTree,
      );

      expect(tree.files).contain(componentPath);
      const component = tree.readContent(componentPath);

      // Should detect standalone and add standalone imports
      expect(component).contain('CalendarPreviousViewDirective');
      expect(component).contain('provideCalendar');
    });
  });

  it('should auto-detect NgModule projects and use NgModule approach', async () => {
    const rootModulePath = `/projects/${projectName}/src/app/app-module.ts`;
    tree = await runner.runSchematic(
      'ng-add',
      {
        ...defaultOptions,
        // Note: standalone is not explicitly set, should auto-detect NgModule
      },
      appTree,
    );

    expect(tree.files).contain(rootModulePath);
    const rootModule = tree.readContent(rootModulePath);

    // Should detect NgModule and add NgModule imports
    const calendarModuleImport = `import { CalendarModule, DateAdapter } from 'angular-calendar';`;
    expect(rootModule).contain(calendarModuleImport);
  });
});
