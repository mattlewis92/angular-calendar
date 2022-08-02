import 'zone.js';
import 'zone.js/dist/long-stack-trace-zone';
import 'zone.js/dist/proxy';
import 'zone.js/dist/sync-test';
import 'zone.js/dist/mocha-patch';
import 'zone.js/dist/async-test';
import 'zone.js/dist/fake-async-test';
import './test-polyfills';
import 'moment/locale/de';
import 'moment/locale/en-ca';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';
import { use } from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';

use(sinonChai);

let rafStub: sinon.SinonStub;
let requestIdleCallbackStub: sinon.SinonStub;
beforeEach(() => {
  rafStub = sinon.stub(window, 'requestAnimationFrame').callsArg(0);
  requestIdleCallbackStub = sinon
    .stub(window, 'requestIdleCallback' as any)
    .callsArg(0);
});

afterEach(() => {
  rafStub.restore();
  requestIdleCallbackStub.restore();
});

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting(),
  {
    teardown: { destroyAfterEach: true },
  }
);

// Then we find all the tests.
declare const require: any;
const context = require.context('./', true, /\.spec\.ts$/);
// And load the modules.
context.keys().map(context);
