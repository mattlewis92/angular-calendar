import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './template.html'
})
export class AnotherComponent {}

