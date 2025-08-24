// @ts-expect-error TypeScript cannot provide types based on attributes yet
import component from './component' with { loader: 'text' };
// @ts-expect-error TypeScript cannot provide types based on attributes yet
import template from './template.html' with { loader: 'text' };
// @ts-expect-error TypeScript cannot provide types based on attributes yet
import stylesRaw from './styles.scss' with { loader: 'text' };
// @ts-expect-error TypeScript cannot provide types based on attributes yet
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
  {
    filename: 'styles.scss',
    contents: {
      default: stylesRaw.replace(
        '../../../../angular-calendar/src/angular-calendar.scss',
        'angular-calendar/scss/angular-calendar.scss',
      ),
    },
  },
  {
    filename: 'module.ts',
    contents: module,
  },
];
