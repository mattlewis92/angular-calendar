"use strict";
exports.__esModule = true;
var schematics_1 = require("@angular-devkit/schematics");
var change_1 = require("@schematics/angular/utility/change");
var ast_utils_1 = require("@schematics/angular/utility/ast-utils");
var ng_ast_utils_1 = require("@schematics/angular/utility/ng-ast-utils");
var ts = require("typescript");
var file_1 = require("./file");
/**
 * Import and add module to the root module.
 * @param host {Tree} The source tree.
 * @param importedModuleName {String} The name of the imported module.
 * @param importedModulePath {String} The location of the imported module.
 * @param project {WorkspaceProject} The workspace project.
 */
function addModuleImportToRootModule(host, importedModuleName, importedModulePath, project) {
    var appModulePath = ng_ast_utils_1.getAppModulePath(host, project.architect.build.options.main);
    addModuleImportToModule(host, appModulePath, importedModuleName, importedModulePath);
}
exports.addModuleImportToRootModule = addModuleImportToRootModule;
/**
 * Import and add module to specific module path.
 * @param host {Tree} The source tree.
 * @param moduleToImportIn {String} The location of the module to import in.
 * @param importedModuleName {String} The name of the imported module.
 * @param importedModulePath {String} The location of the imported module.
 */
function addModuleImportToModule(host, moduleToImportIn, importedModuleName, importedModulePath) {
    var moduleSource = file_1.getSourceFile(host, moduleToImportIn);
    if (!moduleSource) {
        throw new schematics_1.SchematicsException("Module not found: " + moduleToImportIn);
    }
    var changes = ast_utils_1.addImportToModule(moduleSource, moduleToImportIn, importedModuleName, importedModulePath);
    var recorder = host.beginUpdate(moduleToImportIn);
    changes
        .filter(function (change) { return change instanceof change_1.InsertChange; })
        .forEach(function (change) { return recorder.insertLeft(change.pos, change.toAdd); });
    host.commitUpdate(recorder);
}
function insertAfterImports(source, fileToEdit, toInsert) {
    var allImports = ast_utils_1.findNodes(source, ts.SyntaxKind.ImportDeclaration);
    return ast_utils_1.insertAfterLastOccurrence(allImports, toInsert, fileToEdit, 0, ts.SyntaxKind.StringLiteral);
}
exports.insertAfterImports = insertAfterImports;
function insertWildcardImport(source, fileToEdit, symbolName, fileName) {
    return insertAfterImports(source, fileToEdit, ";\nimport * as " + symbolName + " from '" + fileName + "'");
}
exports.insertWildcardImport = insertWildcardImport;
