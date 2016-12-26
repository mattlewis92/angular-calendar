import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { DemosComponent } from './demos.component';
import { HighLightCodeComponent } from './highlightCode.component';
import { KitchenSinkModule, KitchenSinkComponent } from './modules/kitchen-sink';
import { AnotherModule, AnotherComponent } from './modules/another';

@NgModule({
  declarations: [DemosComponent, HighLightCodeComponent],
  imports: [
    BrowserModule,
    KitchenSinkModule,
    AnotherModule,
    RouterModule.forRoot([{
      path: 'kitchen-sink',
      component: KitchenSinkComponent,
      data: {
        label: 'Kitchen sink'
      }
    }, {
      path: 'another',
      component: AnotherComponent,
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