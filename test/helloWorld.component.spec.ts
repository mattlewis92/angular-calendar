import {
  describe,
  it,
  expect,
  beforeEach,
  inject,
  async
} from '@angular/core/testing';
import {TestComponentBuilder, ComponentFixture} from '@angular/compiler/testing';
import {HelloWorld} from './../angular2-calendar';

describe('hello-world component', () => {

  let builder: TestComponentBuilder;
  beforeEach(inject([TestComponentBuilder], (tcb) => {
    builder = tcb;
  }));

  it('should say hello world', async(() => {
    builder.createAsync(HelloWorld).then((fixture: ComponentFixture<HelloWorld>) => {
      fixture.detectChanges();
      expect(fixture.nativeElement).toHaveText('Hello world from the angular2 calendar module!');
    });
  }));

});
