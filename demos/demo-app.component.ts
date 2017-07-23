import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import 'rxjs/add/operator/filter';
import { Plunker } from 'create-plunker';
import { sources as demoUtilsSources } from './demo-modules/demo-utils/sources';

interface Source {
  filename: string;
  contents: string;
  language: string;
}

interface Demo {
  label: string;
  path: string;
  sources?: Source[];
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
      contents,
      language: languages[extension]
    };
  });
}

const dependencyVersions: any = {
  angular: require('@angular/core/package.json').version,
  angularRouter: require('@angular/router/package.json').version,
  angularCalendar: require('../package.json').version,
  calendarUtils: require('calendar-utils/package.json').version,
  angularResizableElement: require('angular-resizable-element/package.json')
    .version,
  angularDraggableDroppable: require('angular-draggable-droppable/package.json')
    .version,
  dateFns: require('date-fns/package.json').version,
  rxjs: require('rxjs/package.json').version,
  typescript: '2.2.2',
  bootstrap: require('bootstrap/package.json').version,
  zoneJs: require('zone.js/package.json').version,
  reflectMetadata: require('reflect-metadata/package.json').version,
  ngBootstrap: require('@ng-bootstrap/ng-bootstrap/package.json').version,
  rrule: require('rrule/package.json').version,
  ngxContextmenu: require('ngx-contextmenu/package.json').version
};

@Component({
  selector: 'mwl-demo-app',
  styleUrls: ['./demo-app.css'],
  templateUrl: './demo-app.html'
})
export class DemoAppComponent implements OnInit {
  demos: Demo[] = [];
  activeDemo: Demo;
  isMenuVisible = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.demos = this.router.config
      .filter(route => route.path !== '**')
      .map(route => ({
        path: route.path,
        label: route.data['label']
      }));

    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .subscribe(async (event: NavigationEnd) => {
        this.activeDemo = this.demos.find(
          demo => `/${demo.path}` === event.urlAfterRedirects
        );
        this.activeDemo.sources = await getSources(this.activeDemo.path);
      });
  }

  editInPlunker(demo: Demo): void {
    Plunker.create()
      .addIndexHeadLine(`<title>${demo.label}</title>`)
      .addNpmPackage('bootstrap', {
        version: dependencyVersions.bootstrap,
        filename: 'dist/css/bootstrap.min.css'
      })
      .addNpmPackage('angular-calendar', {
        version: dependencyVersions.angularCalendar,
        filename: 'dist/css/angular-calendar.css'
      })
      .addNpmPackage('zone.js', { version: dependencyVersions.zoneJs })
      .addNpmPackage('zone.js', {
        version: dependencyVersions.zoneJs,
        filename: 'dist/long-stack-trace-zone.js'
      })
      .addNpmPackage('reflect-metadata', {
        version: dependencyVersions.reflectMetadata
      })
      .addNpmPackage('systemjs', {
        version: '0.19',
        filename: 'dist/system.js'
      })
      .addFile({
        name: 'config.js',
        contents: require('./plunker-assets/plunker-system-config.ejs')({
          dependencyVersions
        })
      })
      .addInlineScript(
        `System.import('app').catch(console.error.bind(console));`
      )
      .setIndexBody('<mwl-demo-component>Loading...</mwl-demo-component>')
      .addFiles(
        demoUtilsSources.map(source => ({
          name: `demo-utils/${source.filename}`,
          contents: source.contents
        }))
      )
      .addFiles(
        demo.sources.map(source => {
          return {
            name: `demo/${source.filename}`,
            // hacky fix to get relative style and template urls to work with system.js
            contents: source.contents
              .replace(
                /@Component\({/g,
                '@Component({\n  moduleId: __moduleName,'
              )
              .replace(
                ",\n    RouterModule.forChild([{ path: '', component: DemoComponent }])",
                ''
              )
              .replace("\nimport { RouterModule } from '@angular/router';", '')
          };
        }),
        true
      )
      .addFile({
        name: 'bootstrap.ts',
        contents: require('./plunker-assets/plunker-bootstrap.ejs')()
      })
      .save();
  }
}
