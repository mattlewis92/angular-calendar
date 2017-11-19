import * as fs from 'fs';
import * as path from 'path';
import * as webpack from 'webpack';
import * as ExtractTextPlugin from 'extract-text-webpack-plugin';
import * as autoprefixer from 'autoprefixer';
import * as postCssFlexibility from 'postcss-flexibility';
import * as StyleLintPlugin from 'stylelint-webpack-plugin';
import * as angularExternals from 'webpack-angular-externals';
import * as dateFnsExternals from 'webpack-date-fns-externals';
import * as rxjsExternals from 'webpack-rxjs-externals';

const pkg = JSON.parse(fs.readFileSync('./package.json').toString());

export default {
  entry: path.join(__dirname, 'src/index.umd.ts'),
  output: {
    path: path.join(__dirname, 'dist/umd'),
    filename: 'angular-calendar.js',
    libraryTarget: 'umd',
    library: 'angularCalendar'
  },
  externals: [
    angularExternals(),
    rxjsExternals(),
    dateFnsExternals(), {
    'calendar-utils': {
      root: ['calendarUtils'],
      commonjs: 'calendar-utils',
      commonjs2: 'calendar-utils',
      amd: 'calendar-utils'
    },
    'angular-resizable-element': {
      root: 'angularResizableElement',
      commonjs: 'angular-resizable-element',
      commonjs2: 'angular-resizable-element',
      amd: 'angular-resizable-element'
    },
    'angular-draggable-droppable': {
      root: 'angularDraggableDroppable',
      commonjs: 'angular-draggable-droppable',
      commonjs2: 'angular-draggable-droppable',
      amd: 'angular-draggable-droppable'
    }
  }],
  module: {
    rules: [{
      enforce: 'pre',
      test: /\.ts$/,
      loader: 'tslint-loader',
      exclude: /node_modules/,
      options: {
        emitErrors: true,
        failOnHint: true
      }
    }, {
      test: /\.ts$/,
      loader: 'ts-loader',
      exclude: /node_modules/,
      options: {
        compilerOptions: {
          module: 'esnext'
        }
      }
    }, {
      test: /\.scss/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                autoprefixer({
                  browsers: [
                    '> 1%',
                    'last 4 versions',
                    'last 20 Chrome versions',
                    'last 20 Firefox versions'
                  ]
                }),
                postCssFlexibility
              ]
            }
          },
          'sass-loader'
        ]
      }),
      exclude: /node_modules/
    }]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  plugins: [
    new StyleLintPlugin({
      syntax: 'scss',
      context: 'scss',
      failOnError: true
    }),
    new ExtractTextPlugin('./../css/angular-calendar.css'),
    new ExtractTextPlugin('./../dist/css/angular-calendar.css'),
    new webpack.SourceMapDevToolPlugin({
      filename: 'angular-calendar.js.map',
      test: /\.js($|\?)/i
    }),
    new webpack.BannerPlugin({
      banner: `
/**
 * ${pkg.name} - ${pkg.description}
 * @version v${pkg.version}
 * @author ${pkg.author}
 * @link ${pkg.homepage}
 * @license ${pkg.license}
 */
      `.trim(),
      raw: true,
      entryOnly: true
    }),
    new webpack.optimize.ModuleConcatenationPlugin()
  ]
};
