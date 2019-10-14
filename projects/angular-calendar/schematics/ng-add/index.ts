import {
  Rule,
  SchematicContext,
  Tree,
  chain
} from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import { getWorkspace } from '@schematics/angular/utility/config';
import { getAppModulePath } from '@schematics/angular/utility/ng-ast-utils';
import { insertImport } from '@schematics/angular/utility/ast-utils';
import { InsertChange } from '@schematics/angular/utility/change';
import {
  addPackageJsonDependency,
  NodeDependency,
  NodeDependencyType
} from '@schematics/angular/utility/dependencies';

import {
  addModuleImportToRootModule,
  getSourceFile,
  getProjectMainFile,
  getProjectFromWorkspace
} from '../utils';

import { Schema } from './schema';

export default function(options: Schema): Rule {
  return chain([
    addPackageJsonDependencies(options),
    installPackageJsonDependencies(),
    addModuleToImports(options)
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
      moment: '2.24.0',
      'date-fns': '1.30.1'
    };

    const angularCalendarDependency: NodeDependency = _nodeDependencyFactory(
      'angular-calendar',
      '0.27.19'
    );
    const dateAdapterLibrary = options.dateAdapter;
    const dateAdapterLibraryDependency: NodeDependency = _nodeDependencyFactory(
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

function _nodeDependencyFactory(
  packageName: string,
  version: string
): NodeDependency {
  return {
    type: NodeDependencyType.Default,
    name: packageName,
    version,
    overwrite: true
  };
}

function addModuleToImports(options: Schema): Rule {
  return (host: Tree, context: SchematicContext) => {
    context.logger.log(
      'info',
      `add modules imports options...${JSON.stringify(options)}`
    );

    const workspace = getWorkspace(host);
    const project = getProjectFromWorkspace(
      workspace,
      options.projectName
        ? options.projectName
        : Object.keys(workspace['projects'])[0]
    );
    const mainPath = getProjectMainFile(project);
    const appModulePath = options.module
      ? options.module
      : getAppModulePath(host, mainPath);
    const moduleSource = getSourceFile(host, appModulePath);
    const moduleName = `CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory })`;
    const moduleCalendarSrc = 'angular-calendar';
    const PEER_DEPENDENCIES = ['DateAdapter', 'adapteFactory'];

    addModuleImportToRootModule(host, moduleName, moduleCalendarSrc, project);

    const peerDependencyChange1 = insertImport(
      moduleSource as any,
      appModulePath,
      PEER_DEPENDENCIES[0],
      moduleCalendarSrc
    ) as InsertChange;

    const peerDependencyChange2 = insertImport(
      moduleSource as any,
      appModulePath,
      PEER_DEPENDENCIES[1],
      `${moduleCalendarSrc}/date-adapters/date-fns`
    ) as InsertChange;

    const recorder = host.beginUpdate(appModulePath);

    recorder.insertLeft(peerDependencyChange1.pos, peerDependencyChange1.toAdd);
    recorder.insertLeft(peerDependencyChange2.pos, peerDependencyChange2.toAdd);
    host.commitUpdate(recorder);

    return host;
  };
}
