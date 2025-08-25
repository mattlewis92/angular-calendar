import component from './component' with { loader: 'text' };
import customEventTitleFormatterProvider from './custom-event-title-formatter.provider' with { loader: 'text' };
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
  }
];
