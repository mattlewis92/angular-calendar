"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
exports.__esModule = true;
/**
 * Finds the specified project configuration in the workspace. Throws an error if the project
 * couldn't be found.
 */
function getProjectFromWorkspace(workspace, projectName) {
    var project = workspace.projects[projectName || workspace.defaultProject];
    if (!project) {
        throw new Error("Could not find project in workspace: " + projectName);
    }
    return project;
}
exports.getProjectFromWorkspace = getProjectFromWorkspace;
