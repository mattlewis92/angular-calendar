// @ts-expect-error TypeScript cannot provide types based on attributes yet
import component from './component' with { loader: 'text' };
// @ts-expect-error TypeScript cannot provide types based on attributes yet
import template from './template.html' with { loader: 'text' };
// @ts-expect-error TypeScript cannot provide types based on attributes yet
import module from './module' with { loader: 'text' };

export const sources = [
  {
    filename: 'component.ts',
    contents: component.replace(
      '8eb2582d-3a4c-4fc5-94c8-3e21487d4e23',
      'REPLACE_WITH_YOUR_OWN_TOKEN',
    ),
  },
  {
    filename: 'template.html',
    contents: template,
  },
  {
    filename: 'module.ts',
    contents: module,
  },
];
