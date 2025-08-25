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
  project: ProjectDefinition,
) {
  const mainPath = getProjectMainFile(project);
  const appModulePath = getAppModulePath(host, mainPath);
  addModuleImportToModule(
    host,
    appModulePath,
    importedModuleName,
    importedModulePath,
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
  importedModulePath: string,
) {
  const moduleSource = getSourceFile(host, moduleToImportIn);

  if (!moduleSource) {
    throw new SchematicsException(`Module not found: ${moduleToImportIn}`);
  }

  const changes = addImportToModule(
    moduleSource,
    moduleToImportIn,
    importedModuleName,
    importedModulePath,
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
  toInsert: string,
): Change {
  const allImports = findNodes(source, ts.SyntaxKind.ImportDeclaration);

  return insertAfterLastOccurrence(
    allImports,
    toInsert,
    fileToEdit,
    0,
    ts.SyntaxKind.StringLiteral,
  );
}

export function insertWildcardImport(
  source: ts.SourceFile,
  fileToEdit: string,
  symbolName: string,
  fileName: string,
): Change {
  return insertAfterImports(
    source,
    fileToEdit,
    `;\nimport * as ${symbolName} from '${fileName}'`,
  );
}

/**
 * Check if a component is standalone by examining its @Component decorator
 * @param source TypeScript source file
 * @returns true if standalone: true, false if standalone: false, undefined if not specified
 */
export function isStandaloneComponent(
  source: ts.SourceFile,
): boolean | undefined {
  const nodes = findNodes(source, ts.SyntaxKind.Decorator);

  for (const node of nodes) {
    if (!ts.isDecorator(node)) continue;

    const callExpr = node.expression;
    if (!ts.isCallExpression(callExpr)) continue;

    const identifier = callExpr.expression;
    if (!ts.isIdentifier(identifier) || identifier.text !== 'Component')
      continue;

    const args = callExpr.arguments;
    if (args.length === 0) continue;

    const configArg = args[0];
    if (!ts.isObjectLiteralExpression(configArg)) continue;

    for (const prop of configArg.properties) {
      if (!ts.isPropertyAssignment(prop)) continue;

      const name = prop.name;
      if (!ts.isIdentifier(name) || name.text !== 'standalone') continue;

      const value = prop.initializer;
      if (ts.isLiteralExpression(value)) {
        return value.text === 'true';
      }
      if (value.kind === ts.SyntaxKind.TrueKeyword) {
        return true;
      }
      if (value.kind === ts.SyntaxKind.FalseKeyword) {
        return false;
      }
    }
  }

  return undefined; // standalone not specified - defaults to true
}

/**
 * Find the @Component decorator in a source file
 */
function findComponentDecorator(
  source: ts.SourceFile,
): ts.Decorator | undefined {
  const nodes = findNodes(source, ts.SyntaxKind.Decorator);

  for (const node of nodes) {
    if (!ts.isDecorator(node)) continue;

    const callExpr = node.expression;
    if (!ts.isCallExpression(callExpr)) continue;

    const identifier = callExpr.expression;
    if (ts.isIdentifier(identifier) && identifier.text === 'Component') {
      return node;
    }
  }

  return undefined;
}

/**
 * Add imports array to a standalone component's @Component decorator
 */
export function addImportsToComponent(
  source: ts.SourceFile,
  fileToEdit: string,
  imports: string[],
): Change[] {
  const componentDecorator = findComponentDecorator(source);
  if (!componentDecorator) {
    throw new SchematicsException('Could not find @Component decorator');
  }

  const callExpr = componentDecorator.expression as ts.CallExpression;
  const configArg = callExpr.arguments[0] as ts.ObjectLiteralExpression;

  // Find existing imports property
  let importsProperty: ts.PropertyAssignment | undefined;
  for (const prop of configArg.properties) {
    if (
      ts.isPropertyAssignment(prop) &&
      ts.isIdentifier(prop.name) &&
      prop.name.text === 'imports'
    ) {
      importsProperty = prop;
      break;
    }
  }

  const changes: Change[] = [];

  if (importsProperty) {
    // Add to existing imports array
    const importsArray =
      importsProperty.initializer as ts.ArrayLiteralExpression;
    const lastElement = importsArray.elements[importsArray.elements.length - 1];
    const insertPos = lastElement
      ? lastElement.getEnd()
      : importsArray.getStart() + 1;
    const separator = importsArray.elements.length > 0 ? ', ' : '';

    changes.push(
      new InsertChange(fileToEdit, insertPos, separator + imports.join(', ')),
    );
  } else {
    // Add new imports property
    const lastProperty = configArg.properties[configArg.properties.length - 1];
    const insertPos = lastProperty
      ? lastProperty.getEnd()
      : configArg.getStart() + 1;
    const separator = configArg.properties.length > 0 ? ',\n  ' : '\n  ';

    changes.push(
      new InsertChange(
        fileToEdit,
        insertPos,
        `${separator}imports: [${imports.join(', ')}],`,
      ),
    );
  }

  return changes;
}

/**
 * Add providers array to a standalone component's @Component decorator
 */
export function addProvidersToComponent(
  source: ts.SourceFile,
  fileToEdit: string,
  providers: string[],
): Change[] {
  const componentDecorator = findComponentDecorator(source);
  if (!componentDecorator) {
    throw new SchematicsException('Could not find @Component decorator');
  }

  const callExpr = componentDecorator.expression as ts.CallExpression;
  const configArg = callExpr.arguments[0] as ts.ObjectLiteralExpression;

  // Find existing providers property
  let providersProperty: ts.PropertyAssignment | undefined;
  for (const prop of configArg.properties) {
    if (
      ts.isPropertyAssignment(prop) &&
      ts.isIdentifier(prop.name) &&
      prop.name.text === 'providers'
    ) {
      providersProperty = prop;
      break;
    }
  }

  const changes: Change[] = [];

  if (providersProperty) {
    // Add to existing providers array
    const providersArray =
      providersProperty.initializer as ts.ArrayLiteralExpression;
    const lastElement =
      providersArray.elements[providersArray.elements.length - 1];
    const insertPos = lastElement
      ? lastElement.getEnd()
      : providersArray.getStart() + 1;
    const separator = providersArray.elements.length > 0 ? ',\n    ' : '';

    changes.push(
      new InsertChange(
        fileToEdit,
        insertPos,
        separator + providers.join(',\n    '),
      ),
    );
  } else {
    // Add new providers property
    const lastProperty = configArg.properties[configArg.properties.length - 1];
    const insertPos = lastProperty
      ? lastProperty.getEnd()
      : configArg.getStart() + 1;
    const separator = configArg.properties.length > 0 ? ',\n  ' : '\n  ';

    changes.push(
      new InsertChange(
        fileToEdit,
        insertPos,
        `${separator}providers: [\n    ${providers.join(',\n    ')},\n  ],`,
      ),
    );
  }

  return changes;
}
