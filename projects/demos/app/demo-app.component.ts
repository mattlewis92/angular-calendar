import { Component, OnInit, ViewChild, inject } from '@angular/core';
import {
  Router,
  NavigationStart,
  NavigationEnd,
  RouterOutlet,
  RouterLink,
} from '@angular/router';
import { map, take, filter } from 'rxjs/operators';
import StackBlitzSDK from '@stackblitz/sdk';
import { Angulartics2GoogleGlobalSiteTag } from 'angulartics2';
import { sources as demoUtilsSources } from './demo-modules/demo-utils/sources';
import { Subject } from 'rxjs';
import {
  NgbNav,
  NgbCollapse,
  NgbTooltip,
  NgbNavItem,
  NgbNavItemRole,
  NgbNavLink,
  NgbNavLinkBase,
  NgbNavContent,
  NgbNavOutlet,
} from '@ng-bootstrap/ng-bootstrap';
import { HighlightJS } from 'ngx-highlightjs';
import angularCorePackage from '@angular/core/package.json';
import angularRouterPackage from '@angular/router/package.json';
import angularCalendarPackage from '../../../package.json';
import calendarUtilsPackage from 'calendar-utils/package.json';
import angularResizableElementPackage from 'angular-resizable-element/package.json';
import angularDraggableDroppablePackage from 'angular-draggable-droppable/package.json';
import dateFnsPackage from 'date-fns/package.json';
import rxjsPackage from 'rxjs/package.json';
import bootstrapPackage from 'bootstrap/package.json';
import zoneJsPackage from 'zone.js/package.json';
import ngBootstrapPackage from '@ng-bootstrap/ng-bootstrap/package.json';
import rrulePackage from 'rrule/package.json';
import fontAwesomePackage from '@fortawesome/fontawesome-free/package.json';
import positioningPackage from 'positioning/package.json';
import flatpickrPackage from 'flatpickr/package.json';
import angularxFlatpickrPackage from 'angularx-flatpickr/package.json';
import { DraggableScrollContainerDirective } from 'angular-draggable-droppable';
import { ClipboardModule } from 'ngx-clipboard';
import { NgClass, AsyncPipe } from '@angular/common';
import { CarbonAdComponent } from './carbon-ad/carbon-ad.component';
import { FormsModule } from '@angular/forms';

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

function getSources(
  folder: string,
  highlightJS: HighlightJS,
): Promise<Source[]> {
  return import(`./demo-modules/${folder}/sources.ts`).then(
    ({
      sources,
    }: {
      sources: Array<{ filename: string; contents: string }>;
    }) => {
      const promises = sources.map(
        async ({ filename, contents: rawContent }) => {
          const [, extension]: RegExpMatchArray = filename.match(/^.+\.(.+)$/);
          const languages = {
            ts: 'typescript',
            html: 'xml',
            css: 'css',
            scss: 'scss',
          } as const;

          const language = languages[extension];
          const result = await highlightJS.highlight(rawContent, {
            language,
          });
          const highlightedContent = result.value;

          return {
            filename,
            contents: {
              raw: rawContent,
              highlighted: highlightedContent,
            },
            language: languages[extension],
          };
        },
      );

      return Promise.all(promises);
    },
  );
}

const dependencyVersions: Record<string, string> = {
  angular: angularCorePackage.version,
  angularRouter: angularRouterPackage.version,
  angularCalendar: angularCalendarPackage.version,
  calendarUtils: calendarUtilsPackage.version,
  angularResizableElement: angularResizableElementPackage.version,
  angularDraggableDroppable: angularDraggableDroppablePackage.version,
  dateFns: dateFnsPackage.version,
  rxjs: rxjsPackage.version,
  bootstrap: bootstrapPackage.version,
  zoneJs: zoneJsPackage.version,
  ngBootstrap: ngBootstrapPackage.version,
  rrule: rrulePackage.version,
  fontAwesome: fontAwesomePackage.version,
  positioning: positioningPackage.version,
  flatpickr: flatpickrPackage.version,
  angularxFlatpickr: angularxFlatpickrPackage.version,
};

