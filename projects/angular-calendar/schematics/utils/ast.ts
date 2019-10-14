import { Tree, SchematicsException } from '@angular-devkit/schematics';
import { InsertChange, Change } from '@schematics/angular/utility/change';
import { addImportToModule } from '@schematics/angular/utility/ast-utils';
import { getAppModulePath } from '@schematics/angular/utility/ng-ast-utils';
import { WorkspaceProject } from '@schematics/angular/utility/workspace-models';

import { getSourceFile } from './file';

/**
 * Import and add module to the root module.
 * @param host {Tree} The source tree.
 * @param importedModuleName {String} The name of the imported module.
 * @param importedModulePath {String} The location of the imported module.
 * @param project {WorkspaceProject} The workspace project.
 */
export function addModuleImportToRootModule(
  host: Tree,
  importedModuleName: string,
  importedModulePath: string,
  project: WorkspaceProject
) {
  const appModulePath = getAppModulePath(
    host,
    project.architect!.build!.options.main
  );
  addModuleImportToModule(
    host,
    appModulePath,
    importedModuleName,
    importedModulePath
  );
}

/**
 * Import and add module to specific module path.
 * @param host {Tree} The source tree.
 * @param moduleToImportIn {String} The location of the module to import in.
 * @param importedModuleName {String} The name of the imported module.
 * @param importedModulePath {String} The location of the imported module.
 */
function addModuleImportToModule(
  host: Tree,
  moduleToImportIn: string,
  importedModuleName: string,
  importedModulePath: string
) {
  const moduleSource = getSourceFile(host, moduleToImportIn);

  if (!moduleSource) {
    throw new SchematicsException(`Module not found: ${moduleToImportIn}`);
  }

  const changes = addImportToModule(
    moduleSource,
    moduleToImportIn,
    importedModuleName,
    importedModulePath
  );
  const recorder = host.beginUpdate(moduleToImportIn);

  changes
    .filter((change: Change) => change instanceof InsertChange)
    .forEach((change: any) => recorder.insertLeft(change.pos, change.toAdd));

  host.commitUpdate(recorder);
}
