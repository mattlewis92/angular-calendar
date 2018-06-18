import * as webpack from 'webpack';
import * as ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import * as StyleLintPlugin from 'stylelint-webpack-plugin';
import * as FilterWarningsPlugin from 'webpack-filter-warnings-plugin';
import * as WebpackKarmaDieHardPlugin from '@mattlewis92/webpack-karma-die-hard';
import * as path from 'path';

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
      mode: 'development',
      resolve: {
        extensions: ['.ts', '.js', '.json'],
        alias: {
          'angular-calendar$': path.resolve(__dirname, 'src/index.ts')
        }
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
          },
          {
            test: /node_modules\/@angular\/core\/.+\/core\.js$/,
            parser: {
              system: true // disable `System.import() is deprecated and will be removed soon. Use import() instead.` warning
            }
          }
        ]
      },
      plugins: [
        new FilterWarningsPlugin({
          exclude: /was not found in /
        }),
        ...(config.singleRun
          ? [
              new WebpackKarmaDieHardPlugin(),
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
          /angular(\\|\/)core(\\|\/)fesm5/,
          __dirname + '/src'
        )
      ],
      optimization: {
        noEmitOnErrors: config.singleRun
      }
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
