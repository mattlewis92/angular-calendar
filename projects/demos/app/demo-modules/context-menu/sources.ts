import component from './component' with { loader: 'text' };
import template from './template.html' with { loader: 'text' };
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
