import 'reflect-metadata';
import 'zone.js/dist/zone';
import {enableProdMode} from '@angular/core';
import {bootstrap} from '@angular/platform-browser-dynamic';
import {DemoApp} from './demo';

declare var ENV: string;
if (ENV === 'production') {
  enableProdMode();
}

bootstrap(DemoApp);