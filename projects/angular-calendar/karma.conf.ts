// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = (config) => {
  config.set({
    basePath: '',
    frameworks: ['mocha', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-mocha'),
      require('karma-mocha-reporter'),
      require('karma-chrome-launcher'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma'),
    ],
    coverageReporter: {
      dir: require('path').join(__dirname, '../../coverage'),
      reporters: [
        { type: 'text-summary' },
        { type: 'html' },
        { type: 'lcovonly' },
      ],
      check: {
        emitWarning: false,
        global: {
          statements: 100,
          lines: 100,
          branches: 86,
          functions: 100,
        },
      },
    },
    reporters: ['mocha'],
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromeHeadless'],
    singleRun: false,
    mime: {
      'text/x-typescript': ['ts'],
    },
    mochaReporter: {
      showDiff: true,
      output: 'autowatch',
    },
  });
};
