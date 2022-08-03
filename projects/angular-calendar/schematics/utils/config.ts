import { SchematicsException, Rule } from '@angular-devkit/schematics';

import { getProjectFromWorkspace } from '.';
import {
  ProjectDefinition,
  WorkspaceDefinition,
  updateWorkspace,
} from '@schematics/angular/utility/workspace';

function addStyleToTarget(
  project: ProjectDefinition,
  targetName: string,
  stylePath: string
) {
  const target = project.targets.get(targetName);
  return project.targets.set(targetName, {
    ...target,
    options: {
      ...target.options,
      styles: [stylePath, ...(target.options.styles as string[])],
    },
  });
}

export function addStyle(stylePath: string, projectName?: string): Rule {
  return updateWorkspace((workspace) => {
    const appConfig = getAngularAppConfig(workspace, projectName);
    if (appConfig) {
      addStyleToTarget(appConfig, 'build', stylePath);
      addStyleToTarget(appConfig, 'test', stylePath);
    } else {
      throw new SchematicsException(`project configuration could not be found`);
    }
  });
}

function isAngularBrowserProject(projectConfig: ProjectDefinition): boolean {
  const buildConfig = projectConfig.targets.get('build');
  return buildConfig?.builder === '@angular-devkit/build-angular:browser';
}

function getAngularAppConfig(
  workspace: WorkspaceDefinition,
  projectName: string
): ProjectDefinition | null {
  const projectConfig = getProjectFromWorkspace(workspace, projectName);

  return isAngularBrowserProject(projectConfig) ? projectConfig : null;
}
