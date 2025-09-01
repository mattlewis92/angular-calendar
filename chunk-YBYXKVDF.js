import{a as I}from"./chunk-SIVC2SE7.js";import{D as Y}from"./chunk-2HQHCNGL.js";import{Ib as p,Ka as o,Kb as e,Mb as g,Mc as W,Nb as y,Nc as x,Ob as u,Oc as P,Pb as C,Qc as b,Rb as E,Rc as M,Sc as F,Ua as h,Uc as B,Wb as k,Xb as V,Yc as N,ac as T,ad as O,gd as A,hd as L,jb as f,lb as S,pb as w,qb as i,rb as n,sb as m,yb as D,zb as c}from"./chunk-ODVXNMMH.js";import"./chunk-RACSJ3AQ.js";var K=(a,l,r,_)=>[a,l,"en",r,_];function U(a,l){if(a&1&&(e(0,`
  `),m(1,"mwl-calendar-month-view",7),e(2,`
  `)),a&2){let r=c();o(),w("viewDate",r.viewDate)("events",r.events)("excludeDays",r.excludeDays)}}function j(a,l){if(a&1&&(e(0,`
  `),m(1,"mwl-calendar-week-view",8),e(2,`
  `)),a&2){let r=c();o(),w("excludeDays",r.excludeDays)("viewDate",r.viewDate)("events",r.events)}}function q(a,l){if(a&1&&(e(0,`
  `),m(1,"mwl-calendar-day-view",9),e(2,`
  `)),a&2){let r=c();o(),w("viewDate",r.viewDate)("events",r.events)}}var Q=(()=>{let l=class l{constructor(){this.view=x.Month,this.viewDate=new Date("2016-01-05"),this.events=[{start:new Date("2016-01-08"),end:new Date("2016-01-10"),title:"One day excluded event",color:I.red,allDay:!0},{start:new Date("2016-01-01"),end:new Date("2016-01-09"),title:"Multiple weeks event",allDay:!0}],this.excludeDays=[0,6],this.weekStartsOn=P.SUNDAY,this.CalendarView=x}};l.\u0275fac=function(s){return new(s||l)},l.\u0275cmp=h({type:l,selectors:[["mwl-demo-component"]],features:[E([N({provide:W,useFactory:Y})])],decls:49,vars:26,consts:[[1,"row","text-center"],[1,"col-md-4"],[1,"btn-group"],["mwlCalendarPreviousView","",1,"btn","btn-primary",3,"viewDateChange","view","viewDate","excludeDays"],["mwlCalendarToday","",1,"btn","btn-outline-secondary",3,"viewDateChange","viewDate"],["mwlCalendarNextView","",1,"btn","btn-primary",3,"viewDateChange","view","viewDate","excludeDays"],[1,"btn","btn-primary",3,"click"],[3,"viewDate","events","excludeDays"],[3,"excludeDays","viewDate","events"],[3,"viewDate","events"]],template:function(s,t){if(s&1&&(i(0,"div",0),e(1,`
  `),i(2,"div",1),e(3,`
    `),i(4,"div",2),e(5,`
      `),i(6,"div",3),C("viewDateChange",function(d){return u(t.viewDate,d)||(t.viewDate=d),d}),e(7,`
        Previous
      `),n(),e(8,`
      `),i(9,"div",4),C("viewDateChange",function(d){return u(t.viewDate,d)||(t.viewDate=d),d}),e(10,`
        Today
      `),n(),e(11,`
      `),i(12,"div",5),C("viewDateChange",function(d){return u(t.viewDate,d)||(t.viewDate=d),d}),e(13,`
        Next
      `),n(),e(14,`
    `),n(),e(15,`
  `),n(),e(16,`
  `),i(17,"div",1),e(18,`
    `),i(19,"h3"),e(20),V(21,"calendarDate"),n(),e(22,`
  `),n(),e(23,`
  `),i(24,"div",1),e(25,`
    `),i(26,"div",2),e(27,`
      `),i(28,"div",6),D("click",function(){return t.view=t.CalendarView.Month}),e(29,`
        Month
      `),n(),e(30,`
      `),i(31,"div",6),D("click",function(){return t.view=t.CalendarView.Week}),e(32,`
        Week
      `),n(),e(33,`
      `),i(34,"div",6),D("click",function(){return t.view=t.CalendarView.Day}),e(35,`
        Day
      `),n(),e(36,`
    `),n(),e(37,`
  `),n(),e(38,`
`),n(),e(39,`
`),m(40,"br"),e(41,`

`),i(42,"div"),e(43,`
  `),f(44,U,3,3)(45,j,3,3)(46,q,3,2),e(47,`
`),n(),e(48,`
`)),s&2){let v;o(6),w("view",t.view),y("viewDate",t.viewDate),w("excludeDays",t.excludeDays),o(3),y("viewDate",t.viewDate),o(3),w("view",t.view),y("viewDate",t.viewDate),w("excludeDays",t.excludeDays),o(8),g(`
      `,T(21,15,k(21,K,t.viewDate,t.view+"ViewTitle",t.weekStartsOn,t.excludeDays)),`
    `),o(8),p("active",t.view==="month"),o(3),p("active",t.view==="week"),o(3),p("active",t.view==="day"),o(10),S((v=t.view)==="month"?44:v==="week"?45:v==="day"?46:-1)}},dependencies:[b,F,M,O,A,L,B],encapsulation:2,changeDetection:0});let a=l;return a})();export{Q as DemoComponent};
