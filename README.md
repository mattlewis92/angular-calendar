# angular2-calendar
A generic calendar component for displaying events. The successor of: https://github.com/mattlewis92/angular-bootstrap-calendar

This is currently very much a WIP and won't be completed for several months. Community contributions are very welcome!

High level design goals:
* Support everything the current angular1 calendar does with a near identical API
* Authored in typescript
* Ditch the bootstrap dependency - create a generic set of styles and then have optional themes that sit on top for bootstrap, material, ionic etc
* Use flexbox because its 2016 and most browsers support this, and it can be [polyfilled](https://github.com/10up/flexibility) easily enough
* Handle bigger amounts of events
* Much improved week view
* Remove the year view as it doesn't really add much value
* Create an abstraction layer around the drag, drop and resizing of events so the user can allow any drag and drop library to be used

Prior art:
* https://github.com/mattlewis92/angular-bootstrap-calendar
* http://fullcalendar.io/
* Apple calendar app
