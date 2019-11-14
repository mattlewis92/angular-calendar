import * as ts from 'typescript';
import { Tree, SchematicsException } from '@angular-devkit/schematics';

/**
 * Reads file from given path and Returns TypeScript source file.
 * @param host {Tree} The source tree.
 * @param path {String} The path to the file to read. Relative to the root of the tree.
 *
 */
export function getSourceFile(host: Tree, path: string): ts.SourceFile {
  const buffer = host.read(path);
  if (!buffer) {
    throw new SchematicsException(`Could not find ${path}!`);
  }

  const content = buffer.toString();
  const sourceFile = ts.createSourceFile(
    path,
    content,
    ts.ScriptTarget.Latest,
    true
  );

  return sourceFile;
}
