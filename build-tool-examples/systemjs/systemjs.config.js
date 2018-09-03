/**
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
  System.config({
    paths: {
      // paths serve as alias
      'npm:': 'node_modules/'
    },
    // map tells the System loader where to look for things
    map: {
      // our app is within the app folder
      app: 'app',
      // angular bundles
      '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
      '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
      '@angular/common/http': 'npm:@angular/common/bundles/common-http.umd.js',
      '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
      '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
      '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
      '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
      '@angular/platform-browser/animations': 'npm:@angular/platform-browser/bundles/platform-browser-animations.umd.js',
      '@angular/animations/browser': 'npm:@angular/animations/bundles/animations-browser.umd.js',
      '@angular/animations': 'npm:@angular/animations/bundles/animations.umd.js',
      // other libraries
      'rxjs':                      'npm:rxjs',
      'angular-in-memory-web-api': 'npm:angular-in-memory-web-api',
      'angular-calendar': 'npm:angular-calendar/bundles/angular-calendar.umd.js',
      'angular-calendar/date-adapters/date-fns': 'npm:angular-calendar/date-adapters/date-fns/index.js',
      'calendar-utils': 'npm:calendar-utils/bundles/calendar-utils.umd.js',
      'calendar-utils/date-adapters/date-fns': 'npm:calendar-utils/date-adapters/date-fns/index.js',
      'angular-resizable-element': 'npm:angular-resizable-element/bundles/angular-resizable-element.umd.js',
      'angular-draggable-droppable': 'npm:angular-draggable-droppable/bundles/angular-draggable-droppable.umd.js',
      'date-fns': 'npm:date-fns',
      'positioning': 'npm:positioning/dist/umd/positioning.js',
      'tslib': 'npm:tslib'
    },
    // packages tells the System loader how to load when no filename and/or no extension
    packages: {
      app: {
        main: './app.main.js',
        defaultExtension: 'js'
      },
      rxjs: {
        main: 'index.js',
        defaultExtension: 'js'
      },
      'rxjs/operators': {
        main: 'index.js',
        defaultExtension: 'js'
      },
      'angular-in-memory-web-api': {
        main: './index.js',
        defaultExtension: 'js'
      },
      'date-fns': {
        main: './index.js',
        defaultExtension: 'js'
      },
      tslib: {
        main: './tslib.js'
      }
    }
  });
})(this);
