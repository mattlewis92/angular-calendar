import component from './component' with { loader: 'text' };
import template from './template.html' with { loader: 'text' };
import stylesRaw from './styles.scss' with { loader: 'text' };

export const sources = [
  {
    filename: 'component.ts',
    contents: component,
  },
  {
    filename: 'template.html',
    contents: template,
  },
  {
    filename: 'styles.scss',
    contents: stylesRaw.replace(
      '../../../../angular-calendar/src/angular-calendar',
      'angular-calendar/scss/angular-calendar',
    ),
  }
];
