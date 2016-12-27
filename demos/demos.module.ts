import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { DemosComponent } from './demos.component';
import { HighlightJsDirective } from './highlightJs.directive';
import * as kitchenSink from './components/kitchen-sink';
import * as another from './components/another';

@NgModule({
  declarations: [DemosComponent, HighlightJsDirective],
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
  bootstrap: [DemosComponent]
})
export class DemosModule {}