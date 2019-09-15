import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { Schema } from './schema';

export default function(options: Schema): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    return tree;
  };
}
