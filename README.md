# angular2-calendar
A generic calendar component for displaying events. The successor of: https://github.com/mattlewis92/angular-bootstrap-calendar

This is currently very much a WIP and won't be completed for several months.

Design ideas:
* Ditch the bootstrap dependency - create a generic set of styles and then have optional themes that sit on top for bootstrap, material, ionic etc
* Use flexbox because its 2016 and most browsers support this, and it can be [polyfilled](https://github.com/10up/flexibility) easily enough
* Handle bigger amounts of events
