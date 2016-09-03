# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="0.1.0"></a>
# 0.1.0 (2016-09-03)


### Bug Fixes

* **calendarUtils:** dont bundle calendar-utils with the dist files ([acea613](https://github.com/mattlewis92/angular2-calendar/commit/acea613)), closes [#45](https://github.com/mattlewis92/angular2-calendar/issues/45)
* **cellModifier:** dont require objects to be returned ([e9d74c9](https://github.com/mattlewis92/angular2-calendar/commit/e9d74c9))
* **dayView:** fix hover over styling and click of hour segments ([395d0ff](https://github.com/mattlewis92/angular2-calendar/commit/395d0ff)), closes [#51](https://github.com/mattlewis92/angular2-calendar/issues/51)
* **monthView:** allow opening the slidebox if there are 0 events ([4830c0f](https://github.com/mattlewis92/angular2-calendar/commit/4830c0f))
* **monthView:** fix slidebox animation in chrome 52 ([30267c1](https://github.com/mattlewis92/angular2-calendar/commit/30267c1))
* **monthView:** vertical align slidebox events ([4fa2840](https://github.com/mattlewis92/angular2-calendar/commit/4fa2840))
* **monthView:** wrap long amounts of events across multiple lines ([59b089c](https://github.com/mattlewis92/angular2-calendar/commit/59b089c))
* **sass:** dont bundle sass files with the module ([d8a3e3c](https://github.com/mattlewis92/angular2-calendar/commit/d8a3e3c)), closes [#50](https://github.com/mattlewis92/angular2-calendar/issues/50)
* **weekView:** make headers match the styling of the original calendar ([107ac76](https://github.com/mattlewis92/angular2-calendar/commit/107ac76))
* **weekView:** reduce margin between events ([d7105df](https://github.com/mattlewis92/angular2-calendar/commit/d7105df))
* **weekView:** truncate long event titles ([0a4fae6](https://github.com/mattlewis92/angular2-calendar/commit/0a4fae6))


### Features

* **angular:** upgrade to RC6 ([efdc5f8](https://github.com/mattlewis92/angular2-calendar/commit/efdc5f8))
* **calendarConfig:** add config class that lets all date formats be configured ([958a764](https://github.com/mattlewis92/angular2-calendar/commit/958a764)), closes [#17](https://github.com/mattlewis92/angular2-calendar/issues/17)
* **calendarDateFormatter:** refactor all date formatting into the CalendarDateFormatter service ([02dc9ce](https://github.com/mattlewis92/angular2-calendar/commit/02dc9ce)), closes [#35](https://github.com/mattlewis92/angular2-calendar/issues/35)
* **calendarTitle:** add the calendar title pipe ([46610fa](https://github.com/mattlewis92/angular2-calendar/commit/46610fa)), closes [#11](https://github.com/mattlewis92/angular2-calendar/issues/11)
* **cssClass:** support adding css classes on the month and week views ([6d555a4](https://github.com/mattlewis92/angular2-calendar/commit/6d555a4)), closes [#13](https://github.com/mattlewis92/angular2-calendar/issues/13)
* **dayView:** allow all hour labels to be displayed ([8a125bd](https://github.com/mattlewis92/angular2-calendar/commit/8a125bd))
* **dayView:** allow hour segments to be modified ([4091ced](https://github.com/mattlewis92/angular2-calendar/commit/4091ced)), closes [#47](https://github.com/mattlewis92/angular2-calendar/issues/47)
* **dayView:** initial day view implementation ([92dea3c](https://github.com/mattlewis92/angular2-calendar/commit/92dea3c)), closes [#4](https://github.com/mattlewis92/angular2-calendar/issues/4)
* **dayView:** support allDay events ([24fe7c1](https://github.com/mattlewis92/angular2-calendar/commit/24fe7c1)), closes [#33](https://github.com/mattlewis92/angular2-calendar/issues/33)
* **eventTitle:** allow the event title to be displayed differently on each view ([4d494f8](https://github.com/mattlewis92/angular2-calendar/commit/4d494f8)), closes [#22](https://github.com/mattlewis92/angular2-calendar/issues/22)
* **locale:** allow the locale to be changed ([89313d3](https://github.com/mattlewis92/angular2-calendar/commit/89313d3)), closes [#39](https://github.com/mattlewis92/angular2-calendar/issues/39)
* **monthView:** add event actions ([4fa11ea](https://github.com/mattlewis92/angular2-calendar/commit/4fa11ea)), closes [#19](https://github.com/mattlewis92/angular2-calendar/issues/19)
* **monthView:** add event clicked callback ([e9816d2](https://github.com/mattlewis92/angular2-calendar/commit/e9816d2))
* **monthView:** add initial slidebox implementation ([7b4cae7](https://github.com/mattlewis92/angular2-calendar/commit/7b4cae7))
* **monthView:** add on mouse over styling ([9f2a47b](https://github.com/mattlewis92/angular2-calendar/commit/9f2a47b))
* **monthView:** add open class and styling to the open day ([a7d22ba](https://github.com/mattlewis92/angular2-calendar/commit/a7d22ba)), closes [#3](https://github.com/mattlewis92/angular2-calendar/issues/3)
* **monthView:** add refresh input observable to force a re-render of the current view ([31f39ff](https://github.com/mattlewis92/angular2-calendar/commit/31f39ff))
* **monthView:** add slidebox animation ([fd80575](https://github.com/mattlewis92/angular2-calendar/commit/fd80575)), closes [#6](https://github.com/mattlewis92/angular2-calendar/issues/6)
* **monthView:** add styling for events ([4b5ca38](https://github.com/mattlewis92/angular2-calendar/commit/4b5ca38))
* **monthView:** add tooltips to events on hover ([43cbec7](https://github.com/mattlewis92/angular2-calendar/commit/43cbec7)), closes [#8](https://github.com/mattlewis92/angular2-calendar/issues/8)
* **monthView:** allow the badge total to be customised ([81a8eec](https://github.com/mattlewis92/angular2-calendar/commit/81a8eec)), closes [#44](https://github.com/mattlewis92/angular2-calendar/issues/44)
* **monthView:** display events on each day ([1568ad9](https://github.com/mattlewis92/angular2-calendar/commit/1568ad9))
* **monthView:** implement cell modifier ([3d751b5](https://github.com/mattlewis92/angular2-calendar/commit/3d751b5)), closes [#15](https://github.com/mattlewis92/angular2-calendar/issues/15)
* **monthView:** implement event highlight ([8aa31af](https://github.com/mattlewis92/angular2-calendar/commit/8aa31af)), closes [#7](https://github.com/mattlewis92/angular2-calendar/issues/7)
* **monthView:** implement initial grid layout for month view ([7a1b4f9](https://github.com/mattlewis92/angular2-calendar/commit/7a1b4f9))
* **monthView:** match styling of original calendar ([f18621c](https://github.com/mattlewis92/angular2-calendar/commit/f18621c))
* **monthView:** re-add the month view event total ([bb04409](https://github.com/mattlewis92/angular2-calendar/commit/bb04409))
* **monthView:** show the entire views events ([45ee20c](https://github.com/mattlewis92/angular2-calendar/commit/45ee20c)), closes [#34](https://github.com/mattlewis92/angular2-calendar/issues/34)
* **tooltip:** allow the event tooltips to be customised ([e381ccd](https://github.com/mattlewis92/angular2-calendar/commit/e381ccd)), closes [#46](https://github.com/mattlewis92/angular2-calendar/issues/46)
* **tooltip:** allow the tooltip placement to be customised ([e5346fa](https://github.com/mattlewis92/angular2-calendar/commit/e5346fa))
* **tooltip:** support disabling the tooltip ([705315d](https://github.com/mattlewis92/angular2-calendar/commit/705315d))
* **trackBy:** add trackBy to all ngFor repeated elements ([051c09b](https://github.com/mattlewis92/angular2-calendar/commit/051c09b)), closes [#25](https://github.com/mattlewis92/angular2-calendar/issues/25)
* **weekView:** add event clicked callback ([992df72](https://github.com/mattlewis92/angular2-calendar/commit/992df72)), closes [#5](https://github.com/mattlewis92/angular2-calendar/issues/5)
* add ngmodule, remove deprecated angular apis ([a9ffcbf](https://github.com/mattlewis92/angular2-calendar/commit/a9ffcbf))
* **weekView:** add event title tooltip ([1777b27](https://github.com/mattlewis92/angular2-calendar/commit/1777b27))
* **weekView:** add initial week view implementation ([5b6188d](https://github.com/mattlewis92/angular2-calendar/commit/5b6188d))
* use change detection strategy OnPush ([116d787](https://github.com/mattlewis92/angular2-calendar/commit/116d787)), closes [#23](https://github.com/mattlewis92/angular2-calendar/issues/23)
* **weekView:** add onDayClicked callback ([3644c5b](https://github.com/mattlewis92/angular2-calendar/commit/3644c5b)), closes [#14](https://github.com/mattlewis92/angular2-calendar/issues/14)
* **weekView:** add refresh input observable that can be used to manually refresh the calendar ([21b55d0](https://github.com/mattlewis92/angular2-calendar/commit/21b55d0)), closes [#24](https://github.com/mattlewis92/angular2-calendar/issues/24)
* **weekView:** add week view header ([0333481](https://github.com/mattlewis92/angular2-calendar/commit/0333481))
