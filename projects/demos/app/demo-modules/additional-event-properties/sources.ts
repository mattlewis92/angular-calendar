import component from './component' with { loader: 'text' };
import template from './template.html' with { loader: 'text' };
import module from './module' with { loader: 'text' };

export const sources = [
  {
    filename: 'component.ts',
    contents: component,
  },
  {
    filename: 'template.html',
    contents: template,
  },
];
