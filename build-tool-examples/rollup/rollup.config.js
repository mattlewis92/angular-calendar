import nodeResolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript';
import commonjs from 'rollup-plugin-commonjs';
import css from 'rollup-plugin-css-only'
import * as ts from 'typescript';

export default {
  input: 'app/app.main.ts',
  output: {
    name: 'main',
    sourcemap: true
  },
  plugins: [
    nodeResolve(),
    typescript({
      typescript: ts
    }),
    commonjs({
      include: 'node_modules/**'
    }),
    css({ output: __dirname + '/dist/bundle.css' })
  ]
};
