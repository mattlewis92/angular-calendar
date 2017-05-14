import 'core-js';
import 'zone.js/dist/zone';
import 'hammerjs';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { DemoAppModule } from './demo-app.module';

declare const ENV: string;
if (ENV === 'production') {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(DemoAppModule);