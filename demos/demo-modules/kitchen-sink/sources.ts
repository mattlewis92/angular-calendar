export const sources = [
  {
    filename: 'component.ts',
    contents: require('!!raw-loader!./component')
  },
  {
    filename: 'template.html',
    contents: require('!!raw-loader!./template.html')
  },
  {
    filename: 'styles.css',
    contents: require('!!raw-loader!./styles.css')
  },
  {
    filename: 'module.ts',
    contents: require('!!raw-loader!./module')
  }
];
