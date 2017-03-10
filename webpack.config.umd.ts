import * as webpack from 'webpack';
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const postCssFlexibility = require('postcss-flexibility');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const angularExternals = require('webpack-angular-externals');
const dateFnsExternals = require('webpack-date-fns-externals');
const rxjsExternals = require('webpack-rxjs-externals');
const pkg = require('./package.json');

export default {
  entry: __dirname + '/src/index.umd.ts',
  output: {
    path: __dirname + '/dist/umd',
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
      loader: 'awesome-typescript-loader',
      exclude: /node_modules/,
      options: {
        module: 'es2015'
      }
    }, {
      test: /\.scss/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          'css-loader',
          'postcss-loader',
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
    new webpack.SourceMapDevToolPlugin({
      filename: 'angular-calendar.js.map',
      test: /\.js($|\?)/i
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss() {
          return [
            autoprefixer({
              browsers: [
                '> 1%',
                'last 4 versions',
                'last 20 Chrome versions',
                'last 20 Firefox versions'
              ]
            }),
            postCssFlexibility
          ];
        }
      }
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
    })
  ]
};
