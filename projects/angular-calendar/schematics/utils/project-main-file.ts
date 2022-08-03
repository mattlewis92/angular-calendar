/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { SchematicsException } from '@angular-devkit/schematics';
import { ProjectDefinition } from '@schematics/angular/utility/workspace';
import { getProjectTargetOptions } from './project-targets';

/** Looks for the main TypeScript file in the given project and returns its path. */
export function getProjectMainFile(project: ProjectDefinition): string {
  const buildOptions = getProjectTargetOptions(project, 'build');

  if (typeof buildOptions.main !== 'string') {
    throw new SchematicsException(
      `Could not find the project main file inside of the ` +
        `workspace config (${project.sourceRoot})`
    );
  }

  return buildOptions.main;
}
