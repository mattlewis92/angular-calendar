import nodeResolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript';
import commonjs from 'rollup-plugin-commonjs';
import css from 'rollup-plugin-css-only'
import * as ts from 'typescript';

export default {
  input: 'app/app.main.ts',
  sourcemap: true,
  name: 'main',
  plugins: [
    typescript({
      typescript: ts
    }),
    nodeResolve(),
    commonjs({
      include: 'node_modules/**'
    }),
    css({ output: __dirname + '/dist/bundle.css' })
  ]
};
