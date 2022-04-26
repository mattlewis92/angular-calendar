!function(){"use strict";function e(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}(self.webpackChunkangular_calendar=self.webpackChunkangular_calendar||[]).push([[8092],{78767:function(n,t,i){i.d(t,{$:function(){return o}});var a=i(37716),v=i(4606),w=i(31726),c=i(22167),u=i(60897),r=i(12153),o=function n(){e(this,n),this.locale="en",this.viewChange=new a.vpe,this.viewDateChange=new a.vpe,this.CalendarView=v.w};o.\u0275fac=function(e){return new(e||o)},o.\u0275cmp=a.Xpm({type:o,selectors:[["mwl-demo-utils-calendar-header"]],inputs:{view:"view",viewDate:"viewDate",locale:"locale"},outputs:{viewChange:"viewChange",viewDateChange:"viewDateChange"},decls:43,vars:16,consts:[[1,"row","text-center"],[1,"col-md-4"],[1,"btn-group"],["mwlCalendarPreviousView","",1,"btn","btn-primary",3,"view","viewDate","viewDateChange"],["mwlCalendarToday","",1,"btn","btn-outline-secondary",3,"viewDate","viewDateChange"],["mwlCalendarNextView","",1,"btn","btn-primary",3,"view","viewDate","viewDateChange"],[1,"btn","btn-primary",3,"click"]],template:function(e,n){1&e&&(a._uU(0,"\n    "),a.TgZ(1,"div",0),a._uU(2,"\n      "),a.TgZ(3,"div",1),a._uU(4,"\n        "),a.TgZ(5,"div",2),a._uU(6,"\n          "),a.TgZ(7,"div",3),a.NdJ("viewDateChange",function(e){return n.viewDate=e})("viewDateChange",function(){return n.viewDateChange.next(n.viewDate)}),a._uU(8,"\n            Previous\n          "),a.qZA(),a._uU(9,"\n          "),a.TgZ(10,"div",4),a.NdJ("viewDateChange",function(e){return n.viewDate=e})("viewDateChange",function(){return n.viewDateChange.next(n.viewDate)}),a._uU(11,"\n            Today\n          "),a.qZA(),a._uU(12,"\n          "),a.TgZ(13,"div",5),a.NdJ("viewDateChange",function(e){return n.viewDate=e})("viewDateChange",function(){return n.viewDateChange.next(n.viewDate)}),a._uU(14,"\n            Next\n          "),a.qZA(),a._uU(15,"\n        "),a.qZA(),a._uU(16,"\n      "),a.qZA(),a._uU(17,"\n      "),a.TgZ(18,"div",1),a._uU(19,"\n        "),a.TgZ(20,"h3"),a._uU(21),a.ALo(22,"calendarDate"),a.qZA(),a._uU(23,"\n      "),a.qZA(),a._uU(24,"\n      "),a.TgZ(25,"div",1),a._uU(26,"\n        "),a.TgZ(27,"div",2),a._uU(28,"\n          "),a.TgZ(29,"div",6),a.NdJ("click",function(){return n.viewChange.emit(n.CalendarView.Month)}),a._uU(30,"\n            Month\n          "),a.qZA(),a._uU(31,"\n          "),a.TgZ(32,"div",6),a.NdJ("click",function(){return n.viewChange.emit(n.CalendarView.Week)}),a._uU(33,"\n            Week\n          "),a.qZA(),a._uU(34,"\n          "),a.TgZ(35,"div",6),a.NdJ("click",function(){return n.viewChange.emit(n.CalendarView.Day)}),a._uU(36,"\n            Day\n          "),a.qZA(),a._uU(37,"\n        "),a.qZA(),a._uU(38,"\n      "),a.qZA(),a._uU(39,"\n    "),a.qZA(),a._uU(40,"\n    "),a._UZ(41,"br"),a._uU(42,"\n  ")),2&e&&(a.xp6(7),a.Q6J("view",n.view)("viewDate",n.viewDate),a.xp6(3),a.Q6J("viewDate",n.viewDate),a.xp6(3),a.Q6J("view",n.view)("viewDate",n.viewDate),a.xp6(8),a.Oqu(a.Dn7(22,12,n.viewDate,n.view+"ViewTitle",n.locale)),a.xp6(8),a.ekj("active",n.view===n.CalendarView.Month),a.xp6(3),a.ekj("active",n.view===n.CalendarView.Week),a.xp6(3),a.ekj("active",n.view===n.CalendarView.Day))},directives:[w.O,c.i,u.T],pipes:[r.J],encapsulation:2})},57671:function(n,t,i){i.d(t,{S:function(){return u}});var a=i(38583),v=i(93092),w=i(95008),c=i(37716),u=function n(){e(this,n)};u.\u0275fac=function(e){return new(e||u)},u.\u0275mod=c.oAB({type:u}),u.\u0275inj=c.cJS({imports:[[a.ez,v.u5,w._8]]})},68092:function(n,t,i){i.r(t),i.d(t,{DemoModule:function(){return U}});var a=i(38583),v=i(89328),w=i(95008),c=i(90008),u=i(57671),r=i(4606),o=i(55155),l=i(37716),s=i(78767),d=i(9072),D=i(59687),h=i(50811);function f(e,n){if(1&e&&(l.TgZ(0,"mwl-calendar-month-view",4),l._uU(1,"\n  "),l.qZA()),2&e){var t=l.oxw();l.Q6J("viewDate",t.viewDate)("events",t.events)("activeDayIsOpen",!0)}}function g(e,n){if(1&e&&(l.TgZ(0,"mwl-calendar-week-view",5),l._uU(1,"\n  "),l.qZA()),2&e){var t=l.oxw();l.Q6J("viewDate",t.viewDate)("events",t.events)}}function p(e,n){if(1&e&&(l.TgZ(0,"mwl-calendar-day-view",5),l._uU(1,"\n  "),l.qZA()),2&e){var t=l.oxw();l.Q6J("viewDate",t.viewDate)("events",t.events)}}var C=function n(){var t=this;e(this,n),this.view=r.w.Month,this.viewDate=new Date,this.events=[{title:"Editable event",color:o.O.yellow,start:new Date,actions:[{label:'<i class="fas fa-fw fa-pencil-alt"></i>',onClick:function(e){var n=e.event;console.log("Edit event",n)}}]},{title:"Deletable event",color:o.O.blue,start:new Date,actions:[{label:'<i class="fas fa-fw fa-trash-alt"></i>',onClick:function(e){var n=e.event;t.events=t.events.filter(function(e){return e!==n}),console.log("Event deleted",n)}}]},{title:"Non editable and deletable event",color:o.O.red,start:new Date}]};C.\u0275fac=function(e){return new(e||C)},C.\u0275cmp=l.Xpm({type:C,selectors:[["mwl-demo-component"]],decls:12,vars:6,consts:[[3,"view","viewDate","viewChange","viewDateChange"],[3,"ngSwitch"],[3,"viewDate","events","activeDayIsOpen",4,"ngSwitchCase"],[3,"viewDate","events",4,"ngSwitchCase"],[3,"viewDate","events","activeDayIsOpen"],[3,"viewDate","events"]],template:function(e,n){1&e&&(l.TgZ(0,"mwl-demo-utils-calendar-header",0),l.NdJ("viewChange",function(e){return n.view=e})("viewDateChange",function(e){return n.viewDate=e}),l._uU(1,"\n"),l.qZA(),l._uU(2,"\n\n"),l.TgZ(3,"div",1),l._uU(4,"\n  "),l.YNc(5,f,2,3,"mwl-calendar-month-view",2),l._uU(6,"\n  "),l.YNc(7,g,2,2,"mwl-calendar-week-view",3),l._uU(8,"\n  "),l.YNc(9,p,2,2,"mwl-calendar-day-view",3),l._uU(10,"\n"),l.qZA(),l._uU(11,"\n")),2&e&&(l.Q6J("view",n.view)("viewDate",n.viewDate),l.xp6(3),l.Q6J("ngSwitch",n.view),l.xp6(2),l.Q6J("ngSwitchCase","month"),l.xp6(2),l.Q6J("ngSwitchCase","week"),l.xp6(2),l.Q6J("ngSwitchCase","day"))},directives:[s.$,a.RF,a.n9,d.G,D.T,h.S],encapsulation:2,changeDetection:0});var _=i(53976),U=function n(){e(this,n)};U.\u0275fac=function(e){return new(e||U)},U.\u0275mod=l.oAB({type:U}),U.\u0275inj=l.cJS({imports:[[a.ez,w._8.forRoot({provide:c._,useFactory:_.x}),u.S,v.Bz.forChild([{path:"",component:C}])]]})}}])}();