import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { DemoAppComponent } from './demo-app.component';
import { HighlightJsDirective } from './highlightJs.directive';
import * as kitchenSink from './demo-modules/kitchen-sink';
import * as another from './demo-modules/another';

@NgModule({
  declarations: [DemoAppComponent, HighlightJsDirective],
  imports: [
    BrowserModule,
    kitchenSink.DemoModule,
    another.DemoModule,
    RouterModule.forRoot([{
      path: 'kitchen-sink',
      component: kitchenSink.DemoComponent,
      data: {
        label: 'Kitchen sink'
      }
    }, {
      path: 'another',
      component: another.DemoComponent,
      data: {
        label: 'Another demo'
      }
    }, {
      path: '**',
      redirectTo: 'kitchen-sink'
    }], {
      useHash: true
    })
  ],
  bootstrap: [DemoAppComponent]
})
export class DemoAppModule {}