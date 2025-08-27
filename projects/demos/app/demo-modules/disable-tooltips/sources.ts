// @ts-expect-error TypeScript cannot provide types based on attributes yet
import component from './component' with { loader: 'text' };
// @ts-expect-error TypeScript cannot provide types based on attributes yet
import customEventTitleFormatterProvider from './custom-event-title-formatter.provider' with { loader: 'text' };
// @ts-expect-error TypeScript cannot provide types based on attributes yet
import template from './template.html' with { loader: 'text' };

export const sources = [
  {
    filename: 'component.ts',
    contents: component,
  },
  {
    filename: 'custom-event-title-formatter.provider.ts',
    contents: customEventTitleFormatterProvider,
  },
  {
    filename: 'template.html',
    contents: template,
  },
];
