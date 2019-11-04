import { Tree, SchematicsException } from '@angular-devkit/schematics';

const CONFIG_PATH = 'angular.json';

export function addStyle(host: Tree, stylePath: string): void {
  const config = readConfig(host);
  const appConfig = getAngularAppConfig(config);

  if (appConfig) {
    appConfig.architect.build.options.styles.unshift(stylePath);
    appConfig.architect.test.options.styles.unshift(stylePath);

    writeConfig(host, config);
  } else {
    throw new SchematicsException(`app configuration could not be found`);
  }
}

function readConfig(host: Tree): JSON {
  const sourceText = host.read(CONFIG_PATH)!.toString('utf-8');
  return JSON.parse(sourceText);
}

function writeConfig(host: Tree, config: JSON): void {
  host.overwrite(CONFIG_PATH, JSON.stringify(config, null, 2));
}

function isAngularBrowserProject(projectConfig: any) {
  if (projectConfig.projectType === 'application') {
    const buildConfig = projectConfig.architect.build;
    return buildConfig.builder === '@angular-devkit/build-angular:browser';
  }

  return false;
}

function getAngularAppConfig(config: any): any | null {
  const projects = config.projects;
  const projectNames = Object.keys(projects);

  for (const projectName of projectNames) {
    const projectConfig = projects[projectName];
    if (isAngularBrowserProject(projectConfig)) {
      return projectConfig;
    }
  }

  return null;
}
