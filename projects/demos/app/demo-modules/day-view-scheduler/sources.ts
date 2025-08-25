import component from './component' with { loader: 'text' };
import template from './template.html' with { loader: 'text' };
import dayViewSchedulerComponent from './day-view-scheduler.component' with { loader: 'text' };
import dayViewSchedulerComponentHtml from './day-view-scheduler.component.html' with { loader: 'text' };

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
    filename: 'day-view-scheduler.component.ts',
    contents: dayViewSchedulerComponent,
  },
  {
    filename: 'day-view-scheduler.component.html',
    contents: dayViewSchedulerComponentHtml,
  }
];
