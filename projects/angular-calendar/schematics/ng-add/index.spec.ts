import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';

import * as path from 'path';
import { expect } from 'chai';

import { createTestApp } from '../testing/workspace';
import { Schema } from './schema';
import { angularCalendarVersion, momentVersion } from './version-names';
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
      collectionPath
    );
    packageJsonPath = '/package.json';
  });

  it('should add angular-calendar to dependencies', async () => {
    const { name, version } = {
      name: 'angular-calendar',
      version: angularCalendarVersion,
    };
    tree = await runner
      .runSchematicAsync('ng-add', defaultOptions, appTree)
      .toPromise();
    packageJson = JSON.parse(tree.readContent(packageJsonPath));
    expect(packageJson.dependencies[name]).equal(version);
  });

  it('should add date adapter to dependencies based on option selected ', async () => {
    const { name, version } = { name: 'moment', version: momentVersion };
    defaultOptions.dateAdapter = 'moment';
    tree = await runner
      .runSchematicAsync('ng-add', defaultOptions, appTree)
      .toPromise();
    packageJson = JSON.parse(tree.readContent(packageJsonPath));
    expect(packageJson.dependencies[name]).equal(version);
  });

  it('should schedule install dependencies task', async () => {
    await runner
      .runSchematicAsync('ng-add', defaultOptions, appTree)
      .toPromise();
    const tasks = runner.tasks;
    expect(tasks.length).to.equal(1);
  });

  it('should import angular-calendar module to root module', async () => {
    const rootModulePath = `/projects/${projectName}/src/app/app.module.ts`;
    tree = await runner
      .runSchematicAsync('ng-add', defaultOptions, appTree)
      .toPromise();
    expect(tree.files).contain(rootModulePath);

    const rootModule = tree.readContent(rootModulePath);

    const calendarModuleImport = `import { CalendarModule, DateAdapter } from 'angular-calendar';`;
    expect(rootModule).contain(calendarModuleImport);
  });

  it('should import angular-calendar module to root module when passed as an option', async () => {
    const rootModulePath = `/projects/${projectName}/src/app/app.module.ts`;
    tree = await runner
      .runSchematicAsync(
        'ng-add',
        {
          ...defaultOptions,
          module: 'src/app/app.module.ts',
        },
        appTree
      )
      .toPromise();
    expect(tree.files).contain(rootModulePath);

    const rootModule = tree.readContent(rootModulePath);

    const calendarModuleImport = `import { CalendarModule, DateAdapter } from 'angular-calendar';`;
    expect(rootModule).contain(calendarModuleImport);
  });

  it('should add angular-calendar css to architect builder', async () => {
    tree = await runner
      .runSchematicAsync('ng-add', defaultOptions, appTree)
      .toPromise();

    const workspace = await getWorkspace(tree);
    const project = getProjectFromWorkspace(workspace);
    const styles = getProjectTargetOptions(project, 'build').styles;
    const stylesTest = getProjectTargetOptions(project, 'test').styles;

    expect(styles[0]).to.contains(defaultAngularCalendarStylePath);
    expect(stylesTest[0]).to.contains(defaultAngularCalendarStylePath);
  });

  it('should add the momentAdapterFactory when using moment', async () => {
    const rootModulePath = `/projects/${projectName}/src/app/app.module.ts`;
    tree = await runner
      .runSchematicAsync(
        'ng-add',
        {
          ...defaultOptions,
          dateAdapter: 'moment',
        },
        appTree
      )
      .toPromise();
    expect(tree.files).contain(rootModulePath);

    const rootModule = tree.readContent(rootModulePath);

    expect(rootModule).contain(
      `import { adapterFactory } from 'angular-calendar/date-adapters/moment';`
    );
    expect(rootModule).contain(`import * as moment from 'moment';`);
    expect(rootModule).contain(`export function momentAdapterFactory() {
  return adapterFactory(moment);
}`);
    expect(rootModule).contain(`useFactory: momentAdapterFactory`);
  });
});
