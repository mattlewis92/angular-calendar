const webpack = require('webpack');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const FixDefaultImportPlugin = require('webpack-fix-default-import-plugin');
const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;
const WATCH = process.argv.indexOf('--watch') > -1;

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: './',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      'test/entry.ts'
    ],

    // list of files to exclude
    exclude: [
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'test/entry.ts': ['webpack', 'sourcemap']
    },

    webpack: {
      resolve: {
        extensions: ['.ts', '.js'],
        alias: {
          sinon: 'sinon/pkg/sinon'
        }
      },
      module: {
        rules: [{
          enforce: 'pre',
          test: /\.ts$/,
          loader: 'tslint-loader',
          exclude: /node_modules/
        }, {
          test: /\.ts$/, loader: 'awesome-typescript-loader?forkChecker=true', exclude: /node_modules/
        }, {
          test: /sinon.js$/, loader: 'imports-loader?define=>false,require=>false'
        }, {
          enforce: 'post',
          test: /src\/.+\.ts$/,
          exclude: /(test|node_modules)/,
          loader: 'sourcemap-istanbul-instrumenter-loader?force-sourcemap=true'
        }]
      },
      plugins: [
        ...(WATCH ? [] : [
          new webpack.NoErrorsPlugin(),
          new StyleLintPlugin({
            syntax: 'scss',
            context: 'scss',
            failOnError: true
          })
        ]),
        new ForkCheckerPlugin(),
        new webpack.SourceMapDevToolPlugin({
          filename: null,
          test: /\.(ts|js)($|\?)/i
        }),
        new webpack.ContextReplacementPlugin(
          /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
          __dirname + '/src'
        ),
        new webpack.LoaderOptionsPlugin({
          options: {
            tslint: {
              emitErrors: !WATCH,
              failOnHint: false
            }
          }
        }),
        new FixDefaultImportPlugin()
      ],
      performance: {
        hints: false
      }
    },

    remapIstanbulReporter: {
      reports: {
        html: 'coverage/html',
        'text-summary': null
      }
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'karma-remap-istanbul'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: WATCH,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: !WATCH
  });
};