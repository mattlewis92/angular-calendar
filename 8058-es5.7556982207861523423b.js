!function(){"use strict";function e(e){return function(e){if(Array.isArray(e))return n(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return n(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);"Object"===a&&e.constructor&&(a=e.constructor.name);if("Map"===a||"Set"===a)return Array.from(e);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return n(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function n(e,n){(null==n||n>e.length)&&(n=e.length);for(var t=0,a=new Array(n);t<n;t++)a[t]=e[t];return a}function t(e,n){for(var t=0;t<n.length;t++){var a=n[t];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function a(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}(self.webpackChunkangular_calendar=self.webpackChunkangular_calendar||[]).push([[8058],{78767:function(e,n,t){t.d(n,{$:function(){return s}});var i=t(37716),r=t(4606),v=t(31726),o=t(22167),u=t(60897),c=t(12153),s=function e(){a(this,e),this.locale="en",this.viewChange=new i.vpe,this.viewDateChange=new i.vpe,this.CalendarView=r.w};s.\u0275fac=function(e){return new(e||s)},s.\u0275cmp=i.Xpm({type:s,selectors:[["mwl-demo-utils-calendar-header"]],inputs:{view:"view",viewDate:"viewDate",locale:"locale"},outputs:{viewChange:"viewChange",viewDateChange:"viewDateChange"},decls:43,vars:16,consts:[[1,"row","text-center"],[1,"col-md-4"],[1,"btn-group"],["mwlCalendarPreviousView","",1,"btn","btn-primary",3,"view","viewDate","viewDateChange"],["mwlCalendarToday","",1,"btn","btn-outline-secondary",3,"viewDate","viewDateChange"],["mwlCalendarNextView","",1,"btn","btn-primary",3,"view","viewDate","viewDateChange"],[1,"btn","btn-primary",3,"click"]],template:function(e,n){1&e&&(i._uU(0,"\n    "),i.TgZ(1,"div",0),i._uU(2,"\n      "),i.TgZ(3,"div",1),i._uU(4,"\n        "),i.TgZ(5,"div",2),i._uU(6,"\n          "),i.TgZ(7,"div",3),i.NdJ("viewDateChange",function(e){return n.viewDate=e})("viewDateChange",function(){return n.viewDateChange.next(n.viewDate)}),i._uU(8,"\n            Previous\n          "),i.qZA(),i._uU(9,"\n          "),i.TgZ(10,"div",4),i.NdJ("viewDateChange",function(e){return n.viewDate=e})("viewDateChange",function(){return n.viewDateChange.next(n.viewDate)}),i._uU(11,"\n            Today\n          "),i.qZA(),i._uU(12,"\n          "),i.TgZ(13,"div",5),i.NdJ("viewDateChange",function(e){return n.viewDate=e})("viewDateChange",function(){return n.viewDateChange.next(n.viewDate)}),i._uU(14,"\n            Next\n          "),i.qZA(),i._uU(15,"\n        "),i.qZA(),i._uU(16,"\n      "),i.qZA(),i._uU(17,"\n      "),i.TgZ(18,"div",1),i._uU(19,"\n        "),i.TgZ(20,"h3"),i._uU(21),i.ALo(22,"calendarDate"),i.qZA(),i._uU(23,"\n      "),i.qZA(),i._uU(24,"\n      "),i.TgZ(25,"div",1),i._uU(26,"\n        "),i.TgZ(27,"div",2),i._uU(28,"\n          "),i.TgZ(29,"div",6),i.NdJ("click",function(){return n.viewChange.emit(n.CalendarView.Month)}),i._uU(30,"\n            Month\n          "),i.qZA(),i._uU(31,"\n          "),i.TgZ(32,"div",6),i.NdJ("click",function(){return n.viewChange.emit(n.CalendarView.Week)}),i._uU(33,"\n            Week\n          "),i.qZA(),i._uU(34,"\n          "),i.TgZ(35,"div",6),i.NdJ("click",function(){return n.viewChange.emit(n.CalendarView.Day)}),i._uU(36,"\n            Day\n          "),i.qZA(),i._uU(37,"\n        "),i.qZA(),i._uU(38,"\n      "),i.qZA(),i._uU(39,"\n    "),i.qZA(),i._uU(40,"\n    "),i._UZ(41,"br"),i._uU(42,"\n  ")),2&e&&(i.xp6(7),i.Q6J("view",n.view)("viewDate",n.viewDate),i.xp6(3),i.Q6J("viewDate",n.viewDate),i.xp6(3),i.Q6J("view",n.view)("viewDate",n.viewDate),i.xp6(8),i.Oqu(i.Dn7(22,12,n.viewDate,n.view+"ViewTitle",n.locale)),i.xp6(8),i.ekj("active",n.view===n.CalendarView.Month),i.xp6(3),i.ekj("active",n.view===n.CalendarView.Week),i.xp6(3),i.ekj("active",n.view===n.CalendarView.Day))},directives:[v.O,o.i,u.T],pipes:[c.J],encapsulation:2})},57671:function(e,n,t){t.d(n,{S:function(){return u}});var i=t(38583),r=t(93092),v=t(95008),o=t(37716),u=function e(){a(this,e)};u.\u0275fac=function(e){return new(e||u)},u.\u0275mod=o.oAB({type:u}),u.\u0275inj=o.cJS({imports:[[i.ez,r.u5,v._8]]})},68058:function(n,i,r){r.r(i),r.d(i,{DemoModule:function(){return q}});var v=r(38583),o=r(89328),u=r(95008),c=r(90008),s=r(24453),w=r(57671),l=r(4606),d=r(76889),g=r(55155),h=r(37716),f=r(78767),p=r(9072),D=r(59687),m=r(50811);function C(e,n){1&e&&(h.TgZ(0,"p"),h.TgZ(1,"em"),h._uU(2,"No events added"),h.qZA(),h.qZA())}var _=function(e){return{event:e}},U=function(){return{delay:300,delta:30}};function Z(e,n){if(1&e&&(h.TgZ(0,"li",11),h._uU(1,"\n            "),h.TgZ(2,"a",12),h._uU(3),h.qZA(),h._uU(4,"\n          "),h.qZA()),2&e){var t=n.$implicit;h.Q6J("dropData",h.VKq(5,_,t))("touchStartLongPress",h.DdM(7,U)),h.xp6(2),h.Udp("color",t.color.primary),h.xp6(1),h.hij("\n              ",t.title,"\n            ")}}function y(e,n){if(1&e){var t=h.EpF();h.TgZ(0,"mwl-calendar-month-view",13),h.NdJ("eventTimesChanged",function(e){return h.CHM(t),h.oxw().eventDropped(e)}),h._uU(1,"\n      "),h.qZA()}if(2&e){var a=h.oxw();h.Q6J("viewDate",a.viewDate)("events",a.events)("activeDayIsOpen",a.activeDayIsOpen)("refresh",a.refresh)}}function x(e,n){if(1&e){var t=h.EpF();h.TgZ(0,"mwl-calendar-week-view",14),h.NdJ("eventTimesChanged",function(e){return h.CHM(t),h.oxw().eventDropped(e)}),h._uU(1,"\n      "),h.qZA()}if(2&e){var a=h.oxw();h.Q6J("viewDate",a.viewDate)("events",a.events)("refresh",a.refresh)("snapDraggedEvents",!1)}}function T(e,n){if(1&e){var t=h.EpF();h.TgZ(0,"mwl-calendar-day-view",14),h.NdJ("eventTimesChanged",function(e){return h.CHM(t),h.oxw().eventDropped(e)}),h._uU(1,"\n      "),h.qZA()}if(2&e){var a=h.oxw();h.Q6J("viewDate",a.viewDate)("events",a.events)("refresh",a.refresh)("snapDraggedEvents",!1)}}var A=function(){function n(){a(this,n),this.CalendarView=l.w,this.view=l.w.Month,this.viewDate=new Date,this.externalEvents=[{title:"Event 1",color:g.O.yellow,start:new Date,draggable:!0},{title:"Event 2",color:g.O.blue,start:new Date,draggable:!0}],this.events=[],this.activeDayIsOpen=!1,this.refresh=new d.x}var i,r,v;return i=n,(r=[{key:"eventDropped",value:function(n){var t=n.event,a=n.newStart,i=n.newEnd,r=n.allDay,v=this.externalEvents.indexOf(t);void 0!==r&&(t.allDay=r),v>-1&&(this.externalEvents.splice(v,1),this.events.push(t)),t.start=a,i&&(t.end=i),"month"===this.view&&(this.viewDate=a,this.activeDayIsOpen=!0),this.events=e(this.events)}},{key:"externalDrop",value:function(e){-1===this.externalEvents.indexOf(e)&&(this.events=this.events.filter(function(n){return n!==e}),this.externalEvents.push(e))}}])&&t(i.prototype,r),v&&t(i,v),n}();A.\u0275fac=function(e){return new(e||A)},A.\u0275cmp=h.Xpm({type:A,selectors:[["mwl-demo-component"]],decls:34,vars:8,consts:[[1,"row"],[1,"col-md-3"],["mwlDroppable","","dragOverClass","drag-over",1,"card",3,"drop"],[1,"card-body"],[4,"ngIf"],["mwlDraggable","","dragActiveClass","drag-active",3,"dropData","touchStartLongPress",4,"ngFor","ngForOf"],[1,"col-md-9"],[3,"view","viewDate","viewChange","viewDateChange"],[3,"ngSwitch"],[3,"viewDate","events","activeDayIsOpen","refresh","eventTimesChanged",4,"ngSwitchCase"],[3,"viewDate","events","refresh","snapDraggedEvents","eventTimesChanged",4,"ngSwitchCase"],["mwlDraggable","","dragActiveClass","drag-active",3,"dropData","touchStartLongPress"],["href","javascript:;"],[3,"viewDate","events","activeDayIsOpen","refresh","eventTimesChanged"],[3,"viewDate","events","refresh","snapDraggedEvents","eventTimesChanged"]],template:function(e,n){1&e&&(h.TgZ(0,"div",0),h._uU(1,"\n  "),h.TgZ(2,"div",1),h._uU(3,"\n    "),h.TgZ(4,"div",2),h.NdJ("drop",function(e){return n.externalDrop(e.dropData.event)}),h._uU(5,"\n      "),h.TgZ(6,"div",3),h._uU(7,"\n        "),h.YNc(8,C,3,0,"p",4),h._uU(9,"\n        "),h.TgZ(10,"ul"),h._uU(11,"\n          "),h.YNc(12,Z,5,8,"li",5),h._uU(13,"\n        "),h.qZA(),h._uU(14,"\n      "),h.qZA(),h._uU(15,"\n    "),h.qZA(),h._uU(16,"\n  "),h.qZA(),h._uU(17,"\n\n  "),h.TgZ(18,"div",6),h._uU(19,"\n    "),h.TgZ(20,"mwl-demo-utils-calendar-header",7),h.NdJ("viewChange",function(e){return n.view=e})("viewDateChange",function(e){return n.viewDate=e}),h._uU(21,"\n    "),h.qZA(),h._uU(22,"\n\n    "),h.TgZ(23,"div",8),h._uU(24,"\n      "),h.YNc(25,y,2,4,"mwl-calendar-month-view",9),h._uU(26,"\n      "),h.YNc(27,x,2,4,"mwl-calendar-week-view",10),h._uU(28,"\n      "),h.YNc(29,T,2,4,"mwl-calendar-day-view",10),h._uU(30,"\n    "),h.qZA(),h._uU(31,"\n  "),h.qZA(),h._uU(32,"\n"),h.qZA(),h._uU(33,"\n")),2&e&&(h.xp6(8),h.Q6J("ngIf",0===n.externalEvents.length),h.xp6(4),h.Q6J("ngForOf",n.externalEvents),h.xp6(8),h.Q6J("view",n.view)("viewDate",n.viewDate),h.xp6(3),h.Q6J("ngSwitch",n.view),h.xp6(2),h.Q6J("ngSwitchCase",n.CalendarView.Month),h.xp6(2),h.Q6J("ngSwitchCase",n.CalendarView.Week),h.xp6(2),h.Q6J("ngSwitchCase",n.CalendarView.Day))},directives:[s.D5,v.O5,v.sg,f.$,v.RF,v.n9,s.pD,p.G,D.T,m.S],styles:[".drag-active[_ngcontent-%COMP%]{position:relative;z-index:1;pointer-events:none}.drag-over[_ngcontent-%COMP%]{background-color:#eee}"],changeDetection:0});var b=r(53976),q=function e(){a(this,e)};q.\u0275fac=function(e){return new(e||q)},q.\u0275mod=h.oAB({type:q}),q.\u0275inj=h.cJS({imports:[[v.ez,u._8.forRoot({provide:c._,useFactory:b.x}),s.Vk,w.S,o.Bz.forChild([{path:"",component:A}])]]})}}])}();