import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

declare const require: any;
const testsContext: any = require.context('!!raw-loader!./modules', true, /\.(ts|css|html)$/);
const demoFiles: any = {};
testsContext.keys().forEach(key => {
  demoFiles[key] = testsContext(key);
});

interface Source {
  filename: string;
  contents: string;
  language: string;
}

interface Demo {
  label: string;
  path: string;
  sources: Source[];
}

function getSources(folder: string): Source[] {
  return Object.entries(demoFiles)
    .filter(([path]) => path.startsWith(`./${folder}`))
    .filter(([path]) => !path.endsWith('/index.ts'))
    .map(([path, contents]) => {
      const [, filename, extension]: RegExpMatchArray = path.match(/^\.\/.+\/(.+)\.(.+)$/);
      const languages: any = {
        ts: 'typescript',
        html: 'html',
        css: 'css'
      };
      return {
        filename: `${filename}.${extension}`,
        contents,
        language: languages[extension]
      };
    })
    .sort((sourceA: Source, sourceB: Source) => {

      const precedences: string[] = [
        'module.ts',
        'component.ts',
        '.html',
        '.css'
      ];

      let scoreA: number = precedences.length;
      let scoreB: number = precedences.length;

      precedences.forEach((suffix, index) => {
        if (sourceA.filename.endsWith(suffix)) {
          scoreA = index;
        }
        if (sourceB.filename.endsWith(suffix)) {
          scoreB = index;
        }
      });

      return scoreA - scoreB;

    });
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
              <i class="fa fa-edit"></i> Edit in Plunker
            </button>
            <ul class="nav nav-tabs">
              <li
                class="nav-item"
                [class.active]="activeTabIndex === 0">
                <a href="javascript:;" (click)="activeTabIndex = 0">
                  <i class="fa fa-fw fa-laptop"></i> Live demo
                </a>
              </li>
              <li
                class="nav-item"
                *ngFor="let source of activeDemo?.sources; let sourceTabIndex = index"
                [class.active]="activeTabIndex === sourceTabIndex + 1">
                <a href="javascript:;" (click)="activeTabIndex = sourceTabIndex + 1">
                  <span [ngSwitch]="source.language">
                    <i class="fa fa-fw fa-html5" *ngSwitchCase="'html'"></i>
                    <i class="fa fa-fw fa-css3" *ngSwitchCase="'css'"></i>
                    <i class="fa fa-fw fa-code" *ngSwitchDefault></i>
                  </span>
                  {{ source.filename }}
                </a>
              </li>
            </ul>
            <div class="tab-content">
              <div
                class="tab-pane"
                [class.active]="activeTabIndex === 0">
                <router-outlet></router-outlet>
              </div>
              <div
                class="tab-pane"
                *ngFor="let source of activeDemo?.sources; let sourceTabIndex = index"
                [class.active]="activeTabIndex === sourceTabIndex + 1">
                <mwl-highlight-code
                  *ngIf="activeTabIndex === sourceTabIndex + 1"
                  [source]="source.contents"
                  [language]="source.language">
                </mwl-highlight-code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
`
})
export class DemosComponent {

  activeTabIndex: number = 0;
  demos: Demo[] = [];
  activeDemo: Demo;

  constructor(router: Router) {

    this.demos = router.config
      .filter(route => route.path !== '**')
      .map(route => ({path: route.path, label: route.data['label'], sources: getSources(route.path)}));

    router.events
      .filter(event => event instanceof NavigationEnd)
      .subscribe((event: NavigationEnd) => {
        this.activeDemo = this.demos.find(demo => `/${demo.path}` === event.urlAfterRedirects);
        this.activeTabIndex = 0;
      });

  }

}
