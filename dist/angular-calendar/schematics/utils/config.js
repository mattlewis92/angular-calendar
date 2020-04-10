"use strict";
exports.__esModule = true;
var schematics_1 = require("@angular-devkit/schematics");
var config_1 = require("@schematics/angular/utility/config");
var _1 = require(".");
var ANGULAR_CONFIG_PATH = 'angular.json';
function addStyle(host, stylePath, projectName) {
    var workspace = config_1.getWorkspace(host);
    var appConfig = getAngularAppConfig(workspace, projectName);
    if (appConfig) {
        appConfig.architect.build.options.styles.unshift(stylePath);
        appConfig.architect.test.options.styles.unshift(stylePath);
        writeConfig(host, workspace);
    }
    else {
        throw new schematics_1.SchematicsException("project configuration could not be found");
    }
}
exports.addStyle = addStyle;
function writeConfig(host, config) {
    var DEFAULT_ANGULAR_INDENTION = 2;
    host.overwrite(ANGULAR_CONFIG_PATH, JSON.stringify(config, null, DEFAULT_ANGULAR_INDENTION));
}
function isAngularBrowserProject(projectConfig) {
    if (projectConfig.projectType === 'application') {
        var buildConfig = projectConfig.architect.build;
        return buildConfig.builder === '@angular-devkit/build-angular:browser';
    }
    return false;
}
function getAngularAppConfig(workspace, projectName) {
    var projectConfig = _1.getProjectFromWorkspace(workspace, projectName ? projectName : workspace.defaultProject);
    return isAngularBrowserProject(projectConfig) ? projectConfig : null;
}
