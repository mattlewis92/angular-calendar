/// <reference types="mocha" />

import '../src/angular-calendar.scss';
import 'core-js';
import 'zone.js/dist/zone';
import 'zone.js/dist/long-stack-trace-zone';
import 'zone.js/dist/proxy';
import 'zone.js/dist/sync-test';
import 'zone.js/dist/mocha-patch';
import 'zone.js/dist/async-test';
import 'zone.js/dist/fake-async-test';
import 'moment/locale/de';
import 'moment/locale/en-ca';
import { use } from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import { TestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

use(sinonChai);
TestBed.initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);

let rafStub: sinon.SinonStub;
beforeEach(() => {
  rafStub = sinon.stub(window, 'requestAnimationFrame').callsArgAsync(0);
});

afterEach(() => {
  rafStub.restore();
});

declare const require: any;
const testsContext: any = require.context('./', true, /\.spec/);
testsContext.keys().forEach(testsContext);
