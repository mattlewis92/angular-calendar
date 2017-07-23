export const sources = [
  {
    filename: 'component.ts',
    contents: require('!!raw-loader!./component')
  },
  {
    filename: 'custom-date-formatter.provider.ts',
    contents: require('!!raw-loader!./custom-date-formatter.provider')
  },
  {
    filename: 'template.html',
    contents: require('!!raw-loader!./template.html')
  },
  {
    filename: 'module.ts',
    contents: require('!!raw-loader!./module')
  }
];
