/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { ProjectDefinition } from '@schematics/angular/utility/workspace';

/** Resolves the architect options for the build target of the given project. */
export function getProjectTargetOptions(
  project: ProjectDefinition,
  buildTarget: string
) {
  if (project.targets.get(buildTarget)) {
    return project.targets.get(buildTarget).options;
  }

  throw new Error(
    `Cannot determine project target configuration for: ${buildTarget}.`
  );
}