@Component({
  selector: 'mwl-demo-app',
  styleUrls: ['./demo-app.css'],
  templateUrl: './demo-app.html',
  imports: [
    NgbCollapse,
    NgbTooltip,
    DraggableScrollContainerDirective,
    NgbNav,
    NgbNavItem,
    NgbNavItemRole,
    NgbNavLink,
    NgbNavLinkBase,
    NgbNavContent,
    RouterOutlet,
    ClipboardModule,
    NgClass,
    NgbNavOutlet,
    CarbonAdComponent,
    FormsModule,
    RouterLink,
    AsyncPipe,
  ],
})
export class DemoAppComponent implements OnInit {
  @ViewChild('nav') nav: NgbNav;
  demos: Demo[] = [];
  filteredDemos: Demo[] = [];
  activeDemo: Demo;
  isMenuVisible = false;
  firstDemoLoaded = false;
  searchText = '';
  copied$ = new Subject<boolean>();
  private router = inject(Router);
  private highlightJS = inject(HighlightJS);

  constructor() {
    const analytics = inject(Angulartics2GoogleGlobalSiteTag);

    analytics.startTracking();
  }

  ngOnInit() {
    const defaultRoute = this.router.config.find(
      (route) => route.path === '**',
    );

    this.demos = this.router.config
      .filter((route) => route.path !== '**')
      .map((route) => ({
        path: route.path,
        label: route.data.label,
        darkTheme: route.data.darkTheme,
        tags: route.data.tags || [],
      }));
    this.updateFilteredDemos();

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .pipe(take(1))
      .subscribe(() => {
        this.firstDemoLoaded = true;
      });

    this.router.events
      .pipe(filter((event) => event instanceof NavigationStart))
      .pipe(
        map((event: NavigationStart) => {
          if (event.url === '/') {
            return { url: `/${defaultRoute.redirectTo}` };
          }
          return event;
        }),
      )
      .subscribe((event: NavigationStart) => {
        this.activeDemo = this.demos.find(
          (demo) => `/${demo.path}` === event.url,
        );
        getSources(this.activeDemo.path, this.highlightJS).then((sources) => {
          this.activeDemo.sources = sources;
        });
      });

    const script = document.createElement('script');
    script.async = true;
    script.setAttribute('data-uid', '7c1627e655');
    script.src = 'https://angular-calendar.ck.page/7c1627e655/index.js';
    document.getElementsByTagName('head')[0].appendChild(script);
  }

  updateFilteredDemos() {
    this.filteredDemos = this.demos.filter(
      (demo) =>
        !this.searchText ||
        [demo.label.toLowerCase(), ...demo.tags].some((tag) =>
          tag.includes(this.searchText.toLowerCase()),
        ),
    );
  }

  editInStackblitz(demo: Demo): void {
    const files: {
      [path: string]: string;
    } = {
      'index.html': `
<link href="https://cdn.jsdelivr.net/npm/bootstrap@${dependencyVersions.bootstrap}/dist/css/bootstrap.min.css" rel="stylesheet">
<link href="https://unpkg.com/@fortawesome/fontawesome-free@${dependencyVersions.fontAwesome}/css/all.css" rel="stylesheet">
<link href="https://unpkg.com/angular-calendar@${dependencyVersions.angularCalendar}/css/angular-calendar.css" rel="stylesheet">
<link href="https://unpkg.com/flatpickr@${dependencyVersions.flatpickr}/dist/flatpickr.css" rel="stylesheet">
<mwl-demo-component>Loading...</mwl-demo-component>
`.trim(),
      'main.ts': `
import 'zone.js';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DemoModule } from './demo/module';
import { DemoComponent } from './demo/component';

@NgModule({
  imports: [
    BrowserModule,
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
`.trim(),
    };

    demoUtilsSources.forEach((source) => {
      files[`demo-utils/${source.filename}`] = source.contents;
    });

    demo.sources.forEach((source) => {
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
          'angularx-flatpickr': dependencyVersions.angularxFlatpickr,
        },
      },
      {
        openFile: 'demo/component.ts',
      },
    );
  }

  copied() {
    this.copied$.next(true);
    setTimeout(() => {
      this.copied$.next(false);
    }, 1000);
  }
}
