// @ts-expect-error TypeScript cannot provide types based on attributes yet
import component from './component' with { loader: 'text' };
// @ts-expect-error TypeScript cannot provide types based on attributes yet
import template from './template.html' with { loader: 'text' };
// @ts-expect-error TypeScript cannot provide types based on attributes yet
import dayViewSchedulerComponent from './day-view-scheduler.component' with { loader: 'text' };
// @ts-expect-error TypeScript cannot provide types based on attributes yet
import dayViewSchedulerComponentHtml from './day-view-scheduler.component.html' with { loader: 'text' };
// @ts-expect-error TypeScript cannot provide types based on attributes yet
import module from './module' with { loader: 'text' };

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
  },
  {
    filename: 'module.ts',
    contents: module,
  },
];
