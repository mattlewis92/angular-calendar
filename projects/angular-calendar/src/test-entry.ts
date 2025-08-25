import 'zone.js';
import 'zone.js/testing';
import 'zone.js/plugins/mocha-patch';
import 'moment/locale/de';
import 'moment/locale/en-ca';
import { getTestBed } from '@angular/core/testing';
import { use } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import {
  BrowserTestingModule,
  platformBrowserTesting,
} from '@angular/platform-browser/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

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
  BrowserTestingModule,
  platformBrowserTesting(),
  {
    teardown: { destroyAfterEach: true },
  },
);
