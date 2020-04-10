"use strict";
exports.__esModule = true;
var schematics_1 = require("@angular-devkit/schematics");
var tasks_1 = require("@angular-devkit/schematics/tasks");
var config_1 = require("@schematics/angular/utility/config");
var ng_ast_utils_1 = require("@schematics/angular/utility/ng-ast-utils");
var ast_utils_1 = require("@schematics/angular/utility/ast-utils");
var dependencies_1 = require("@schematics/angular/utility/dependencies");
var core_1 = require("@angular-devkit/core");
var utils_1 = require("../utils");
var version_names_1 = require("./version-names");
function default_1(options) {
    return schematics_1.chain([
        addPackageJsonDependencies(options),
        installPackageJsonDependencies(),
        addModuleToImports(options),
        addAngularCalendarStyle(options),
    ]);
}
exports["default"] = default_1;
function installPackageJsonDependencies() {
    return function (host, context) {
        context.addTask(new tasks_1.NodePackageInstallTask());
        context.logger.log('info', "Installing angular calendar dependencies...");
        return host;
    };
}
function addPackageJsonDependencies(options) {
    return function (host, context) {
        var dateAdapters = {
            moment: version_names_1.momentVersion,
            'date-fns': version_names_1.dateFnsVersion
        };
        var angularCalendarDependency = nodeDependencyFactory('angular-calendar', version_names_1.angularCalendarVersion);
        var dateAdapterLibrary = options.dateAdapter;
        var dateAdapterLibraryDependency = nodeDependencyFactory(dateAdapterLibrary, dateAdapters[dateAdapterLibrary]);
        dependencies_1.addPackageJsonDependency(host, angularCalendarDependency);
        context.logger.log('info', "Added \"" + angularCalendarDependency.name + "\" into " + angularCalendarDependency.type);
        dependencies_1.addPackageJsonDependency(host, dateAdapterLibraryDependency);
        context.logger.log('info', "Added \"" + dateAdapterLibraryDependency.name + "\" into " + dateAdapterLibraryDependency.type);
        return host;
    };
}
function nodeDependencyFactory(packageName, version) {
    return {
        type: dependencies_1.NodeDependencyType.Default,
        name: packageName,
        version: version,
        overwrite: true
    };
}
function addModuleToImports(options) {
    return function (host, context) {
        context.logger.log('info', "Add modules imports options...");
        var workspace = config_1.getWorkspace(host);
        var project = utils_1.getProjectFromWorkspace(workspace, options.projectName);
        var mainPath = utils_1.getProjectMainFile(project);
        var appModulePath = options.module
            ? core_1.normalize(project.root + '/' + options.module)
            : ng_ast_utils_1.getAppModulePath(host, mainPath);
        var moduleName = "CalendarModule.forRoot({ provide: DateAdapter, useFactory: " + (options.dateAdapter === 'moment'
            ? 'momentAdapterFactory'
            : 'adapterFactory') + " })";
        var moduleCalendarSrc = 'angular-calendar';
        utils_1.addModuleImportToRootModule(host, moduleName, moduleCalendarSrc, project);
        var moduleSource = utils_1.getSourceFile(host, appModulePath);
        var updates = [
            ast_utils_1.insertImport(moduleSource, appModulePath, 'DateAdapter', moduleCalendarSrc),
            ast_utils_1.insertImport(moduleSource, appModulePath, 'adapterFactory', moduleCalendarSrc + "/date-adapters/" + options.dateAdapter),
        ];
        if (options.dateAdapter === 'moment') {
            updates.push(utils_1.insertWildcardImport(moduleSource, appModulePath, 'moment', 'moment'));
            updates.push(utils_1.insertAfterImports(moduleSource, appModulePath, ";\n\nexport function momentAdapterFactory() {\n  return adapterFactory(moment);\n}"));
        }
        var recorder = host.beginUpdate(appModulePath);
        updates.forEach(function (update) {
            recorder.insertLeft(update.pos, update.toAdd);
        });
        host.commitUpdate(recorder);
        return host;
    };
}
function addAngularCalendarStyle(options) {
    return function (host) {
        var libStylePath = 'node_modules/angular-calendar/css/angular-calendar.css';
        utils_1.addStyle(host, libStylePath, options.projectName);
        return host;
    };
}
