import * as ts from '@schematics/angular/third_party/github.com/Microsoft/TypeScript/lib/typescript';
import {
  Rule,
  SchematicContext,
  Tree,
  chain,
  source,
  mergeWith,
} from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import { getAppModulePath } from '@schematics/angular/utility/ng-ast-utils';
import { insertImport } from '@schematics/angular/utility/ast-utils';
import { InsertChange } from '@schematics/angular/utility/change';
import { getWorkspace } from '@schematics/angular/utility/workspace';
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
} from '../utils';

import { Schema } from './schema';
import {
  dateFnsVersion,
  momentVersion,
  angularCalendarVersion,
} from './version-names';

export default function (options: Schema): Rule {
  return chain([
    addPackageJsonDependencies(options),
    installPackageJsonDependencies(),
    addModuleToImports(options),
    addAngularCalendarStyle(options),
  ]);
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
      angularCalendarVersion
    );
    const dateAdapterLibrary = options.dateAdapter;
    const dateAdapterLibraryDependency: NodeDependency = nodeDependencyFactory(
      dateAdapterLibrary,
      dateAdapters[dateAdapterLibrary]
    );

    addPackageJsonDependency(host, angularCalendarDependency);
    context.logger.log(
      'info',
      `Added "${angularCalendarDependency.name}" into ${angularCalendarDependency.type}`
    );

    addPackageJsonDependency(host, dateAdapterLibraryDependency);
    context.logger.log(
      'info',
      `Added "${dateAdapterLibraryDependency.name}" into ${dateAdapterLibraryDependency.type}`
    );

    return host;
  };
}

function nodeDependencyFactory(
  packageName: string,
  version: string
): NodeDependency {
  return {
    type: NodeDependencyType.Default,
    name: packageName,
    version,
    overwrite: true,
  };
}

function addModuleToImports(options: Schema): Rule {
  return async (host: Tree, context: SchematicContext) => {
    context.logger.log('info', `Add modules imports options...`);

    const workspace = await getWorkspace(host);
    const project = getProjectFromWorkspace(workspace, options.projectName);
    const mainPath = getProjectMainFile(project);
    const appModulePath = options.module
      ? normalize(project.root + '/' + options.module)
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
        moduleCalendarSrc
      ) as InsertChange,
      insertImport(
        moduleSource as ts.SourceFile,
        appModulePath,
        'adapterFactory',
        `${moduleCalendarSrc}/date-adapters/${options.dateAdapter}`
      ) as InsertChange,
    ];

    if (options.dateAdapter === 'moment') {
      updates.push(
        insertWildcardImport(
          moduleSource as ts.SourceFile,
          appModulePath,
          'moment',
          'moment'
        ) as InsertChange
      );
      updates.push(
        insertAfterImports(
          moduleSource as ts.SourceFile,
          appModulePath,
          `;\n\nexport function momentAdapterFactory() {
  return adapterFactory(moment);
}`
        ) as InsertChange
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
