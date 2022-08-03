/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {
  WorkspaceDefinition,
  ProjectDefinition,
} from '@schematics/angular/utility/workspace';
import { SchematicsException } from '@angular-devkit/schematics';

/**
 * Finds the specified project configuration in the workspace. Throws an error if the project
 * couldn't be found.
 */
export function getProjectFromWorkspace(
  workspace: WorkspaceDefinition,
  projectName?: string
): ProjectDefinition {
  if (!projectName) {
    const allProjects = Array.from(workspace.projects.values());
    if (allProjects.length === 1) {
      // is only 1 project, it must be the default
      return allProjects[0];
    }
    // follows logic from angular CLI by determining the default project that has the root set to main project
    const defaultProject = allProjects.find((project) => project.root === '');
    if (!defaultProject) {
      throw new SchematicsException(
        'Workspace does not have a default project'
      );
    }
  }

  const project = workspace.projects.get(projectName);

  if (!project) {
    throw new SchematicsException(
      `Could not find project in workspace: ${projectName}`
    );
  }

  return project;
}
