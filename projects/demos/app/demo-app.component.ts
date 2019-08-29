import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { map, take, filter } from 'rxjs/operators';
import StackBlitzSDK from '@stackblitz/sdk';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';
import { sources as demoUtilsSources } from './demo-modules/demo-utils/sources';
import { Subject } from 'rxjs';

interface Source {
  filename: string;
  contents: {
    raw: string;
    highlighted: string;
  };
  language: string;
}

interface Demo {
  label: string;
  path: string;
  sources?: Source[];
  darkTheme: boolean;
  tags: string[];
}

async function getSources(folder: string): Promise<Source[]> {
  const { sources } = await import('./demo-modules/' + folder + '/sources.ts');

  return sources.map(({ filename, contents }) => {
    const [, extension]: RegExpMatchArray = filename.match(/^.+\.(.+)$/);
    const languages: { [extension: string]: string } = {
      ts: 'typescript',
      html: 'html',
      css: 'css'
    };
    return {
      filename,
      contents: {
        raw: contents.raw
          .replace(
            ",\n    RouterModule.forChild([{ path: '', component: DemoComponent }])",
            ''
          )
          .replace("\nimport { RouterModule } from '@angular/router';", ''),
        highlighted: contents.highlighted // TODO - move this into a regexp replace for both
          .replace(
            ',\n    RouterModule.forChild([{ path: <span class="hljs-string">\'\'</span>, component: DemoComponent }])',
            ''
          )
          .replace(
            '\n<span class="hljs-keyword">import</span> { RouterModule } from <span class="hljs-string">\'@angular/router\'</span>;',
            ''
          )
      },
      language: languages[extension]
    };
  });
}

const dependencyVersions: any = {
  angular: require('@angular/core/package.json').version,
  angularRouter: require('@angular/router/package.json').version,
  angularCalendar: require('../../../package.json').version,
  calendarUtils: require('calendar-utils/package.json').version,
  angularResizableElement: require('angular-resizable-element/package.json')
    .version,
  angularDraggableDroppable: require('angular-draggable-droppable/package.json')
    .version,
  dateFns: require('date-fns/package.json').version,
  rxjs: require('rxjs/package.json').version,
  bootstrap: require('bootstrap-css-only/package.json').version,
  zoneJs: require('zone.js/package.json').version,
  ngBootstrap: require('@ng-bootstrap/ng-bootstrap/package.json').version,
  rrule: require('rrule/package.json').version,
  fontAwesome: require('font-awesome/package.json').version,
  positioning: require('positioning/package.json').version,
  flatpickr: require('flatpickr/package.json').version,
  angularxFlatpickr: require('angularx-flatpickr/package.json').version
};

@Component({
  selector: 'mwl-demo-app',
  styleUrls: ['./demo-app.css'],
  templateUrl: './demo-app.html'
})
export class DemoAppComponent implements OnInit {
  demos: Demo[] = [];
  filteredDemos: Demo[] = [];
  activeDemo: Demo;
  isMenuVisible = false;
  firstDemoLoaded = false;
  searchText = '';
  copied$ = new Subject<boolean>();

  constructor(private router: Router, analytics: Angulartics2GoogleAnalytics) {
    analytics.startTracking();
  }

  ngOnInit() {
    const defaultRoute = this.router.config.find(route => route.path === '**');

    this.demos = this.router.config
      .filter(route => route.path !== '**')
      .map(route => ({
        path: route.path,
        label: route.data.label,
        darkTheme: route.data.darkTheme,
        tags: route.data.tags || []
      }));
    this.updateFilteredDemos();

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .pipe(take(1))
      .subscribe(() => {
        this.firstDemoLoaded = true;
      });

    this.router.events
      .pipe(filter(event => event instanceof NavigationStart))
      .pipe(
        map((event: NavigationStart) => {
          if (event.url === '/') {
            return { url: `/${defaultRoute.redirectTo}` };
          }
          return event;
        })
      )
      .subscribe(async (event: NavigationStart) => {
        this.activeDemo = this.demos.find(
          demo => `/${demo.path}` === event.url
        );
        this.activeDemo.sources = await getSources(this.activeDemo.path);
      });
  }

