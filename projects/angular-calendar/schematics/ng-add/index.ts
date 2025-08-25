import * as ts from '@schematics/angular/third_party/github.com/Microsoft/TypeScript/lib/typescript';
import {
  Rule,
  SchematicContext,
  Tree,
  chain,
  source,
  mergeWith,
  SchematicsException,
} from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import { getAppModulePath } from '@schematics/angular/utility/ng-ast-utils';
import { insertImport } from '@schematics/angular/utility/ast-utils';
import { InsertChange } from '@schematics/angular/utility/change';
import {
  getWorkspace,
  ProjectDefinition,
} from '@schematics/angular/utility/workspace';
import {
  addPackageJsonDependency,
  NodeDependency,
  NodeDependencyType,
} from '@schematics/angular/utility/dependencies';
import { normalize } from '@angular-devkit/core';

import {
  addModuleImportToRootModule,
  addStyle,
  getSourceFile,
  getProjectMainFile,
  getProjectFromWorkspace,
  insertWildcardImport,
  insertAfterImports,
  isStandaloneComponent,
  addImportsToComponent,
  addProvidersToComponent,
} from '../utils';

import { Schema } from './schema';
import {
  dateFnsVersion,
  momentVersion,
  angularCalendarVersion,
  angularDraggableDroppableVersion,
  angularResizableElementVersion,
} from './version-names';

export default function (options: Schema): Rule {
  // Determine which setup strategy to use
  const setupStrategy = getSetupStrategy(options);

  return chain([
    addPackageJsonDependencies(options),
    installPackageJsonDependencies(),
    setupStrategy,
    addAngularCalendarStyle(options),
  ]);
}

function getSetupStrategy(options: Schema): Rule {
  return options.standalone
    ? addToStandaloneComponent(options)
    : addModuleToImports(options);
}

function installPackageJsonDependencies(): Rule {
  return (host: Tree, context: SchematicContext) => {
    context.addTask(new NodePackageInstallTask());
    context.logger.log('info', `Installing angular calendar dependencies...`);

    return host;
  };
}

function addPackageJsonDependencies(options: Schema): Rule {
  return (host: Tree, context: SchematicContext) => {
    const dateAdapters: { [key: string]: string } = {
      moment: momentVersion,
      'date-fns': dateFnsVersion,
    };

    const angularCalendarDependency: NodeDependency = nodeDependencyFactory(
      'angular-calendar',
      angularCalendarVersion,
    );
    const dateAdapterLibrary = options.dateAdapter;
    const dateAdapterLibraryDependency: NodeDependency = nodeDependencyFactory(
      dateAdapterLibrary,
      dateAdapters[dateAdapterLibrary],
    );
    const angularDraggableDroppableDependency: NodeDependency =
      nodeDependencyFactory(
        'angular-draggable-droppable',
        angularDraggableDroppableVersion,
      );
    const angularResizableElementDependency: NodeDependency =
      nodeDependencyFactory(
        'angular-resizable-element',
        angularResizableElementVersion,
      );

    addPackageJsonDependency(host, angularCalendarDependency);
    context.logger.log(
      'info',
      `Added "${angularCalendarDependency.name}" into ${angularCalendarDependency.type}`,
    );

    addPackageJsonDependency(host, dateAdapterLibraryDependency);
    context.logger.log(
      'info',
      `Added "${dateAdapterLibraryDependency.name}" into ${dateAdapterLibraryDependency.type}`,
    );

    addPackageJsonDependency(host, angularDraggableDroppableDependency);
    context.logger.log(
      'info',
      `Added "${angularDraggableDroppableDependency.name}" into ${angularDraggableDroppableDependency.type}`,
    );

    addPackageJsonDependency(host, angularResizableElementDependency);
    context.logger.log(
      'info',
      `Added "${angularResizableElementDependency.name}" into ${angularResizableElementDependency.type}`,
    );

    return host;
  };
}

function nodeDependencyFactory(
  packageName: string,
  version: string,
): NodeDependency {
  return {
    type: NodeDependencyType.Default,
    name: packageName,
    version,
    overwrite: true,
  };
}

