export const sources = [
  {
    filename: 'component.ts',
    contents: require('!!raw-loader!./component')
  },
  {
    filename: 'custom-event-title-formatter.provider.ts',
    contents: require('!!raw-loader!./custom-event-title-formatter.provider')
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
