import { Injectable } from '@angular/core';
import { CalendarEvent } from 'calendar-utils';
import { DateAdapter } from '../../date-adapters';

@Injectable()
export class EventManagerService {
  constructor(private dateAdapter: DateAdapter) {}

  eventPositionOnWeek(event: CalendarEvent, week: Date[]) {
    const eventStartIndex = week.findIndex(
      (weekDay) => weekDay.getTime() === event.start.getTime()
    );
    const eventEndIndex = week.findIndex((weekDay) => {
      if (event.end) {
        const nextDayStart = this.dateAdapter.addDays(event.end, 1);
        return weekDay.getTime() === nextDayStart.getTime();
      }
      return false;
    });

    const eventStartOnWeek = eventStartIndex > -1;
    const eventEndOnWeek = eventEndIndex > -1;

    const fromEventStartToWeekEndInDays = week.length - eventStartIndex;
    const fromWeekStartToEventEndInDays = eventEndIndex;
    const eventLengthInDays = eventEndIndex - eventStartIndex;

    if (eventStartOnWeek && eventEndOnWeek) {
      return {
        start: eventStartIndex,
        length: eventLengthInDays,
      };
    }
    if (!eventStartOnWeek && eventEndOnWeek) {
      return {
        start: 0,
        length: fromWeekStartToEventEndInDays,
      };
    }
    if (eventStartOnWeek && !eventEndOnWeek) {
      return {
        start: eventStartIndex,
        length: fromEventStartToWeekEndInDays,
      };
    }
    if (!eventStartOnWeek && !eventEndOnWeek) {
      return {
        start: 0,
        length: week.length,
      };
    }
    return { start: 0, length: 0 };
  }

  eventsOnWeek(allEvents: CalendarEvent[], week: Date[]) {
    const endDate = week[week.length - 1];
    const startDate = week[0];
    return allEvents.filter((event: CalendarEvent) => {
      const weekEnd = this.dateAdapter.addDays(endDate, 1);
      const nextDayStart = event.end
        ? this.dateAdapter.addDays(event.end, 1)
        : null;
      return (
        (event.start >= startDate && event.start < weekEnd) ||
        (nextDayStart && nextDayStart >= startDate && nextDayStart < weekEnd) ||
        (event.start < startDate && nextDayStart && nextDayStart > weekEnd)
      );
    });
  }

  eventsPerDayOnWeekWithPosition<
    MetaType = {
      top: number;
      order: number;
      left: number;
      width: number;
    }
  >(
    allEvents: CalendarEvent<MetaType>[],
    week: Date[]
  ): {
    [index: number]: CalendarEvent<MetaType>[];
  } {
    const eventsPerDayOnWeek = this.eventsPerDayOnWeek<MetaType>(
      allEvents,
      week
    );
    const eventsPerDayOnWeekWithTop = this.computeTopOnWeek(
      eventsPerDayOnWeek,
      week
    );
    const eventsPerDayOnWeekWithTopAndLeft = this.computeLeftOnWeek(
      eventsPerDayOnWeekWithTop,
      week
    );
    return this.computeWidthOnWeek(eventsPerDayOnWeekWithTopAndLeft, week);
  }

  eventsPerDayOnWeek<MetaType>(
    allEvents: CalendarEvent<MetaType>[],
    week: Date[]
  ): {
    [dayWeekIndex: number]: CalendarEvent[];
  } {
    return week.reduce(
      (eventsPerDay, weekDay, currentIndex) => {
        eventsPerDay[currentIndex] = this.eventsOnWeek(allEvents, week).filter(
          (event) => {
            const nextDayStart = event.end
              ? this.dateAdapter.addDays(event.end, 1)
              : null;
            return (
              event.start <= weekDay && nextDayStart && weekDay < nextDayStart
            );
          }
        );
        return eventsPerDay;
      },
      {} as {
        [dayWeekIndex: number]: CalendarEvent[];
      }
    );
  }

  computeLeftOnWeek<
    MetaType = {
      left: number;
    }
  >(
    eventsPerDayOnWeek: { [index: number]: CalendarEvent<MetaType>[] },
    week: Date[]
  ): {
    [dayWeekIndex: number]: CalendarEvent<MetaType>[];
  } {
    return Object.keys(eventsPerDayOnWeek).reduce(
      (eventsPerDayOnWeekWithTop, currentDayKey) => {
        const dayEvents = eventsPerDayOnWeek[+currentDayKey];
        eventsPerDayOnWeekWithTop[+currentDayKey] =
          this.computeLeftOnDayEvents<MetaType>(dayEvents, week);
        return eventsPerDayOnWeekWithTop;
      },
      {} as {
        [dayWeekIndex: number]: CalendarEvent[];
      }
    );
  }

