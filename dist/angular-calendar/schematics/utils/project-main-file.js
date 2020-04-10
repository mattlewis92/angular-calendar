"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
exports.__esModule = true;
var schematics_1 = require("@angular-devkit/schematics");
var project_targets_1 = require("./project-targets");
/** Looks for the main TypeScript file in the given project and returns its path. */
function getProjectMainFile(project) {
    var buildOptions = project_targets_1.getProjectTargetOptions(project, 'build');
    if (!buildOptions.main) {
        throw new schematics_1.SchematicsException("Could not find the project main file inside of the " +
            ("workspace config (" + project.sourceRoot + ")"));
    }
    return buildOptions.main;
}
exports.getProjectMainFile = getProjectMainFile;
