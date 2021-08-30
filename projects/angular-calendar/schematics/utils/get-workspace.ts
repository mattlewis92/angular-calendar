import { JsonParseMode, parseJson } from '@angular-devkit/core';
import { SchematicsException, Tree } from '@angular-devkit/schematics';
import { WorkspaceSchema } from '@schematics/angular/utility/workspace-models';

export function getWorkspacePath(host: Tree): string {
  const possibleFiles = ['/angular.json', '/.angular.json'];
  const path = possibleFiles.filter((file) => host.exists(file))[0];

  return path;
}

export function getWorkspace(host: Tree): WorkspaceSchema {
  const path = getWorkspacePath(host);
  const configBuffer = host.read(path);
  if (configBuffer === null) {
    throw new SchematicsException(`Could not find (${path})`);
  }
  const content = configBuffer.toString();

  return parseJson(content, JsonParseMode.Loose) as {} as WorkspaceSchema;
}
