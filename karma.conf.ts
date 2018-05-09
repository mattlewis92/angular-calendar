import * as webpack from 'webpack';
import * as ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import * as StyleLintPlugin from 'stylelint-webpack-plugin';
import * as FilterWarningsPlugin from 'webpack-filter-warnings-plugin';
import * as WebpackKarmaDieHardPlugin from '@mattlewis92/webpack-karma-die-hard';

export default config => {
  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: './',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha'],

    // list of files / patterns to load in the browser
    files: ['test/entry.ts'],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'test/entry.ts': ['webpack', 'sourcemap']
    },

    webpack: {
      resolve: {
        extensions: ['.ts', '.js', '.json']
      },
      module: {
        rules: [
          {
            enforce: 'pre',
            test: /\.ts$/,
            loader: 'tslint-loader',
            exclude: /node_modules/,
            options: {
              emitErrors: config.singleRun,
              failOnHint: config.singleRun
            }
          },
          {
            test: /\.ts$/,
            loader: 'ts-loader',
            exclude: /node_modules/,
            options: {
              transpileOnly: !config.singleRun,
              compilerOptions: {
                module: 'esnext'
              }
            }
          },
          {
            test: /\.scss$/,
            loader: 'style-loader!css-loader!sass-loader',
            exclude: /node_modules/
          },
          {
            enforce: 'post',
            test: /src\/.+\.ts$/,
            exclude: /(node_modules|\.spec\.ts$|\.interface\.ts$)/,
            loader: 'istanbul-instrumenter-loader',
            options: {
              esModules: true
            }
          }
        ]
      },
      plugins: [
        new FilterWarningsPlugin({
          exclude: /export '\w+' was not found in 'calendar-utils'/
        }),
        ...(config.singleRun
          ? [
              new WebpackKarmaDieHardPlugin(),
              new webpack.NoEmitOnErrorsPlugin(),
              new StyleLintPlugin({
                syntax: 'scss',
                context: 'scss',
                failOnError: true
              })
            ]
          : [
              new ForkTsCheckerWebpackPlugin({
                watch: ['./src', './test'],
                formatter: 'codeframe'
              })
            ]),
        new webpack.SourceMapDevToolPlugin({
          filename: null,
          columns: false,
          test: /\.(ts|js)($|\?)/i
        }),
        new webpack.ContextReplacementPlugin(
          /angular(\\|\/)core(\\|\/)esm5/,
          __dirname + '/src'
        )
      ]
    },

    mochaReporter: {
      showDiff: true,
      output: 'autowatch'
    },

    coverageIstanbulReporter: {
      reports: ['text-summary', 'html', 'lcovonly'],
      fixWebpackSourcePaths: true
    },

    mime: {
      'text/x-typescript': ['ts']
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['mocha', 'coverage-istanbul'],

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['ChromeHeadless']
  });
};
