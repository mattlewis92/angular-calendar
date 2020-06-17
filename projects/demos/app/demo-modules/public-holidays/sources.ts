export const sources = [
  {
    filename: 'component.ts',
    contents: {
      raw: {
        default: require('!!raw-loader!./component').default.replace(
          '8eb2582d-3a4c-4fc5-94c8-3e21487d4e23',
          'REPLACE_WITH_YOUR_OWN_TOKEN'
        ),
      },
      highlighted: {
        default: require('!!raw-loader!highlightjs-loader?lang=typescript!./component').default.replace(
          '8eb2582d-3a4c-4fc5-94c8-3e21487d4e23',
          'REPLACE_WITH_YOUR_OWN_TOKEN'
        ),
      },
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
