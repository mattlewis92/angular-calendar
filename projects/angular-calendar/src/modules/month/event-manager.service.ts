import { Injectable } from '@angular/core';
import { CalendarEvent } from 'calendar-utils';
import * as moment from 'moment-timezone';

@Injectable({
  providedIn: 'root',
})
export class EventManagerService {
  eventLengthInDaysOnWeek(
    event: CalendarEvent,
    week: Date[],
    timeZone: string
  ) {
    const eventStartIndex = this.eventStartIndexOnWeek(event, week);
    const eventEndIndex = this.eventEndIndexOnWeek(event, week, timeZone);

    const eventStartOnWeek = eventStartIndex > -1;
    const eventEndOnWeek = eventEndIndex > -1;

    const fromEventStartToWeekEndInDays = week.length - eventStartIndex;
    const fromWeekStartToEventEndInDays = eventEndIndex;
    const eventLengthInDays = eventEndIndex - eventStartIndex;

    if (eventStartOnWeek && eventEndOnWeek) {
      return eventLengthInDays;
    }
    if (!eventStartOnWeek && eventEndOnWeek) {
      return fromWeekStartToEventEndInDays;
    }
    if (eventStartOnWeek && !eventEndOnWeek) {
      return fromEventStartToWeekEndInDays;
    }
    if (!eventStartOnWeek && !eventEndOnWeek) {
      return week.length;
    }
  }

  eventsOnWeek(allEvents: CalendarEvent[], week: Date[], timeZone: string) {
    const endDate = week[week.length - 1];
    const startDate = week[0];
    return allEvents.filter((event: CalendarEvent) => {
      const eventEnd = moment.tz(event.end, timeZone).add(1, 'd').toDate();
      const weekEnd = moment.tz(endDate, timeZone).add(1, 'd').toDate();
      return (
        (event.start >= startDate && event.start < weekEnd) ||
        (eventEnd >= startDate && eventEnd < weekEnd) ||
        (event.start < startDate && eventEnd > weekEnd)
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
      week,
      timeZone
    );
    const eventsPerDayOnWeekWithTopAndLeft = this.computeLeftOnWeek(
      eventsPerDayOnWeekWithTop,
      week
    );
    const eventsPerDayOnWeekWithTopAndLeftAndWidth = this.computeWidthOnWeek(
      eventsPerDayOnWeekWithTopAndLeft,
      week,
      timeZone
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
        const eventEnd = moment.tz(event.end, timeZone).add(1, 'd').toDate();
        return event.start <= weekDay && weekDay < eventEnd;
      });
      return eventsPerDay;
    }, {});
  }

  eventStartIndexOnWeek(event: CalendarEvent, week: Date[]) {
    return week.findIndex(
      (weekDay) => weekDay.getTime() === event.start.getTime()
    );
  }

  eventEndIndexOnWeek(event: CalendarEvent, week: Date[], timeZone: string) {
    const eventEnd = moment.tz(event.end, timeZone).add(1, 'd').toDate();
    return week.findIndex(
      (weekDay) => weekDay.getTime() === eventEnd.getTime()
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
    const eventStartIndexOnWeek = this.eventStartIndexOnWeek(event, week);
    let left: number;
    if (eventStartIndexOnWeek > 0) {
      left = eventStartIndexOnWeek * (100 / week.length);
    } else {
      left = 0;
    }
    return left;
  }

  computeWidthOnWeek<
    MetaType = {
      width: number;
    }
  >(
    eventsPerDayOnWeek: { [index: number]: CalendarEvent<MetaType>[] },
    week: Date[],
    timeZone: string
  ): {
    [dayWeekIndex: number]: CalendarEvent<MetaType>[];
  } {
    return Object.keys(eventsPerDayOnWeek).reduce(
      (eventsPerDayOnWeekWithTop, currentDayKey) => {
        const dayEvents = eventsPerDayOnWeek[currentDayKey];
        eventsPerDayOnWeekWithTop[currentDayKey] =
          this.computeWidthOnDayEvents<MetaType>(dayEvents, week, timeZone);
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
    week: Date[],
    timeZone: string
  ): CalendarEvent<MetaType>[] {
    const computedDayEvents = structuredClone(dayEvents);
    return computedDayEvents.map((event) => {
      event.meta = {
        ...event.meta,
        width: this.computeWidthOnDayEvent(event, week, timeZone),
      };
      return event;
    });
  }

  computeWidthOnDayEvent<
    MetaType = {
      width: number;
    }
  >(event: CalendarEvent<MetaType>, week: Date[], timeZone: string): number {
    const width =
      this.eventLengthInDaysOnWeek(event, week, timeZone) * (100 / week.length);
    return width;
  }

  computeTopOnWeek<
    MetaType = {
      top: number;
      order: number;
    }
  >(
    eventsPerDayOnWeek: { [index: number]: CalendarEvent<MetaType>[] },
    week: Date[],
    timeZone: string
  ): {
    [dayWeekIndex: number]: CalendarEvent[];
  } {
    return Object.keys(eventsPerDayOnWeek).reduce(
      (eventsPerDayOnWeekWithTop, currentDayKey) => {
        const dayEvents = eventsPerDayOnWeek[currentDayKey];
        eventsPerDayOnWeekWithTop[currentDayKey] = this.computeTopOnDayEvents(
          dayEvents,
          week,
          timeZone
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
  >(
    dayEvents: CalendarEvent[],
    week: Date[],
    timeZone: string
  ): CalendarEvent<MetaType>[] {
    let tabWithoutOrder: CalendarEvent[] = [];
    let ordersReserved: number[] = [];
    const computedDayEvents = structuredClone(dayEvents);

    tabWithoutOrder = computedDayEvents
      .filter((value) => !value.meta.order)
      .sort(
        (prev, current) =>
          this.eventLengthInDaysOnWeek(current, week, timeZone) -
          this.eventLengthInDaysOnWeek(prev, week, timeZone)
      );
    ordersReserved = computedDayEvents
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
    return computedDayEvents;
  }
}
