import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

interface Demo {
  label: string;
  path: string;
  source: string;
}

@Component({
  selector: 'mwl-demo-app',
  styles: [`
    h3 {
      margin: 0;
      padding-bottom: 19px;
    }
    .container-fluid {
      padding-top: 70px;
      padding-bottom: 50px;
    }
    .tab-content {
      margin-top: 10px;
    }
    .sidebar-nav li {
      margin-bottom: 5px;
    }
    .sidebar-nav a:not(.active) {
      color: #777;
    }
  `],
  template: `
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-3">
          <div class="panel panel-default">
            <div class="panel-heading">
              Demos
            </div>
            <div class="panel-body sidebar-nav">
              <ul class="list-unstyled">
                <li *ngFor="let demo of demos">
                  <a
                    [routerLink]="[demo.path]"
                    [class.active]="activeDemo?.path === demo.path">
                    {{ demo.label }}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col-md-9">
          <h3>{{ activeDemo?.label }}</h3>
          <div>
            <button
              class="btn btn-info pull-right"
              (click)="editInPlunker()">
              <i class="glyphicon glyphicon-edit"></i> Edit in Plunker
            </button>
            <ul class="nav nav-tabs">
              <li class="nav-item" [class.active]="activeTab === 'demo'">
                <a href="javascript:;" (click)="viewDemo()">Demo</a>
              </li>
              <li class="nav-item" [class.active]="activeTab === 'source'">
                <a href="javascript:;" (click)="viewSource()">Source</a>
              </li>
            </ul>
            <div class="tab-content">
              <div class="tab-pane" [class.active]="activeTab === 'demo'">
                <router-outlet></router-outlet>
              </div>
              <div class="tab-pane" [class.active]="activeTab === 'source'">
                <mwl-highlight-code [source]="activeDemo?.source" language="typescript"></mwl-highlight-code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
`
})
export class DemosComponent {

  activeTab: 'demo' | 'source' = 'demo';
  demos: Demo[] = [];
  activeDemo: Demo;

  constructor(router: Router) {

    this.demos = router.config
      .filter(route => route.path !== '**')
      .map(route => ({path: route.path, label: route.data['label'], source: route.data['source']}));

    router.events
      .filter(event => event instanceof NavigationEnd)
      .subscribe((event: NavigationEnd) => {
        this.activeDemo = this.demos.find(demo => `/${demo.path}` === event.urlAfterRedirects);
        this.viewDemo();
      });

  }

  viewDemo(): void {
    this.activeTab = 'demo';
  }

  viewSource(): void {
    this.activeTab = 'source';
  }

}
