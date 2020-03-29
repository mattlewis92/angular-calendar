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
    filename: 'day-view-scheduler.component.ts',
    contents: {
      raw: require('!!raw-loader!./day-view-scheduler.component'),
      highlighted: require('!!raw-loader!highlightjs-loader?lang=typescript!./day-view-scheduler.component'),
    },
  },
  {
    filename: 'day-view-scheduler.component.html',
    contents: {
      raw: require('!!raw-loader!./day-view-scheduler.component.html'),
      highlighted: require('!!raw-loader!highlightjs-loader?lang=xml!./day-view-scheduler.component.html'),
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
