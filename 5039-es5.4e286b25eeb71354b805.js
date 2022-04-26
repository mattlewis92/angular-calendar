!function(){"use strict";function e(e,n){for(var t=0;t<n.length;t++){var i=n[t];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function n(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}(self.webpackChunkangular_calendar=self.webpackChunkangular_calendar||[]).push([[5039],{78767:function(e,t,i){i.d(t,{$:function(){return o}});var a=i(37716),r=i(4606),w=i(31726),v=i(22167),u=i(60897),c=i(12153),o=function e(){n(this,e),this.locale="en",this.viewChange=new a.vpe,this.viewDateChange=new a.vpe,this.CalendarView=r.w};o.\u0275fac=function(e){return new(e||o)},o.\u0275cmp=a.Xpm({type:o,selectors:[["mwl-demo-utils-calendar-header"]],inputs:{view:"view",viewDate:"viewDate",locale:"locale"},outputs:{viewChange:"viewChange",viewDateChange:"viewDateChange"},decls:43,vars:16,consts:[[1,"row","text-center"],[1,"col-md-4"],[1,"btn-group"],["mwlCalendarPreviousView","",1,"btn","btn-primary",3,"view","viewDate","viewDateChange"],["mwlCalendarToday","",1,"btn","btn-outline-secondary",3,"viewDate","viewDateChange"],["mwlCalendarNextView","",1,"btn","btn-primary",3,"view","viewDate","viewDateChange"],[1,"btn","btn-primary",3,"click"]],template:function(e,n){1&e&&(a._uU(0,"\n    "),a.TgZ(1,"div",0),a._uU(2,"\n      "),a.TgZ(3,"div",1),a._uU(4,"\n        "),a.TgZ(5,"div",2),a._uU(6,"\n          "),a.TgZ(7,"div",3),a.NdJ("viewDateChange",function(e){return n.viewDate=e})("viewDateChange",function(){return n.viewDateChange.next(n.viewDate)}),a._uU(8,"\n            Previous\n          "),a.qZA(),a._uU(9,"\n          "),a.TgZ(10,"div",4),a.NdJ("viewDateChange",function(e){return n.viewDate=e})("viewDateChange",function(){return n.viewDateChange.next(n.viewDate)}),a._uU(11,"\n            Today\n          "),a.qZA(),a._uU(12,"\n          "),a.TgZ(13,"div",5),a.NdJ("viewDateChange",function(e){return n.viewDate=e})("viewDateChange",function(){return n.viewDateChange.next(n.viewDate)}),a._uU(14,"\n            Next\n          "),a.qZA(),a._uU(15,"\n        "),a.qZA(),a._uU(16,"\n      "),a.qZA(),a._uU(17,"\n      "),a.TgZ(18,"div",1),a._uU(19,"\n        "),a.TgZ(20,"h3"),a._uU(21),a.ALo(22,"calendarDate"),a.qZA(),a._uU(23,"\n      "),a.qZA(),a._uU(24,"\n      "),a.TgZ(25,"div",1),a._uU(26,"\n        "),a.TgZ(27,"div",2),a._uU(28,"\n          "),a.TgZ(29,"div",6),a.NdJ("click",function(){return n.viewChange.emit(n.CalendarView.Month)}),a._uU(30,"\n            Month\n          "),a.qZA(),a._uU(31,"\n          "),a.TgZ(32,"div",6),a.NdJ("click",function(){return n.viewChange.emit(n.CalendarView.Week)}),a._uU(33,"\n            Week\n          "),a.qZA(),a._uU(34,"\n          "),a.TgZ(35,"div",6),a.NdJ("click",function(){return n.viewChange.emit(n.CalendarView.Day)}),a._uU(36,"\n            Day\n          "),a.qZA(),a._uU(37,"\n        "),a.qZA(),a._uU(38,"\n      "),a.qZA(),a._uU(39,"\n    "),a.qZA(),a._uU(40,"\n    "),a._UZ(41,"br"),a._uU(42,"\n  ")),2&e&&(a.xp6(7),a.Q6J("view",n.view)("viewDate",n.viewDate),a.xp6(3),a.Q6J("viewDate",n.viewDate),a.xp6(3),a.Q6J("view",n.view)("viewDate",n.viewDate),a.xp6(8),a.Oqu(a.Dn7(22,12,n.viewDate,n.view+"ViewTitle",n.locale)),a.xp6(8),a.ekj("active",n.view===n.CalendarView.Month),a.xp6(3),a.ekj("active",n.view===n.CalendarView.Week),a.xp6(3),a.ekj("active",n.view===n.CalendarView.Day))},directives:[w.O,v.i,u.T],pipes:[c.J],encapsulation:2})},57671:function(e,t,i){i.d(t,{S:function(){return u}});var a=i(38583),r=i(93092),w=i(95008),v=i(37716),u=function e(){n(this,e)};u.\u0275fac=function(e){return new(e||u)},u.\u0275mod=v.oAB({type:u}),u.\u0275inj=v.cJS({imports:[[a.ez,r.u5,w._8]]})},35039:function(t,i,a){a.r(i),a.d(i,{DemoModule:function(){return k}});var r=a(38583),w=a(89328),v=a(95008),u=a(90008),c=a(57671),o=a(4606),l=a(6024),s=a(94513),h=a(43463),d=a(43257),f=a(37716),g=a(78767),D=a(9072),C=a(59687),p=a(50811),_=["scrollContainer"];function m(e,n){if(1&e&&(f.TgZ(0,"mwl-calendar-month-view",4),f._uU(1,"\n  "),f.qZA()),2&e){var t=f.oxw();f.Q6J("viewDate",t.viewDate)("events",t.events)}}function Z(e,n){if(1&e&&(f.TgZ(0,"mwl-calendar-week-view",4),f._uU(1,"\n  "),f.qZA()),2&e){var t=f.oxw();f.Q6J("viewDate",t.viewDate)("events",t.events)}}function U(e,n){if(1&e&&(f.TgZ(0,"mwl-calendar-day-view",4),f._uU(1,"\n  "),f.qZA()),2&e){var t=f.oxw();f.Q6J("viewDate",t.viewDate)("events",t.events)}}var y=function(){function t(e){n(this,t),this.cdr=e,this.view=o.w.Week,this.viewDate=new Date,this.events=[]}var i,a,r;return i=t,(a=[{key:"ngAfterViewInit",value:function(){this.scrollToCurrentView()}},{key:"viewChanged",value:function(){this.cdr.detectChanges(),this.scrollToCurrentView()}},{key:"scrollToCurrentView",value:function(){if(this.view===o.w.Week||o.w.Day){var e=(0,l.Z)(function(e){(0,h.Z)(1,arguments);var n=(0,s.Z)(e);return n.setMinutes(0,0,0),n}(new Date),(0,d.Z)(new Date)),n=this.view===o.w.Week?60:0;this.scrollContainer.nativeElement.scrollTop=e+n}}}])&&e(i.prototype,a),r&&e(i,r),t}();y.\u0275fac=function(e){return new(e||y)(f.Y36(f.sBO))},y.\u0275cmp=f.Xpm({type:y,selectors:[["mwl-demo-component"]],viewQuery:function(e,n){var t;(1&e&&f.Gf(_,5),2&e)&&(f.iGM(t=f.CRH())&&(n.scrollContainer=t.first))},decls:13,vars:6,consts:[[3,"view","viewDate","viewChange","viewDateChange"],[1,"scroll-container",3,"ngSwitch"],["scrollContainer",""],[3,"viewDate","events",4,"ngSwitchCase"],[3,"viewDate","events"]],template:function(e,n){1&e&&(f.TgZ(0,"mwl-demo-utils-calendar-header",0),f.NdJ("viewChange",function(e){return n.view=e})("viewDateChange",function(e){return n.viewDate=e})("viewChange",function(){return n.viewChanged()}),f._uU(1,"\n"),f.qZA(),f._uU(2,"\n\n"),f.TgZ(3,"div",1,2),f._uU(5,"\n  "),f.YNc(6,m,2,2,"mwl-calendar-month-view",3),f._uU(7,"\n  "),f.YNc(8,Z,2,2,"mwl-calendar-week-view",3),f._uU(9,"\n  "),f.YNc(10,U,2,2,"mwl-calendar-day-view",3),f._uU(11,"\n"),f.qZA(),f._uU(12,"\n")),2&e&&(f.Q6J("view",n.view)("viewDate",n.viewDate),f.xp6(3),f.Q6J("ngSwitch",n.view),f.xp6(3),f.Q6J("ngSwitchCase","month"),f.xp6(2),f.Q6J("ngSwitchCase","week"),f.xp6(2),f.Q6J("ngSwitchCase","day"))},directives:[g.$,r.RF,r.n9,D.G,C.T,p.S],styles:[".scroll-container[_ngcontent-%COMP%]{height:calc(100vh - 320px);overflow-y:auto}"],changeDetection:0});var T=a(53976),k=function e(){n(this,e)};k.\u0275fac=function(e){return new(e||k)},k.\u0275mod=f.oAB({type:k}),k.\u0275inj=f.cJS({imports:[[r.ez,v._8.forRoot({provide:u._,useFactory:T.x}),c.S,w.Bz.forChild([{path:"",component:y}])]]})}}])}();