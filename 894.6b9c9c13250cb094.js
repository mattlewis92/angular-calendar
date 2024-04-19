"use strict";(self.webpackChunkdemos=self.webpackChunkdemos||[]).push([[894],{43303:(T,c,t)=>{t.d(c,{$:()=>d});var n=t(44879),g=t(2316),p=t(50111),u=t(58125),l=t(68849),C=t(4540);class d{constructor(){this.locale="en",this.viewChange=new n.vpe,this.viewDateChange=new n.vpe,this.CalendarView=g.w}}d.\u0275fac=function(m){return new(m||d)},d.\u0275cmp=n.Xpm({type:d,selectors:[["mwl-demo-utils-calendar-header"]],inputs:{view:"view",viewDate:"viewDate",locale:"locale"},outputs:{viewChange:"viewChange",viewDateChange:"viewDateChange"},decls:43,vars:16,consts:[[1,"row","text-center"],[1,"col-md-4"],[1,"btn-group"],["mwlCalendarPreviousView","",1,"btn","btn-primary",3,"view","viewDate","viewDateChange"],["mwlCalendarToday","",1,"btn","btn-outline-secondary",3,"viewDate","viewDateChange"],["mwlCalendarNextView","",1,"btn","btn-primary",3,"view","viewDate","viewDateChange"],[1,"btn","btn-primary",3,"click"]],template:function(m,e){1&m&&(n._uU(0,"\n    "),n.TgZ(1,"div",0),n._uU(2,"\n      "),n.TgZ(3,"div",1),n._uU(4,"\n        "),n.TgZ(5,"div",2),n._uU(6,"\n          "),n.TgZ(7,"div",3),n.NdJ("viewDateChange",function(w){return e.viewDate=w})("viewDateChange",function(){return e.viewDateChange.next(e.viewDate)}),n._uU(8,"\n            Previous\n          "),n.qZA(),n._uU(9,"\n          "),n.TgZ(10,"div",4),n.NdJ("viewDateChange",function(w){return e.viewDate=w})("viewDateChange",function(){return e.viewDateChange.next(e.viewDate)}),n._uU(11,"\n            Today\n          "),n.qZA(),n._uU(12,"\n          "),n.TgZ(13,"div",5),n.NdJ("viewDateChange",function(w){return e.viewDate=w})("viewDateChange",function(){return e.viewDateChange.next(e.viewDate)}),n._uU(14,"\n            Next\n          "),n.qZA(),n._uU(15,"\n        "),n.qZA(),n._uU(16,"\n      "),n.qZA(),n._uU(17,"\n      "),n.TgZ(18,"div",1),n._uU(19,"\n        "),n.TgZ(20,"h3"),n._uU(21),n.ALo(22,"calendarDate"),n.qZA(),n._uU(23,"\n      "),n.qZA(),n._uU(24,"\n      "),n.TgZ(25,"div",1),n._uU(26,"\n        "),n.TgZ(27,"div",2),n._uU(28,"\n          "),n.TgZ(29,"div",6),n.NdJ("click",function(){return e.viewChange.emit(e.CalendarView.Month)}),n._uU(30,"\n            Month\n          "),n.qZA(),n._uU(31,"\n          "),n.TgZ(32,"div",6),n.NdJ("click",function(){return e.viewChange.emit(e.CalendarView.Week)}),n._uU(33,"\n            Week\n          "),n.qZA(),n._uU(34,"\n          "),n.TgZ(35,"div",6),n.NdJ("click",function(){return e.viewChange.emit(e.CalendarView.Day)}),n._uU(36,"\n            Day\n          "),n.qZA(),n._uU(37,"\n        "),n.qZA(),n._uU(38,"\n      "),n.qZA(),n._uU(39,"\n    "),n.qZA(),n._uU(40,"\n    "),n._UZ(41,"br"),n._uU(42,"\n  ")),2&m&&(n.xp6(7),n.Q6J("view",e.view)("viewDate",e.viewDate),n.xp6(3),n.Q6J("viewDate",e.viewDate),n.xp6(3),n.Q6J("view",e.view)("viewDate",e.viewDate),n.xp6(8),n.Oqu(n.Dn7(22,12,e.viewDate,e.view+"ViewTitle",e.locale)),n.xp6(8),n.ekj("active",e.view===e.CalendarView.Month),n.xp6(3),n.ekj("active",e.view===e.CalendarView.Week),n.xp6(3),n.ekj("active",e.view===e.CalendarView.Day))},dependencies:[p.O,u.T,l.i,C.J],encapsulation:2})},44248:(T,c,t)=>{t.d(c,{S:()=>l});var n=t(50192),g=t(86963),p=t(5234),u=t(44879);class l{}l.\u0275fac=function(d){return new(d||l)},l.\u0275mod=u.oAB({type:l}),l.\u0275inj=u.cJS({imports:[n.ez,g.u5,p._8]})},90894:(T,c,t)=>{t.r(c),t.d(c,{DemoModule:()=>D});var n=t(50192),g=t(98783),p=t(5234),u=t(33275),l=t(9069),C=t(44248),d=t(2316),f=t(23468),m=t(22201),e=t(44879),v=t(79144),w=t(84156),U=t(56500),Z=t(43303);function E(o,i){1&o&&(e.TgZ(0,"p")(1,"em"),e._uU(2,"No events added"),e.qZA()())}const A=function(o){return{event:o}},y=function(){return{delay:300,delta:30}};function O(o,i){if(1&o&&(e.TgZ(0,"li",11),e._uU(1,"\n            "),e.TgZ(2,"a",12),e._uU(3),e.qZA(),e._uU(4,"\n          "),e.qZA()),2&o){const a=i.$implicit;e.Q6J("dropData",e.VKq(5,A,a))("touchStartLongPress",e.DdM(7,y)),e.xp6(2),e.Udp("color",a.color.primary),e.xp6(1),e.hij("\n              ",a.title,"\n            ")}}function M(o,i){if(1&o){const a=e.EpF();e.TgZ(0,"mwl-calendar-month-view",13),e.NdJ("eventTimesChanged",function(r){e.CHM(a);const s=e.oxw();return e.KtG(s.eventDropped(r))}),e._uU(1,"\n      "),e.qZA()}if(2&o){const a=e.oxw();e.Q6J("viewDate",a.viewDate)("events",a.events)("activeDayIsOpen",a.activeDayIsOpen)("refresh",a.refresh)}}function J(o,i){if(1&o){const a=e.EpF();e.TgZ(0,"mwl-calendar-week-view",14),e.NdJ("eventTimesChanged",function(r){e.CHM(a);const s=e.oxw();return e.KtG(s.eventDropped(r))}),e._uU(1,"\n      "),e.qZA()}if(2&o){const a=e.oxw();e.Q6J("viewDate",a.viewDate)("events",a.events)("refresh",a.refresh)("snapDraggedEvents",!1)}}function P(o,i){if(1&o){const a=e.EpF();e.TgZ(0,"mwl-calendar-day-view",14),e.NdJ("eventTimesChanged",function(r){e.CHM(a);const s=e.oxw();return e.KtG(s.eventDropped(r))}),e._uU(1,"\n      "),e.qZA()}if(2&o){const a=e.oxw();e.Q6J("viewDate",a.viewDate)("events",a.events)("refresh",a.refresh)("snapDraggedEvents",!1)}}class h{constructor(){this.CalendarView=d.w,this.view=d.w.Month,this.viewDate=new Date,this.externalEvents=[{title:"Event 1",color:m.O.yellow,start:new Date,draggable:!0},{title:"Event 2",color:m.O.blue,start:new Date,draggable:!0}],this.events=[],this.activeDayIsOpen=!1,this.refresh=new f.x}eventDropped({event:i,newStart:a,newEnd:_,allDay:r}){const s=this.externalEvents.indexOf(i);typeof r<"u"&&(i.allDay=r),s>-1&&(this.externalEvents.splice(s,1),this.events.push(i)),i.start=a,_&&(i.end=_),"month"===this.view&&(this.viewDate=a,this.activeDayIsOpen=!0),this.events=[...this.events]}externalDrop(i){-1===this.externalEvents.indexOf(i)&&(this.events=this.events.filter(a=>a!==i),this.externalEvents.push(i))}}h.\u0275fac=function(i){return new(i||h)},h.\u0275cmp=e.Xpm({type:h,selectors:[["mwl-demo-component"]],decls:34,vars:8,consts:[[1,"row"],[1,"col-md-3"],["mwlDroppable","","dragOverClass","drag-over",1,"card",3,"drop"],[1,"card-body"],[4,"ngIf"],["mwlDraggable","","dragActiveClass","drag-active",3,"dropData","touchStartLongPress",4,"ngFor","ngForOf"],[1,"col-md-9"],[3,"view","viewDate","viewChange","viewDateChange"],[3,"ngSwitch"],[3,"viewDate","events","activeDayIsOpen","refresh","eventTimesChanged",4,"ngSwitchCase"],[3,"viewDate","events","refresh","snapDraggedEvents","eventTimesChanged",4,"ngSwitchCase"],["mwlDraggable","","dragActiveClass","drag-active",3,"dropData","touchStartLongPress"],["href","javascript:;"],[3,"viewDate","events","activeDayIsOpen","refresh","eventTimesChanged"],[3,"viewDate","events","refresh","snapDraggedEvents","eventTimesChanged"]],template:function(i,a){1&i&&(e.TgZ(0,"div",0),e._uU(1,"\n  "),e.TgZ(2,"div",1),e._uU(3,"\n    "),e.TgZ(4,"div",2),e.NdJ("drop",function(r){return a.externalDrop(r.dropData.event)}),e._uU(5,"\n      "),e.TgZ(6,"div",3),e._uU(7,"\n        "),e.YNc(8,E,3,0,"p",4),e._uU(9,"\n        "),e.TgZ(10,"ul"),e._uU(11,"\n          "),e.YNc(12,O,5,8,"li",5),e._uU(13,"\n        "),e.qZA(),e._uU(14,"\n      "),e.qZA(),e._uU(15,"\n    "),e.qZA(),e._uU(16,"\n  "),e.qZA(),e._uU(17,"\n\n  "),e.TgZ(18,"div",6),e._uU(19,"\n    "),e.TgZ(20,"mwl-demo-utils-calendar-header",7),e.NdJ("viewChange",function(r){return a.view=r})("viewDateChange",function(r){return a.viewDate=r}),e._uU(21,"\n    "),e.qZA(),e._uU(22,"\n\n    "),e.TgZ(23,"div",8),e._uU(24,"\n      "),e.YNc(25,M,2,4,"mwl-calendar-month-view",9),e._uU(26,"\n      "),e.YNc(27,J,2,4,"mwl-calendar-week-view",10),e._uU(28,"\n      "),e.YNc(29,P,2,4,"mwl-calendar-day-view",10),e._uU(30,"\n    "),e.qZA(),e._uU(31,"\n  "),e.qZA(),e._uU(32,"\n"),e.qZA(),e._uU(33,"\n")),2&i&&(e.xp6(8),e.Q6J("ngIf",0===a.externalEvents.length),e.xp6(4),e.Q6J("ngForOf",a.externalEvents),e.xp6(8),e.Q6J("view",a.view)("viewDate",a.viewDate),e.xp6(3),e.Q6J("ngSwitch",a.view),e.xp6(2),e.Q6J("ngSwitchCase",a.CalendarView.Month),e.xp6(2),e.Q6J("ngSwitchCase",a.CalendarView.Week),e.xp6(2),e.Q6J("ngSwitchCase",a.CalendarView.Day))},dependencies:[n.sg,n.O5,n.RF,n.n9,l.pD,l.D5,v.G,w.T,U.S,Z.$],styles:[".drag-active[_ngcontent-%COMP%]{position:relative;z-index:1;pointer-events:none}.drag-over[_ngcontent-%COMP%]{background-color:#eee}"],changeDetection:0});var I=t(20211);class D{}D.\u0275fac=function(i){return new(i||D)},D.\u0275mod=e.oAB({type:D}),D.\u0275inj=e.cJS({imports:[n.ez,p._8.forRoot({provide:u._,useFactory:I.x}),l.Vk,C.S,g.Bz.forChild([{path:"",component:h}])]})}}]);