import * as webpack from 'webpack';
import * as ExtractTextPlugin from 'extract-text-webpack-plugin';
const autoprefixer = require('autoprefixer');
const postCssFlexibility = require('postcss-flexibility');
const StyleLintPlugin = require('stylelint-webpack-plugin');

export default {
  entry: __dirname + '/src/index.umd.ts',
  output: {
    path: __dirname + '/dist/umd',
    filename: 'angular-calendar.js',
    libraryTarget: 'umd',
    library: 'angularCalendar'
  },
  externals: {
    '@angular/core': {
      root: ['ng', 'core'],
      commonjs: '@angular/core',
      commonjs2: '@angular/core',
      amd: '@angular/core'
    },
    '@angular/common': {
      root: ['ng', 'common'],
      commonjs: '@angular/common',
      commonjs2: '@angular/common',
      amd: '@angular/common'
    },
    '@angular/platform-browser': {
      root: ['ng', 'platformBrowser'],
      commonjs: '@angular/platform-browser',
      commonjs2: '@angular/platform-browser',
      amd: '@angular/platform-browser'
    },
    'rxjs/Subject': {
      root: ['rx', 'Subject'],
      commonjs: 'rxjs/Subject',
      commonjs2: 'rxjs/Subject',
      amd: 'rxjs/Subject'
    },
    'rxjs/Subscription': {
      root: ['rx', 'Subscription'],
      commonjs: 'rxjs/Subscription',
      commonjs2: 'rxjs/Subscription',
      amd: 'rxjs/Subscription'
    },
    'calendar-utils': {
      root: ['calendarUtils'],
      commonjs: 'calendar-utils',
      commonjs2: 'calendar-utils',
      amd: 'calendar-utils'
    },
    'date-fns/is_same_day': {
      root: ['dateFns', 'isSameDay'],
      commonjs: 'date-fns/is_same_day/index',
      commonjs2: 'date-fns/is_same_day/index'
    },
    'date-fns/get_iso_week': {
      root: ['dateFns', 'getISOWeek'],
      commonjs: 'date-fns/get_iso_week/index',
      commonjs2: 'date-fns/get_iso_week/index'
    },
    'date-fns/add_minutes': {
      root: ['dateFns', 'addMinutes'],
      commonjs: 'date-fns/add_minutes/index',
      commonjs2: 'date-fns/add_minutes/index'
    },
    'date-fns/add_days': {
      root: ['dateFns', 'addDays'],
      commonjs: 'date-fns/add_days/index',
      commonjs2: 'date-fns/add_days/index'
    },
    'date-fns/set_date': {
      root: ['dateFns', 'setDate'],
      commonjs: 'date-fns/set_date/index',
      commonjs2: 'date-fns/set_date/index'
    },
    'date-fns/set_month': {
      root: ['dateFns', 'setMonth'],
      commonjs: 'date-fns/set_month/index',
      commonjs2: 'date-fns/set_month/index'
    },
    'date-fns/set_year': {
      root: ['dateFns', 'setYear'],
      commonjs: 'date-fns/set_year/index',
      commonjs2: 'date-fns/set_year/index'
    },
    'date-fns/get_date': {
      root: ['dateFns', 'getDate'],
      commonjs: 'date-fns/get_date/index',
      commonjs2: 'date-fns/get_date/index'
    },
    'date-fns/get_month': {
      root: ['dateFns', 'getMonth'],
      commonjs: 'date-fns/get_month/index',
      commonjs2: 'date-fns/get_month/index'
    },
    'date-fns/get_year': {
      root: ['dateFns', 'getYear'],
      commonjs: 'date-fns/get_year/index',
      commonjs2: 'date-fns/get_year/index'
    },
    'date-fns/difference_in_seconds': {
      root: ['dateFns', 'differenceInSeconds'],
      commonjs: 'date-fns/difference_in_seconds/index',
      commonjs2: 'date-fns/difference_in_seconds/index'
    },
    'date-fns/add_seconds': {
      root: ['dateFns', 'addSeconds'],
      commonjs: 'date-fns/add_seconds/index',
      commonjs2: 'date-fns/add_seconds/index'
    },
    'angular-resizable-element': {
      root: 'angularResizableElement',
      commonjs: 'angular-resizable-element',
      commonjs2: 'angular-resizable-element'
    },
    'angular-draggable-droppable': {
      root: 'angularDraggableDroppable',
      commonjs: 'angular-draggable-droppable',
      commonjs2: 'angular-draggable-droppable'
    }
  },
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
        fallbackLoader: 'style-loader',
        loader: 'css-loader!postcss-loader!sass-loader'
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
