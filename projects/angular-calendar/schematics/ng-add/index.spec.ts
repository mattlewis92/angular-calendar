import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import * as path from 'path';
import { expect } from 'chai';

const collectionPath = path.join(__dirname, '../collection.json');

describe('angular-calendar schematics', () => {
  it('works', async () => {
    const runner = new SchematicTestRunner('schematics', collectionPath);
    const tree = await runner
      .runSchematicAsync('ng-add', {}, Tree.empty())
      .toPromise();

    expect(tree.files).to.deep.equal([]);
  });
});
