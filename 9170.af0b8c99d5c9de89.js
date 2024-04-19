"use strict";(self.webpackChunkdemos=self.webpackChunkdemos||[]).push([[9170],{43303:(T,v,i)=>{i.d(v,{$:()=>n});var e=i(44879),D=i(2316),h=i(50111),m=i(58125),w=i(68849),g=i(4540);class n{constructor(){this.locale="en",this.viewChange=new e.vpe,this.viewDateChange=new e.vpe,this.CalendarView=D.w}}n.\u0275fac=function(u){return new(u||n)},n.\u0275cmp=e.Xpm({type:n,selectors:[["mwl-demo-utils-calendar-header"]],inputs:{view:"view",viewDate:"viewDate",locale:"locale"},outputs:{viewChange:"viewChange",viewDateChange:"viewDateChange"},decls:43,vars:16,consts:[[1,"row","text-center"],[1,"col-md-4"],[1,"btn-group"],["mwlCalendarPreviousView","",1,"btn","btn-primary",3,"view","viewDate","viewDateChange"],["mwlCalendarToday","",1,"btn","btn-outline-secondary",3,"viewDate","viewDateChange"],["mwlCalendarNextView","",1,"btn","btn-primary",3,"view","viewDate","viewDateChange"],[1,"btn","btn-primary",3,"click"]],template:function(u,a){1&u&&(e._uU(0,"\n    "),e.TgZ(1,"div",0),e._uU(2,"\n      "),e.TgZ(3,"div",1),e._uU(4,"\n        "),e.TgZ(5,"div",2),e._uU(6,"\n          "),e.TgZ(7,"div",3),e.NdJ("viewDateChange",function(c){return a.viewDate=c})("viewDateChange",function(){return a.viewDateChange.next(a.viewDate)}),e._uU(8,"\n            Previous\n          "),e.qZA(),e._uU(9,"\n          "),e.TgZ(10,"div",4),e.NdJ("viewDateChange",function(c){return a.viewDate=c})("viewDateChange",function(){return a.viewDateChange.next(a.viewDate)}),e._uU(11,"\n            Today\n          "),e.qZA(),e._uU(12,"\n          "),e.TgZ(13,"div",5),e.NdJ("viewDateChange",function(c){return a.viewDate=c})("viewDateChange",function(){return a.viewDateChange.next(a.viewDate)}),e._uU(14,"\n            Next\n          "),e.qZA(),e._uU(15,"\n        "),e.qZA(),e._uU(16,"\n      "),e.qZA(),e._uU(17,"\n      "),e.TgZ(18,"div",1),e._uU(19,"\n        "),e.TgZ(20,"h3"),e._uU(21),e.ALo(22,"calendarDate"),e.qZA(),e._uU(23,"\n      "),e.qZA(),e._uU(24,"\n      "),e.TgZ(25,"div",1),e._uU(26,"\n        "),e.TgZ(27,"div",2),e._uU(28,"\n          "),e.TgZ(29,"div",6),e.NdJ("click",function(){return a.viewChange.emit(a.CalendarView.Month)}),e._uU(30,"\n            Month\n          "),e.qZA(),e._uU(31,"\n          "),e.TgZ(32,"div",6),e.NdJ("click",function(){return a.viewChange.emit(a.CalendarView.Week)}),e._uU(33,"\n            Week\n          "),e.qZA(),e._uU(34,"\n          "),e.TgZ(35,"div",6),e.NdJ("click",function(){return a.viewChange.emit(a.CalendarView.Day)}),e._uU(36,"\n            Day\n          "),e.qZA(),e._uU(37,"\n        "),e.qZA(),e._uU(38,"\n      "),e.qZA(),e._uU(39,"\n    "),e.qZA(),e._uU(40,"\n    "),e._UZ(41,"br"),e._uU(42,"\n  ")),2&u&&(e.xp6(7),e.Q6J("view",a.view)("viewDate",a.viewDate),e.xp6(3),e.Q6J("viewDate",a.viewDate),e.xp6(3),e.Q6J("view",a.view)("viewDate",a.viewDate),e.xp6(8),e.Oqu(e.Dn7(22,12,a.viewDate,a.view+"ViewTitle",a.locale)),e.xp6(8),e.ekj("active",a.view===a.CalendarView.Month),e.xp6(3),e.ekj("active",a.view===a.CalendarView.Week),e.xp6(3),e.ekj("active",a.view===a.CalendarView.Day))},dependencies:[h.O,m.T,w.i,g.J],encapsulation:2})},44248:(T,v,i)=>{i.d(v,{S:()=>w});var e=i(50192),D=i(86963),h=i(5234),m=i(44879);class w{}w.\u0275fac=function(n){return new(n||w)},w.\u0275mod=m.oAB({type:w}),w.\u0275inj=m.cJS({imports:[e.ez,D.u5,h._8]})},39170:(T,v,i)=>{i.r(v),i.d(v,{DemoModule:()=>C});var e=i(50192),D=i(98783),h=i(5234),m=i(33275),w=i(44248),g=i(2316),n=i(44879),f=i(79144),u=i(84156),a=i(56500),s=i(43303);function c(_,o){if(1&_){const t=n.EpF();n.TgZ(0,"mwl-calendar-month-view",5),n.NdJ("beforeViewRender",function(l){n.CHM(t);const r=n.oxw();return n.KtG(r.beforeMonthViewRender(l))})("dayClicked",function(l){n.CHM(t);const r=n.oxw();return n.KtG(r.dayClicked(l.day))}),n._uU(1,"\n  "),n.qZA()}if(2&_){const t=n.oxw();n.Q6J("viewDate",t.viewDate)("events",t.events)}}function y(_,o){if(1&_){const t=n.EpF();n.TgZ(0,"mwl-calendar-week-view",6),n.NdJ("beforeViewRender",function(l){n.CHM(t);const r=n.oxw();return n.KtG(r.beforeWeekOrDayViewRender(l))})("hourSegmentClicked",function(l){n.CHM(t);const r=n.oxw();return n.KtG(r.hourSegmentClicked(l.date))}),n._uU(1,"\n  "),n.qZA()}if(2&_){const t=n.oxw();n.Q6J("viewDate",t.viewDate)("events",t.events)}}function U(_,o){if(1&_){const t=n.EpF();n.TgZ(0,"mwl-calendar-day-view",6),n.NdJ("beforeViewRender",function(l){n.CHM(t);const r=n.oxw();return n.KtG(r.beforeWeekOrDayViewRender(l))})("hourSegmentClicked",function(l){n.CHM(t);const r=n.oxw();return n.KtG(r.hourSegmentClicked(l.date))}),n._uU(1,"\n  "),n.qZA()}if(2&_){const t=n.oxw();n.Q6J("viewDate",t.viewDate)("events",t.events)}}class p{constructor(){this.view=g.w.Month,this.viewDate=new Date,this.events=[],this.selectedDays=[]}dayClicked(o){this.selectedMonthViewDay=o;const t=this.selectedMonthViewDay.date.getTime(),d=this.selectedDays.findIndex(l=>l.date.getTime()===t);d>-1?(delete this.selectedMonthViewDay.cssClass,this.selectedDays.splice(d,1)):(this.selectedDays.push(this.selectedMonthViewDay),o.cssClass="cal-day-selected",this.selectedMonthViewDay=o)}beforeMonthViewRender({body:o}){o.forEach(t=>{this.selectedDays.some(d=>d.date.getTime()===t.date.getTime())&&(t.cssClass="cal-day-selected")})}hourSegmentClicked(o){this.selectedDayViewDate=o,this.addSelectedDayViewClass()}beforeWeekOrDayViewRender(o){this.hourColumns=o.hourColumns,this.addSelectedDayViewClass()}addSelectedDayViewClass(){this.hourColumns.forEach(o=>{o.hours.forEach(t=>{t.segments.forEach(d=>{delete d.cssClass,this.selectedDayViewDate&&d.date.getTime()===this.selectedDayViewDate.getTime()&&(d.cssClass="cal-day-selected")})})})}}p.\u0275fac=function(o){return new(o||p)},p.\u0275cmp=n.Xpm({type:p,selectors:[["mwl-demo-component"]],decls:15,vars:6,consts:[[3,"view","viewDate","viewChange","viewDateChange"],[1,"alert","alert-info"],[3,"ngSwitch"],[3,"viewDate","events","beforeViewRender","dayClicked",4,"ngSwitchCase"],[3,"viewDate","events","beforeViewRender","hourSegmentClicked",4,"ngSwitchCase"],[3,"viewDate","events","beforeViewRender","dayClicked"],[3,"viewDate","events","beforeViewRender","hourSegmentClicked"]],template:function(o,t){1&o&&(n.TgZ(0,"mwl-demo-utils-calendar-header",0),n.NdJ("viewChange",function(l){return t.view=l})("viewDateChange",function(l){return t.viewDate=l}),n._uU(1,"\n"),n.qZA(),n._uU(2,"\n\n"),n.TgZ(3,"div",1),n._uU(4,"\n  Click on a month view day or a time on the week or day view to select it\n"),n.qZA(),n._uU(5,"\n\n"),n.TgZ(6,"div",2),n._uU(7,"\n  "),n.YNc(8,c,2,2,"mwl-calendar-month-view",3),n._uU(9,"\n  "),n.YNc(10,y,2,2,"mwl-calendar-week-view",4),n._uU(11,"\n  "),n.YNc(12,U,2,2,"mwl-calendar-day-view",4),n._uU(13,"\n"),n.qZA(),n._uU(14,"\n")),2&o&&(n.Q6J("view",t.view)("viewDate",t.viewDate),n.xp6(6),n.Q6J("ngSwitch",t.view),n.xp6(2),n.Q6J("ngSwitchCase","month"),n.xp6(2),n.Q6J("ngSwitchCase","week"),n.xp6(2),n.Q6J("ngSwitchCase","day"))},dependencies:[e.RF,e.n9,f.G,u.T,a.S,s.$],styles:[".cal-day-selected,.cal-day-selected:hover{background-color:#ff1493!important}\n"],encapsulation:2,changeDetection:0});var M=i(20211);class C{}C.\u0275fac=function(o){return new(o||C)},C.\u0275mod=n.oAB({type:C}),C.\u0275inj=n.cJS({imports:[e.ez,h._8.forRoot({provide:m._,useFactory:M.x}),w.S,D.Bz.forChild([{path:"",component:p}])]})}}]);