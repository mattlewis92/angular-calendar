import {Component} from '@angular/core';
import {HelloWorld} from './../angular2-calendar';

@Component({
  selector: 'demo-app',
  directives: [HelloWorld],
  template: '<hello-world></hello-world>'
})
export class DemoApp {}
