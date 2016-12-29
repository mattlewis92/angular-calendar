import { Component, ChangeDetectionStrategy } from '@angular/core';
import { BaseDemoComponent } from '../demo-utils/base-demo.component';

@Component({
  selector: 'mwl-demo-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['styles.css'],
  templateUrl: 'template.html'
})
export class DemoComponent extends BaseDemoComponent {}