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
    filename: 'styles.scss',
    contents: {
      raw: {
        default: require('!!raw-loader!./styles.scss').default.replace(
          '../../../../angular-calendar/src/angular-calendar.scss',
          '~angular-calendar/scss/angular-calendar.scss'
        ),
      },
      highlighted: {
        default: require('!!raw-loader!highlightjs-loader?lang=scss!./styles.scss').default.replace(
          '../../../../angular-calendar/src/angular-calendar.scss',
          '~angular-calendar/scss/angular-calendar.scss'
        ),
      },
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
