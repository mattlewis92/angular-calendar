export const sources = [
  {
    filename: 'component.ts',
    contents: {
      raw: require('!!raw-loader!./component'),
      highlighted: require('!!raw-loader!highlightjs-loader?lang=typescript!./component'),
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
    filename: 'styles.css',
    contents: {
      raw: require('!!raw-loader!./styles.css'),
      highlighted: require('!!raw-loader!highlightjs-loader?lang=css!./styles.css'),
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