  computeLeftOnDayEvents<
    MetaType = {
      left: number;
    }
  >(
    dayEvents: CalendarEvent<MetaType>[],
    week: Date[]
  ): CalendarEvent<MetaType>[] {
    return dayEvents.map<CalendarEvent<MetaType>>((event) => {
      event.meta = {
        ...event.meta,
        left: this.computeLeftOnDayEvent(event, week),
      } as MetaType;
      return event;
    });
  }

  computeLeftOnDayEvent<
    MetaType = {
      left: number;
    }
  >(event: CalendarEvent<MetaType>, week: Date[]): number {
    const eventPositionOnWeekValue = this.eventPositionOnWeek(event, week);
    return eventPositionOnWeekValue.start * (100 / week.length);
  }

  computeWidthOnWeek<
    MetaType = {
      width: number;
    }
  >(
    eventsPerDayOnWeek: { [index: number]: CalendarEvent<MetaType>[] },
    week: Date[]
  ): {
    [dayWeekIndex: number]: CalendarEvent<MetaType>[];
  } {
    return Object.keys(eventsPerDayOnWeek).reduce(
      (eventsPerDayOnWeekWithTop, currentDayKey) => {
        const dayEvents = eventsPerDayOnWeek[+currentDayKey];
        eventsPerDayOnWeekWithTop[+currentDayKey] =
          this.computeWidthOnDayEvents<MetaType>(dayEvents, week);
        return eventsPerDayOnWeekWithTop;
      },
      {} as {
        [dayWeekIndex: number]: CalendarEvent[];
      }
    );
  }

  computeWidthOnDayEvents<
    MetaType = {
      width: number;
    }
  >(
    dayEvents: CalendarEvent<MetaType>[],
    week: Date[]
  ): CalendarEvent<MetaType>[] {
    return dayEvents.map((event) => {
      event.meta = {
        ...event.meta,
        width: this.computeWidthOnDayEvent(event, week),
      } as MetaType;
      return event;
    });
  }

  computeWidthOnDayEvent<
    MetaType = {
      width: number;
    }
  >(event: CalendarEvent<MetaType>, week: Date[]): number {
    const eventPositionOnWeek = this.eventPositionOnWeek(event, week);
    return eventPositionOnWeek.length * (100 / week.length);
  }

  computeTopOnWeek<
    MetaType = {
      top: number;
      order: number;
    }
  >(
    eventsPerDayOnWeek: { [index: number]: CalendarEvent<MetaType>[] },
    week: Date[]
  ): {
    [dayWeekIndex: number]: CalendarEvent[];
  } {
    return Object.keys(eventsPerDayOnWeek).reduce(
      (eventsPerDayOnWeekWithTop, currentDayKey) => {
        const dayEvents = eventsPerDayOnWeek[+currentDayKey];
        eventsPerDayOnWeekWithTop[+currentDayKey] = this.computeTopOnDayEvents(
          dayEvents,
          week
        );
        return eventsPerDayOnWeekWithTop;
      },
      {} as {
        [dayWeekIndex: number]: CalendarEvent[];
      }
    );
  }

  computeTopOnDayEvents<
    MetaType = {
      top: number;
      order: number;
    }
  >(dayEvents: CalendarEvent[], week: Date[]): CalendarEvent<MetaType>[] {
    let ordersReserved: number[] = [];

    const tabWithoutOrder = dayEvents
      .filter((value) => !value.meta.order)
      .sort(
        (prev, current) =>
          this.eventPositionOnWeek(current, week).length -
          this.eventPositionOnWeek(prev, week).length
      );
    ordersReserved = dayEvents
      .filter((value) => value.meta.order)
      .map((value) => +value.meta.order);

    tabWithoutOrder.forEach((calendarEvent) => {
      let index = 1;
      while (ordersReserved.includes(index)) {
        index++;
      }
      ordersReserved.push(index);
      calendarEvent.meta.order = index;
      calendarEvent.meta.top = index;
    });
    return dayEvents.sort((a, b) => a.meta.order - b.meta.order);
  }
}
