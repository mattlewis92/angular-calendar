import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Plunker } from 'create-plunker';

declare const require: any;
const testsContext: any = require.context('!!raw-loader!./demo-modules', true, /\.(ts|css|html)$/);
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
  styleUrls: ['./demo-app.css'],
  templateUrl: './demo-app.html'
})
export class DemoAppComponent {

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

  editInPlunker(demo: Demo): void {

    Plunker
      .create()
      .addIndexHeadLine(`<title>${demo.label}</title>`)
      .addNpmPackage('bootstrap', {version: '3', filename: 'dist/css/bootstrap.min.css'})
      .addNpmPackage('angular-calendar', {version: '0.6', filename: 'dist/css/angular-calendar.css'})
      .addNpmPackage('zone.js', {version: '0.7'})
      .addNpmPackage('zone.js', {version: '0.7', filename: 'dist/long-stack-trace-zone.js'})
      .addNpmPackage('reflect-metadata', {version: '0.1'})
      .addNpmPackage('systemjs', {version: '0.19', filename: 'dist/system.js'})
      .addFile({name: 'config.js', contents: require('./plunker-assets/plunker-system-config.ejs')()})
      .addInlineScript(`System.import('app').catch(console.error.bind(console));`)
      .setIndexBody('<mwl-demo-component>Loading...</mwl-demo-component>')
      .addFiles(demo.sources.map(source => {
        return {
          name: `demo/${source.filename}`,
          // hacky fix to get relative style and template urls to work with system.js
          contents: source.contents.replace('@Component({', '@Component({\n  moduleId: __moduleName,')
        };
      }), true)
      .addFile({name: 'bootstrap.ts', contents: require('./plunker-assets/plunker-bootstrap.ejs')()})
      .save();

  }

}
