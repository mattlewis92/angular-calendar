import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import { CalendarEvent } from 'angular-calendar';
import { isSameMonth, isSameDay, startOfMonth, endOfMonth, startOfWeek, endOfWeek, startOfDay, endOfDay, format } from 'date-fns';
import { Observable } from 'rxjs/Observable';
import { colors } from '../demo-utils/colors';

interface Film {
  id: number;
  title: string;
  release_date: string;
}

@Component({
  selector: 'mwl-demo-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'template.html'
})
export class DemoComponent implements OnInit {

  view: string = 'month';

  viewDate: Date = new Date();

  events$: Observable<CalendarEvent[]>;

  activeDayIsOpen: boolean = false;

  constructor(private http: Http) {}

  ngOnInit(): void {
    this.fetchEvents();
  }

  fetchEvents(): void {

    const getStart: any = {
      month: startOfMonth,
      week: startOfWeek,
      day: startOfDay
    }[this.view];

    const getEnd: any = {
      month: endOfMonth,
      week: endOfWeek,
      day: endOfDay
    }[this.view];

    const search: URLSearchParams = new URLSearchParams();
    search.set('primary_release_date.gte', format(getStart(this.viewDate), 'YYYY-MM-DD'));
    search.set('primary_release_date.lte', format(getEnd(this.viewDate), 'YYYY-MM-DD'));
    search.set('api_key', '0ec33936a68018857d727958dca1424f');
    this.events$ = this.http
      .get('https://api.themoviedb.org/3/discover/movie', {search})
      .map(res => res.json())
      .map(({results}: {results: Film[]}) => {
        return results.map((film: Film) => {
          return {
            title: film.title,
            start: new Date(film.release_date),
            color: colors.yellow,
            meta: {
              film
            }
          };
        });
      });
  }

  dayClicked({date, events}: {date: Date, events: CalendarEvent[]}): void {

    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }

  eventClicked(event: CalendarEvent): void {
    window.open(`https://www.themoviedb.org/movie/${event.meta.film.id}`, '_blank');
  }

}

