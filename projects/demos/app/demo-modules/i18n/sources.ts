import component from './component' with { loader: 'text' };
import customDateFormatterProvider from './custom-date-formatter.provider' with { loader: 'text' };
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
  }
];
