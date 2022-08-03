import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import { join } from 'path';

export interface AppOptions {
  name: string;
}

const SCHEMATICS_PACKAGE_NAME = '@schematics/angular';
const collectionPath = join(__dirname, '../collection.json');
export async function createTestApp(
  appOptions: AppOptions
): Promise<UnitTestTree> {
  const runner = new SchematicTestRunner(
    'angular-calendar-schematics',
    collectionPath
  );
  const workspace = await runner
    .runExternalSchematicAsync(SCHEMATICS_PACKAGE_NAME, 'workspace', {
      name: 'workspace',
      version: '9.0.0',
      newProjectRoot: 'projects',
    })
    .toPromise();

  return runner
    .runExternalSchematicAsync(
      SCHEMATICS_PACKAGE_NAME,
      'application',
      {
        name: appOptions.name,
        ...appOptions,
      },
      workspace
    )
    .toPromise();
}
