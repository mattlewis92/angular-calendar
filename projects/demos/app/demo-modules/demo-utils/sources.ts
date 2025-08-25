import calendarHeaderComponent from './calendar-header.component' with { loader: 'text' };
import colors from './colors' with { loader: 'text' };
import module from './module' with { loader: 'text' };

export const sources = [
  {
    filename: 'calendar-header.component.ts',
    contents: calendarHeaderComponent,
  },
  {
    filename: 'colors.ts',
    contents: colors,
  },
  {
    filename: 'module.ts',
    contents: module,
  },
];
