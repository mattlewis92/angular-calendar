"use strict";(self.webpackChunkdemos=self.webpackChunkdemos||[]).push([[2001],{43303:(T,w,a)=>{a.d(w,{$:()=>d});var e=a(44879),u=a(2316),C=a(50111),m=a(58125),r=a(68849),_=a(4540);class d{constructor(){this.locale="en",this.viewChange=new e.vpe,this.viewDateChange=new e.vpe,this.CalendarView=u.w}}d.\u0275fac=function(s){return new(s||d)},d.\u0275cmp=e.Xpm({type:d,selectors:[["mwl-demo-utils-calendar-header"]],inputs:{view:"view",viewDate:"viewDate",locale:"locale"},outputs:{viewChange:"viewChange",viewDateChange:"viewDateChange"},decls:43,vars:16,consts:[[1,"row","text-center"],[1,"col-md-4"],[1,"btn-group"],["mwlCalendarPreviousView","",1,"btn","btn-primary",3,"view","viewDate","viewDateChange"],["mwlCalendarToday","",1,"btn","btn-outline-secondary",3,"viewDate","viewDateChange"],["mwlCalendarNextView","",1,"btn","btn-primary",3,"view","viewDate","viewDateChange"],[1,"btn","btn-primary",3,"click"]],template:function(s,t){1&s&&(e._uU(0,"\n    "),e.TgZ(1,"div",0),e._uU(2,"\n      "),e.TgZ(3,"div",1),e._uU(4,"\n        "),e.TgZ(5,"div",2),e._uU(6,"\n          "),e.TgZ(7,"div",3),e.NdJ("viewDateChange",function(n){return t.viewDate=n})("viewDateChange",function(){return t.viewDateChange.next(t.viewDate)}),e._uU(8,"\n            Previous\n          "),e.qZA(),e._uU(9,"\n          "),e.TgZ(10,"div",4),e.NdJ("viewDateChange",function(n){return t.viewDate=n})("viewDateChange",function(){return t.viewDateChange.next(t.viewDate)}),e._uU(11,"\n            Today\n          "),e.qZA(),e._uU(12,"\n          "),e.TgZ(13,"div",5),e.NdJ("viewDateChange",function(n){return t.viewDate=n})("viewDateChange",function(){return t.viewDateChange.next(t.viewDate)}),e._uU(14,"\n            Next\n          "),e.qZA(),e._uU(15,"\n        "),e.qZA(),e._uU(16,"\n      "),e.qZA(),e._uU(17,"\n      "),e.TgZ(18,"div",1),e._uU(19,"\n        "),e.TgZ(20,"h3"),e._uU(21),e.ALo(22,"calendarDate"),e.qZA(),e._uU(23,"\n      "),e.qZA(),e._uU(24,"\n      "),e.TgZ(25,"div",1),e._uU(26,"\n        "),e.TgZ(27,"div",2),e._uU(28,"\n          "),e.TgZ(29,"div",6),e.NdJ("click",function(){return t.viewChange.emit(t.CalendarView.Month)}),e._uU(30,"\n            Month\n          "),e.qZA(),e._uU(31,"\n          "),e.TgZ(32,"div",6),e.NdJ("click",function(){return t.viewChange.emit(t.CalendarView.Week)}),e._uU(33,"\n            Week\n          "),e.qZA(),e._uU(34,"\n          "),e.TgZ(35,"div",6),e.NdJ("click",function(){return t.viewChange.emit(t.CalendarView.Day)}),e._uU(36,"\n            Day\n          "),e.qZA(),e._uU(37,"\n        "),e.qZA(),e._uU(38,"\n      "),e.qZA(),e._uU(39,"\n    "),e.qZA(),e._uU(40,"\n    "),e._UZ(41,"br"),e._uU(42,"\n  ")),2&s&&(e.xp6(7),e.Q6J("view",t.view)("viewDate",t.viewDate),e.xp6(3),e.Q6J("viewDate",t.viewDate),e.xp6(3),e.Q6J("view",t.view)("viewDate",t.viewDate),e.xp6(8),e.Oqu(e.Dn7(22,12,t.viewDate,t.view+"ViewTitle",t.locale)),e.xp6(8),e.ekj("active",t.view===t.CalendarView.Month),e.xp6(3),e.ekj("active",t.view===t.CalendarView.Week),e.xp6(3),e.ekj("active",t.view===t.CalendarView.Day))},dependencies:[C.O,m.T,r.i,_.J],encapsulation:2})},44248:(T,w,a)=>{a.d(w,{S:()=>r});var e=a(50192),u=a(86963),C=a(5234),m=a(44879);class r{}r.\u0275fac=function(d){return new(d||r)},r.\u0275mod=m.oAB({type:r}),r.\u0275inj=m.cJS({imports:[e.ez,u.u5,C._8]})},92001:(T,w,a)=>{a.r(w),a.d(w,{DemoModule:()=>c});var e=a(50192),u=a(98783),C=a(5234),m=a(33275),r=a(44248),_=a(2316),d=a(38962),g=a(72810),s=a(13638);var v=a(54876),n=a(44879),U=a(79144),f=a(84156),Z=a(56500),A=a(43303);const y=["scrollContainer"];function M(l,i){if(1&l&&(n.TgZ(0,"mwl-calendar-month-view",4),n._uU(1,"\n  "),n.qZA()),2&l){const o=n.oxw();n.Q6J("viewDate",o.viewDate)("events",o.events)}}function E(l,i){if(1&l&&(n.TgZ(0,"mwl-calendar-week-view",4),n._uU(1,"\n  "),n.qZA()),2&l){const o=n.oxw();n.Q6J("viewDate",o.viewDate)("events",o.events)}}function O(l,i){if(1&l&&(n.TgZ(0,"mwl-calendar-day-view",4),n._uU(1,"\n  "),n.qZA()),2&l){const o=n.oxw();n.Q6J("viewDate",o.viewDate)("events",o.events)}}class D{constructor(i){this.cdr=i,this.view=_.w.Week,this.viewDate=new Date,this.events=[]}ngAfterViewInit(){this.scrollToCurrentView()}viewChanged(){this.cdr.detectChanges(),this.scrollToCurrentView()}scrollToCurrentView(){if(this.view===_.w.Week||_.w.Day){const i=(0,d.Z)(function t(l){(0,s.Z)(1,arguments);var i=(0,g.Z)(l);return i.setMinutes(0,0,0),i}(new Date),(0,v.Z)(new Date)),o=this.view===_.w.Week?60:0;this.scrollContainer.nativeElement.scrollTop=i+o}}}D.\u0275fac=function(i){return new(i||D)(n.Y36(n.sBO))},D.\u0275cmp=n.Xpm({type:D,selectors:[["mwl-demo-component"]],viewQuery:function(i,o){if(1&i&&n.Gf(y,5),2&i){let h;n.iGM(h=n.CRH())&&(o.scrollContainer=h.first)}},decls:13,vars:6,consts:[[3,"view","viewDate","viewChange","viewDateChange"],[1,"scroll-container",3,"ngSwitch"],["scrollContainer",""],[3,"viewDate","events",4,"ngSwitchCase"],[3,"viewDate","events"]],template:function(i,o){1&i&&(n.TgZ(0,"mwl-demo-utils-calendar-header",0),n.NdJ("viewChange",function(p){return o.view=p})("viewDateChange",function(p){return o.viewDate=p})("viewChange",function(){return o.viewChanged()}),n._uU(1,"\n"),n.qZA(),n._uU(2,"\n\n"),n.TgZ(3,"div",1,2),n._uU(5,"\n  "),n.YNc(6,M,2,2,"mwl-calendar-month-view",3),n._uU(7,"\n  "),n.YNc(8,E,2,2,"mwl-calendar-week-view",3),n._uU(9,"\n  "),n.YNc(10,O,2,2,"mwl-calendar-day-view",3),n._uU(11,"\n"),n.qZA(),n._uU(12,"\n")),2&i&&(n.Q6J("view",o.view)("viewDate",o.viewDate),n.xp6(3),n.Q6J("ngSwitch",o.view),n.xp6(3),n.Q6J("ngSwitchCase","month"),n.xp6(2),n.Q6J("ngSwitchCase","week"),n.xp6(2),n.Q6J("ngSwitchCase","day"))},dependencies:[e.RF,e.n9,U.G,f.T,Z.S,A.$],styles:[".scroll-container[_ngcontent-%COMP%]{height:calc(100vh - 320px);overflow-y:auto}"],changeDetection:0});var P=a(20211);class c{}c.\u0275fac=function(i){return new(i||c)},c.\u0275mod=n.oAB({type:c}),c.\u0275inj=n.cJS({imports:[e.ez,C._8.forRoot({provide:m._,useFactory:P.x}),r.S,u.Bz.forChild([{path:"",component:D}])]})}}]);