import 'zone.js';
import 'zone.js/testing';
import 'zone.js/plugins/mocha-patch';
import './test/polyfills';
import 'moment/locale/de';
import 'moment/locale/en-ca';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';
import { use } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

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
  },
);
