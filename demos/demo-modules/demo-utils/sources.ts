export const sources = [
  {
    filename: 'calendar-header.component.ts',
    contents: {
      raw: require('!!raw-loader!./calendar-header.component'),
      highlighted: require('!!raw-loader!highlightjs-loader?lang=typescript!./calendar-header.component')
    }
  },
  {
    filename: 'colors.ts',
    contents: {
      raw: require('!!raw-loader!./colors'),
      highlighted: require('!!raw-loader!highlightjs-loader?lang=typescript!./colors')
    }
  },
  {
    filename: 'date-time-picker.component.ts',
    contents: {
      raw: require('!!raw-loader!./date-time-picker.component'),
      highlighted: require('!!raw-loader!highlightjs-loader?lang=typescript!./date-time-picker.component')
    }
  },
  {
    filename: 'module.ts',
    contents: {
      raw: require('!!raw-loader!./module'),
      highlighted: require('!!raw-loader!highlightjs-loader?lang=typescript!./module')
    }
  }
];
