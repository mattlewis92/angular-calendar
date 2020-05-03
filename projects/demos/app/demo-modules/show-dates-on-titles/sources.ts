export const sources = [
  {
    filename: 'component.ts',
    contents: {
      raw: require('!!raw-loader!./component'),
      highlighted: require('!!raw-loader!highlightjs-loader?lang=typescript!./component'),
    },
  },
  {
    filename: 'custom-event-title-formatter.provider.ts',
    contents: {
      raw: require('!!raw-loader!./custom-event-title-formatter.provider'),
      highlighted: require('!!raw-loader!highlightjs-loader?lang=typescript!./custom-event-title-formatter.provider'),
    },
  },
  {
    filename: 'template.html',
    contents: {
      raw: require('!!raw-loader!./template.html'),
      highlighted: require('!!raw-loader!highlightjs-loader?lang=xml!./template.html'),
    },
  },
  {
    filename: 'module.ts',
    contents: {
      raw: require('!!raw-loader!./module'),
      highlighted: require('!!raw-loader!highlightjs-loader?lang=typescript!./module'),
    },
  },
];
