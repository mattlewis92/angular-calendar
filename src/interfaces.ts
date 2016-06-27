import {Moment} from 'moment';

export interface CalendarDay {
  date: Moment;
}

export interface CalendarEvent {
  start: Date;
  end?: Date;
  title: string;
  color: string;
}
