import * as webpack from 'webpack';
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const postCssFlexibility = require('postcss-flexibility');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const camelCase = require('lodash.camelcase');

function angularExternals(context, request, callback) {

  if (request.startsWith('@angular/')) {
    return callback(null, {
      root: ['ng', camelCase(request.replace(/^\@angular\//, ''))],
      commonjs: request,
      commonjs2: request,
      amd: request
    });
  }

  callback();

}

function rxjsExternals(context, request, callback) {

  if (request.startsWith('rxjs/')) {
    return callback(null, {
      root: ['rx', request.replace(/^rxjs\//, '')],
      commonjs: request,
      commonjs2: request,
      amd: request
    });
  }

  callback();

}

function dateFnsExternals(context, request, callback) {

  if (request.startsWith('date-fns/')) {
    return callback(null, {
      root: ['dateFns', camelCase(request.replace(/^date\-fns\//, ''))],
      commonjs: `${request}/index`,
      commonjs2: `${request}/index`,
      amd: `${request}/index`
    });
  }

  callback();

}

export default {
  entry: __dirname + '/src/index.umd.ts',
  output: {
    path: __dirname + '/dist/umd',
    filename: 'angular-calendar.js',
    libraryTarget: 'umd',
    library: 'angularCalendar'
  },
  externals: [
    angularExternals,
    rxjsExternals,
    dateFnsExternals, {
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
    })
  ],
  performance: {
    hints: false
  }
};
