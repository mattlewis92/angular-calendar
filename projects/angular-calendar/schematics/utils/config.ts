import { Tree, SchematicsException } from '@angular-devkit/schematics';
import { getWorkspace } from '@schematics/angular/utility/config';
import {
  WorkspaceProject,
  WorkspaceSchema
} from '@schematics/angular/utility/workspace-models';

import { getProjectFromWorkspace } from '.';

const ANGULAR_CONFIG_PATH = 'angular.json';

export function addStyle(
  host: Tree,
  stylePath: string,
  projectName?: string
): void {
  const workspace = getWorkspace(host);
  const appConfig = getAngularAppConfig(workspace, projectName);

  if (appConfig) {
    appConfig.architect.build.options.styles.unshift(stylePath);
    appConfig.architect.test.options.styles.unshift(stylePath);

    writeConfig(host, workspace);
  } else {
    throw new SchematicsException(`project configuration could not be found`);
  }
}

function writeConfig(host: Tree, config: WorkspaceSchema): void {
  const DEFAULT_ANGULAR_INDENTION = 2;
  host.overwrite(
    ANGULAR_CONFIG_PATH,
    JSON.stringify(config, null, DEFAULT_ANGULAR_INDENTION)
  );
}

function isAngularBrowserProject(projectConfig: any): boolean {
  if (projectConfig.projectType === 'application') {
    const buildConfig = projectConfig.architect.build;
    return buildConfig.builder === '@angular-devkit/build-angular:browser';
  }

  return false;
}

function getAngularAppConfig(
  workspace: WorkspaceSchema,
  projectName: string
): WorkspaceProject | null {
  const projectConfig = getProjectFromWorkspace(
    workspace,
    projectName ? projectName : workspace.defaultProject
  );

  return isAngularBrowserProject(projectConfig) ? projectConfig : null;
}
