import { Injectable } from '@angular/core';
import { CalendarEvent } from 'calendar-utils';
import { DateAdapter } from '../../date-adapters';

@Injectable({
  providedIn: 'root',
})
export class EventManagerService {
  constructor(private dateAdapter: DateAdapter) {}

  eventPositionOnWeek(event: CalendarEvent, week: Date[]) {
    const eventStartIndex = week.findIndex(
      (weekDay) => weekDay.getTime() === event.start.getTime()
    );
    const eventEndIndex = week.findIndex(
      (weekDay) => weekDay.getTime() === event.end.getTime()
    );

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
  }

  eventsOnWeek(allEvents: CalendarEvent[], week: Date[], timeZone: string) {
    const endDate = week[week.length - 1];
    const startDate = week[0];
    return allEvents.filter((event: CalendarEvent) => {
      const weekEnd = this.dateAdapter.addDays(endDate, 1);
      return (
        (event.start >= startDate && event.start < weekEnd) ||
        (event.end >= startDate && event.end < weekEnd) ||
        (event.start < startDate && event.end > weekEnd)
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
    week: Date[],
    timeZone: string
  ): {
    [index: number]: CalendarEvent<MetaType>[];
  } {
    const eventsPerDayOnWeek = this.eventsPerDayOnWeek<MetaType>(
      allEvents,
      week,
      timeZone
    );
    const eventsPerDayOnWeekWithTop = this.computeTopOnWeek(
      eventsPerDayOnWeek,
      week
    );
    const eventsPerDayOnWeekWithTopAndLeft = this.computeLeftOnWeek(
      eventsPerDayOnWeekWithTop,
      week
    );
    const eventsPerDayOnWeekWithTopAndLeftAndWidth = this.computeWidthOnWeek(
      eventsPerDayOnWeekWithTopAndLeft,
      week
    );
    return eventsPerDayOnWeekWithTopAndLeftAndWidth;
  }

  eventsPerDayOnWeek<MetaType>(
    allEvents: CalendarEvent<MetaType>[],
    week: Date[],
    timeZone: string
  ): {
    [dayWeekIndex: number]: CalendarEvent[];
  } {
    return week.reduce((eventsPerDay, weekDay, currentIndex) => {
      eventsPerDay[currentIndex] = this.eventsOnWeek(
        allEvents,
        week,
        timeZone
      ).filter((event) => {
        return event.start <= weekDay && weekDay < event.end;
      });
      return eventsPerDay;
    }, {});
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
        const dayEvents = eventsPerDayOnWeek[currentDayKey];
        eventsPerDayOnWeekWithTop[currentDayKey] =
          this.computeLeftOnDayEvents<MetaType>(dayEvents, week);
        return eventsPerDayOnWeekWithTop;
      },
      {}
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
    const computedDayEvents = structuredClone(dayEvents);
    return computedDayEvents.map<CalendarEvent<MetaType>>((event) => {
      event.meta = {
        ...event.meta,
        left: this.computeLeftOnDayEvent(event, week),
      };
      return event;
    });
  }

  computeLeftOnDayEvent<
    MetaType = {
      left: number;
    }
  >(event: CalendarEvent<MetaType>, week: Date[]): number {
    const eventPositionOnWeek = this.eventPositionOnWeek(event, week);
    return eventPositionOnWeek.start * (100 / week.length);
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
        const dayEvents = eventsPerDayOnWeek[currentDayKey];
        eventsPerDayOnWeekWithTop[currentDayKey] =
          this.computeWidthOnDayEvents<MetaType>(dayEvents, week);
        return eventsPerDayOnWeekWithTop;
      },
      {}
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
    const computedDayEvents = structuredClone(dayEvents);
    return computedDayEvents.map((event) => {
      event.meta = {
        ...event.meta,
        width: this.computeWidthOnDayEvent(event, week),
      };
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
        const dayEvents = eventsPerDayOnWeek[currentDayKey];
        eventsPerDayOnWeekWithTop[currentDayKey] = this.computeTopOnDayEvents(
          dayEvents,
          week
        );
        return eventsPerDayOnWeekWithTop;
      },
      {}
    );
  }

  computeTopOnDayEvents<
    MetaType = {
      top: number;
      order: number;
    }
  >(dayEvents: CalendarEvent[], week: Date[]): CalendarEvent<MetaType>[] {
    let tabWithoutOrder: CalendarEvent[] = [];
    let ordersReserved: number[] = [];

    tabWithoutOrder = dayEvents
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
    return dayEvents;
  }
}
