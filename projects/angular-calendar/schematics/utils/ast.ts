import { Tree, SchematicsException } from '@angular-devkit/schematics';
import { InsertChange, Change } from '@schematics/angular/utility/change';
import {
  addImportToModule,
  findNodes,
  insertAfterLastOccurrence,
} from '@schematics/angular/utility/ast-utils';
import { getAppModulePath } from '@schematics/angular/utility/ng-ast-utils';
import { WorkspaceProject } from '@schematics/angular/utility/workspace-models';
import * as ts from '@schematics/angular/third_party/github.com/Microsoft/TypeScript/lib/typescript';

import { getSourceFile } from './file';
import { ProjectDefinition } from '@schematics/angular/utility/workspace';
import { getProjectMainFile } from './project-main-file';

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
  project: ProjectDefinition
) {
  const mainPath = getProjectMainFile(project);
  const appModulePath = getAppModulePath(host, mainPath);
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

export function insertAfterImports(
  source: ts.SourceFile,
  fileToEdit: string,
  toInsert: string
): Change {
  const allImports = findNodes(source, ts.SyntaxKind.ImportDeclaration);

  return insertAfterLastOccurrence(
    allImports,
    toInsert,
    fileToEdit,
    0,
    ts.SyntaxKind.StringLiteral
  );
}

export function insertWildcardImport(
  source: ts.SourceFile,
  fileToEdit: string,
  symbolName: string,
  fileName: string
): Change {
  return insertAfterImports(
    source,
    fileToEdit,
    `;\nimport * as ${symbolName} from '${fileName}'`
  );
}
