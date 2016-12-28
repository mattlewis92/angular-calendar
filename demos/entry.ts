import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import '../scss/angular-calendar.scss';
import 'intl';
import 'intl/locale-data/jsonp/en';
import 'core-js';
import 'zone.js/dist/zone';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { DemoAppModule } from './demo-app.module';

declare const ENV: string;
if (ENV === 'production') {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(DemoAppModule);