  updateFilteredDemos() {
    this.filteredDemos = this.demos.filter(
      demo =>
        !this.searchText ||
        [demo.label.toLowerCase(), ...demo.tags].some(tag =>
          tag.includes(this.searchText.toLowerCase())
        )
    );
  }

  editInStackblitz(demo: Demo): void {
    const files: {
      [path: string]: string;
    } = {
      'index.html': `
<link href="https://unpkg.com/bootstrap-css-only@${dependencyVersions.bootstrap}/css/bootstrap.min.css" rel="stylesheet">
<link href="https://unpkg.com/font-awesome@${dependencyVersions.fontAwesome}/css/font-awesome.css" rel="stylesheet">
<link href="https://unpkg.com/angular-calendar@${dependencyVersions.angularCalendar}/css/angular-calendar.css" rel="stylesheet">
<link href="https://unpkg.com/flatpickr@${dependencyVersions.flatpickr}/dist/flatpickr.css" rel="stylesheet">
<mwl-demo-component>Loading...</mwl-demo-component>
`.trim(),
      'main.ts': `
import 'core-js/es6/reflect';
import 'core-js/es7/reflect';
import 'zone.js/dist/zone';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { DemoModule } from './demo/module';
import { DemoComponent } from './demo/component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DemoModule
  ],
  bootstrap: [DemoComponent]
})
export class BootstrapModule {}

platformBrowserDynamic().bootstrapModule(BootstrapModule).then(ref => {
  // Ensure Angular destroys itself on hot reloads.
  if (window['ngRef']) {
    window['ngRef'].destroy();
  }
  window['ngRef'] = ref;

  // Otherwise, log the boot error
}).catch(err => console.error(err));
`.trim()
    };

    demoUtilsSources.forEach(source => {
      files[`demo-utils/${source.filename}`] = source.contents.raw;
    });

    demo.sources.forEach(source => {
      files[`demo/${source.filename}`] = source.contents.raw;
    });

    StackBlitzSDK.openProject(
      {
        title: 'Angular Calendar Demo',
        description: demo.label,
        template: 'angular-cli',
        tags: ['angular-calendar'],
        files,
        dependencies: {
          '@angular/core': dependencyVersions.angular,
          '@angular/common': dependencyVersions.angular,
          '@angular/compiler': dependencyVersions.angular,
          '@angular/platform-browser': dependencyVersions.angular,
          '@angular/platform-browser-dynamic': dependencyVersions.angular,
          '@angular/router': dependencyVersions.angular,
          '@angular/forms': dependencyVersions.angular,
          '@angular/animations': dependencyVersions.angular,
          rxjs: dependencyVersions.rxjs,
          'zone.js': dependencyVersions.zoneJs,
          'angular-draggable-droppable': `^${dependencyVersions.angularDraggableDroppable}`,
          'angular-resizable-element': `^${dependencyVersions.angularResizableElement}`,
          'date-fns': dependencyVersions.dateFns,
          'angular-calendar': dependencyVersions.angularCalendar,
          '@ng-bootstrap/ng-bootstrap': '5.0.0', // pinned due to issue with stackblitz generation
          rrule: dependencyVersions.rrule,
          'calendar-utils': dependencyVersions.calendarUtils,
          flatpickr: dependencyVersions.flatpickr,
          'angularx-flatpickr': dependencyVersions.angularxFlatpickr
        }
      },
      {
        openFile: 'demo/component.ts'
      }
    );
  }

  copied() {
    this.copied$.next(true);
    setTimeout(() => {
      this.copied$.next(false);
    }, 1000);
  }
}