function addToStandaloneComponent(options: Schema): Rule {
  return async (host: Tree, context: SchematicContext) => {
    context.logger.log(
      'info',
      `Adding calendar imports and providers to standalone component...`,
    );

    const workspace = await getWorkspace(host);
    const project = getProjectFromWorkspace(workspace, options.projectName);
    const mainPath = getProjectMainFile(project);

    let componentPath: string;
    if (options.installToPath) {
      // User specified a component path
      componentPath = normalize(project.root + '/' + options.installToPath);
    } else {
      // Use default app component
      componentPath = getAppComponentPath(host, mainPath, project);
    }

    const componentSource = getSourceFile(host, componentPath);

    // Check if it's a standalone component
    const standalone = isStandaloneComponent(componentSource);
    if (standalone === false) {
      throw new SchematicsException(
        `Component at ${componentPath} has standalone: false. Please use a standalone component or select the NgModule option.`,
      );
    }

    // Add imports to the component
    const calendarImports = [
      'CalendarPreviousViewDirective',
      'CalendarTodayDirective',
      'CalendarNextViewDirective',
      'CalendarMonthViewComponent',
      'CalendarWeekViewComponent',
      'CalendarDayViewComponent',
      'CalendarDatePipe',
    ];

    // Add providers to the component
    const providerFunction = `provideCalendar({\n      provide: DateAdapter,\n      useFactory: ${
      options.dateAdapter === 'moment'
        ? 'momentAdapterFactory'
        : 'adapterFactory'
    },\n    })`;

    const updates: InsertChange[] = [
      // Add import statements
      insertImport(
        componentSource as ts.SourceFile,
        componentPath,
        `${calendarImports.join(', ')}, DateAdapter, provideCalendar`,
        'angular-calendar',
      ) as InsertChange,
      insertImport(
        componentSource as ts.SourceFile,
        componentPath,
        'adapterFactory',
        `angular-calendar/date-adapters/${options.dateAdapter}`,
      ) as InsertChange,
    ];

    if (options.dateAdapter === 'moment') {
      updates.push(
        insertWildcardImport(
          componentSource as ts.SourceFile,
          componentPath,
          'moment',
          'moment',
        ) as InsertChange,
      );
      updates.push(
        insertAfterImports(
          componentSource as ts.SourceFile,
          componentPath,
          `;\n\nexport function momentAdapterFactory() {\n  return adapterFactory(moment);\n}`,
        ) as InsertChange,
      );
    }

    // Add imports and providers to component decorator
    const importsChanges = addImportsToComponent(
      componentSource,
      componentPath,
      calendarImports,
    );
    const providersChanges = addProvidersToComponent(
      componentSource,
      componentPath,
      [providerFunction],
    );

    const recorder = host.beginUpdate(componentPath);
    [...updates, ...importsChanges, ...providersChanges].forEach((update) => {
      if (update instanceof InsertChange) {
        recorder.insertLeft(update.pos, update.toAdd);
      }
    });
    host.commitUpdate(recorder);

    return mergeWith(source(host));
  };
}

/**
 * Get the path to the default app component
 */
function getAppComponentPath(
  host: Tree,
  mainPath: string,
  project: ProjectDefinition,
): string {
  // Try common app component paths (both old and new Angular naming conventions)
  const possiblePaths = [
    `${project.root}/src/app/app.component.ts`, // Traditional naming
    `${project.root}/src/app/app.ts`, // Angular 17+ standalone naming
    `${project.root}/src/app/app-component.ts`, // Fallback
  ];

  for (const path of possiblePaths) {
    if (host.exists(path)) {
      return path;
    }
  }

  // Return first possible path as fallback (will be checked for existence elsewhere)
  return possiblePaths[0];
}

function addModuleToImports(options: Schema): Rule {
  return async (host: Tree, context: SchematicContext) => {
    context.logger.log('info', `Add modules imports options...`);

    const workspace = await getWorkspace(host);
    const project = getProjectFromWorkspace(workspace, options.projectName);
    const mainPath = getProjectMainFile(project);
    const appModulePath = options.installToPath
      ? normalize(project.root + '/' + options.installToPath)
      : getAppModulePath(host, mainPath);

    const moduleName = `CalendarModule.forRoot({ provide: DateAdapter, useFactory: ${
      options.dateAdapter === 'moment'
        ? 'momentAdapterFactory'
        : 'adapterFactory'
    } })`;
    const moduleCalendarSrc = 'angular-calendar';

    addModuleImportToRootModule(host, moduleName, moduleCalendarSrc, project);

    const moduleSource = getSourceFile(host, appModulePath);

    const updates: InsertChange[] = [
      insertImport(
        moduleSource as ts.SourceFile,
        appModulePath,
        'DateAdapter',
        moduleCalendarSrc,
      ) as InsertChange,
      insertImport(
        moduleSource as ts.SourceFile,
        appModulePath,
        'adapterFactory',
        `${moduleCalendarSrc}/date-adapters/${options.dateAdapter}`,
      ) as InsertChange,
    ];

    if (options.dateAdapter === 'moment') {
      updates.push(
        insertWildcardImport(
          moduleSource as ts.SourceFile,
          appModulePath,
          'moment',
          'moment',
        ) as InsertChange,
      );
      updates.push(
        insertAfterImports(
          moduleSource as ts.SourceFile,
          appModulePath,
          `;\n\nexport function momentAdapterFactory() {
  return adapterFactory(moment);
}`,
        ) as InsertChange,
      );
    }

    const recorder = host.beginUpdate(appModulePath);
    updates.forEach((update) => {
      recorder.insertLeft(update.pos, update.toAdd);
    });
    host.commitUpdate(recorder);

    return mergeWith(source(host));
  };
}

function addAngularCalendarStyle(options: Schema): Rule {
  const libStylePath = 'node_modules/angular-calendar/css/angular-calendar.css';
  return addStyle(libStylePath, options.projectName);
}
