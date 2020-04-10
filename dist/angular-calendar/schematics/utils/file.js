"use strict";
exports.__esModule = true;
var ts = require("typescript");
var schematics_1 = require("@angular-devkit/schematics");
/**
 * Reads file from given path and Returns TypeScript source file.
 * @param host {Tree} The source tree.
 * @param path {String} The path to the file to read. Relative to the root of the tree.
 *
 */
function getSourceFile(host, path) {
    var buffer = host.read(path);
    if (!buffer) {
        throw new schematics_1.SchematicsException("Could not find " + path + "!");
    }
    var content = buffer.toString();
    var sourceFile = ts.createSourceFile(path, content, ts.ScriptTarget.Latest, true);
    return sourceFile;
}
exports.getSourceFile = getSourceFile;
