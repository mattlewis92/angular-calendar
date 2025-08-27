// @ts-expect-error TypeScript cannot provide types based on attributes yet
import component from './component' with { loader: 'text' };
// @ts-expect-error TypeScript cannot provide types based on attributes yet
import template from './template.html' with { loader: 'text' };
// @ts-expect-error TypeScript cannot provide types based on attributes yet
import styles from './styles.scss' with { loader: 'text' };

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
    contents: styles,
  },
];
