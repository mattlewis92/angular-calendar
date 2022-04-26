"use strict";(self.webpackChunkangular_calendar=self.webpackChunkangular_calendar||[]).push([[7556],{78767:function(e,n,t){t.d(n,{$:function(){return o}});var i=t(37716),a=t(4606),w=t(31726),r=t(22167),v=t(60897),c=t(12153);class o{constructor(){this.locale="en",this.viewChange=new i.vpe,this.viewDateChange=new i.vpe,this.CalendarView=a.w}}o.\u0275fac=function(e){return new(e||o)},o.\u0275cmp=i.Xpm({type:o,selectors:[["mwl-demo-utils-calendar-header"]],inputs:{view:"view",viewDate:"viewDate",locale:"locale"},outputs:{viewChange:"viewChange",viewDateChange:"viewDateChange"},decls:43,vars:16,consts:[[1,"row","text-center"],[1,"col-md-4"],[1,"btn-group"],["mwlCalendarPreviousView","",1,"btn","btn-primary",3,"view","viewDate","viewDateChange"],["mwlCalendarToday","",1,"btn","btn-outline-secondary",3,"viewDate","viewDateChange"],["mwlCalendarNextView","",1,"btn","btn-primary",3,"view","viewDate","viewDateChange"],[1,"btn","btn-primary",3,"click"]],template:function(e,n){1&e&&(i._uU(0,"\n    "),i.TgZ(1,"div",0),i._uU(2,"\n      "),i.TgZ(3,"div",1),i._uU(4,"\n        "),i.TgZ(5,"div",2),i._uU(6,"\n          "),i.TgZ(7,"div",3),i.NdJ("viewDateChange",function(e){return n.viewDate=e})("viewDateChange",function(){return n.viewDateChange.next(n.viewDate)}),i._uU(8,"\n            Previous\n          "),i.qZA(),i._uU(9,"\n          "),i.TgZ(10,"div",4),i.NdJ("viewDateChange",function(e){return n.viewDate=e})("viewDateChange",function(){return n.viewDateChange.next(n.viewDate)}),i._uU(11,"\n            Today\n          "),i.qZA(),i._uU(12,"\n          "),i.TgZ(13,"div",5),i.NdJ("viewDateChange",function(e){return n.viewDate=e})("viewDateChange",function(){return n.viewDateChange.next(n.viewDate)}),i._uU(14,"\n            Next\n          "),i.qZA(),i._uU(15,"\n        "),i.qZA(),i._uU(16,"\n      "),i.qZA(),i._uU(17,"\n      "),i.TgZ(18,"div",1),i._uU(19,"\n        "),i.TgZ(20,"h3"),i._uU(21),i.ALo(22,"calendarDate"),i.qZA(),i._uU(23,"\n      "),i.qZA(),i._uU(24,"\n      "),i.TgZ(25,"div",1),i._uU(26,"\n        "),i.TgZ(27,"div",2),i._uU(28,"\n          "),i.TgZ(29,"div",6),i.NdJ("click",function(){return n.viewChange.emit(n.CalendarView.Month)}),i._uU(30,"\n            Month\n          "),i.qZA(),i._uU(31,"\n          "),i.TgZ(32,"div",6),i.NdJ("click",function(){return n.viewChange.emit(n.CalendarView.Week)}),i._uU(33,"\n            Week\n          "),i.qZA(),i._uU(34,"\n          "),i.TgZ(35,"div",6),i.NdJ("click",function(){return n.viewChange.emit(n.CalendarView.Day)}),i._uU(36,"\n            Day\n          "),i.qZA(),i._uU(37,"\n        "),i.qZA(),i._uU(38,"\n      "),i.qZA(),i._uU(39,"\n    "),i.qZA(),i._uU(40,"\n    "),i._UZ(41,"br"),i._uU(42,"\n  ")),2&e&&(i.xp6(7),i.Q6J("view",n.view)("viewDate",n.viewDate),i.xp6(3),i.Q6J("viewDate",n.viewDate),i.xp6(3),i.Q6J("view",n.view)("viewDate",n.viewDate),i.xp6(8),i.Oqu(i.Dn7(22,12,n.viewDate,n.view+"ViewTitle",n.locale)),i.xp6(8),i.ekj("active",n.view===n.CalendarView.Month),i.xp6(3),i.ekj("active",n.view===n.CalendarView.Week),i.xp6(3),i.ekj("active",n.view===n.CalendarView.Day))},directives:[w.O,r.i,v.T],pipes:[c.J],encapsulation:2})},57671:function(e,n,t){t.d(n,{S:function(){return v}});var i=t(38583),a=t(93092),w=t(95008),r=t(37716);class v{}v.\u0275fac=function(e){return new(e||v)},v.\u0275mod=r.oAB({type:v}),v.\u0275inj=r.cJS({imports:[[i.ez,a.u5,w._8]]})},67556:function(e,n,t){t.r(n),t.d(n,{DemoModule:function(){return U}});var i=t(38583),a=t(89328),w=t(95008),r=t(90008),v=t(57671),c=t(4606),o=t(55155),u=t(37716),d=t(78767),s=t(9072),l=t(59687),h=t(50811);function D(e,n){if(1&e&&(u.TgZ(0,"div",5),u._uU(1),u.qZA()),2&e){const e=u.oxw();u.xp6(1),u.hij("\n  There are no events on this ",e.view,"\n")}}function g(e,n){if(1&e){const e=u.EpF();u.TgZ(0,"mwl-calendar-month-view",6),u.NdJ("beforeViewRender",function(n){return u.CHM(e),u.oxw().beforeViewRender(n)}),u._uU(1,"\n  "),u.qZA()}if(2&e){const e=u.oxw();u.Q6J("viewDate",e.viewDate)("events",e.events)("activeDayIsOpen",!0)}}function f(e,n){if(1&e){const e=u.EpF();u.TgZ(0,"mwl-calendar-week-view",7),u.NdJ("beforeViewRender",function(n){return u.CHM(e),u.oxw().beforeViewRender(n)}),u._uU(1,"\n  "),u.qZA()}if(2&e){const e=u.oxw();u.Q6J("viewDate",e.viewDate)("events",e.events)}}function p(e,n){if(1&e){const e=u.EpF();u.TgZ(0,"mwl-calendar-day-view",7),u.NdJ("beforeViewRender",function(n){return u.CHM(e),u.oxw().beforeViewRender(n)}),u._uU(1,"\n  "),u.qZA()}if(2&e){const e=u.oxw();u.Q6J("viewDate",e.viewDate)("events",e.events)}}class C{constructor(e){this.cdr=e,this.view=c.w.Month,this.viewDate=new Date,this.events=[{title:"Event 1",color:o.O.yellow,start:new Date}]}beforeViewRender(e){this.period=e.period,this.cdr.detectChanges()}}C.\u0275fac=function(e){return new(e||C)(u.Y36(u.sBO))},C.\u0275cmp=u.Xpm({type:C,selectors:[["mwl-demo-component"]],decls:14,vars:7,consts:[[3,"view","viewDate","viewChange","viewDateChange"],["class","alert alert-warning",4,"ngIf"],[3,"ngSwitch"],[3,"viewDate","events","activeDayIsOpen","beforeViewRender",4,"ngSwitchCase"],[3,"viewDate","events","beforeViewRender",4,"ngSwitchCase"],[1,"alert","alert-warning"],[3,"viewDate","events","activeDayIsOpen","beforeViewRender"],[3,"viewDate","events","beforeViewRender"]],template:function(e,n){1&e&&(u.TgZ(0,"mwl-demo-utils-calendar-header",0),u.NdJ("viewChange",function(e){return n.view=e})("viewDateChange",function(e){return n.viewDate=e}),u._uU(1,"\n"),u.qZA(),u._uU(2,"\n\n"),u.YNc(3,D,2,1,"div",1),u._uU(4,"\n\n"),u.TgZ(5,"div",2),u._uU(6,"\n  "),u.YNc(7,g,2,3,"mwl-calendar-month-view",3),u._uU(8,"\n  "),u.YNc(9,f,2,2,"mwl-calendar-week-view",4),u._uU(10,"\n  "),u.YNc(11,p,2,2,"mwl-calendar-day-view",4),u._uU(12,"\n"),u.qZA(),u._uU(13,"\n")),2&e&&(u.Q6J("view",n.view)("viewDate",n.viewDate),u.xp6(3),u.Q6J("ngIf",0===(null==n.period?null:n.period.events.length)),u.xp6(2),u.Q6J("ngSwitch",n.view),u.xp6(2),u.Q6J("ngSwitchCase","month"),u.xp6(2),u.Q6J("ngSwitchCase","week"),u.xp6(2),u.Q6J("ngSwitchCase","day"))},directives:[d.$,i.O5,i.RF,i.n9,s.G,l.T,h.S],encapsulation:2,changeDetection:0});var _=t(53976);class U{}U.\u0275fac=function(e){return new(e||U)},U.\u0275mod=u.oAB({type:U}),U.\u0275inj=u.cJS({imports:[[i.ez,w._8.forRoot({provide:r._,useFactory:_.x}),v.S,a.Bz.forChild([{path:"",component:C}])]]})}}]);