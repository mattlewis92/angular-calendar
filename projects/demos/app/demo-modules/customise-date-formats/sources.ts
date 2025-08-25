// @ts-expect-error TypeScript cannot provide types based on attributes yet
import component from './component' with { loader: 'text' };
// @ts-expect-error TypeScript cannot provide types based on attributes yet
import customDateFormatterProvider from './custom-date-formatter.provider' with { loader: 'text' };
// @ts-expect-error TypeScript cannot provide types based on attributes yet
import template from './template.html' with { loader: 'text' };

export const sources = [
  {
    filename: 'component.ts',
    contents: component,
  },
  {
    filename: 'custom-date-formatter.provider.ts',
    contents: customDateFormatterProvider,
  },
  {
    filename: 'template.html',
    contents: template,
  },
];
