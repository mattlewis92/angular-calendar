import{a as W}from"./chunk-CFSPUUHB.js";import{D as M}from"./chunk-2HQHCNGL.js";import{Ka as m,Kb as o,Mc as b,Nb as V,Nc as k,Ob as u,Pb as g,Rb as y,Ua as h,Yc as E,ad as R,gd as S,hd as T,ia as _,ja as p,jb as D,lb as x,pb as f,qb as d,rb as w,wb as v,yb as C,zb as c}from"./chunk-ODVXNMMH.js";import"./chunk-RACSJ3AQ.js";function H(a,s){if(a&1){let n=v();o(0,`
  `),d(1,"mwl-calendar-month-view",2),C("beforeViewRender",function(t){_(n);let e=c();return p(e.beforeMonthViewRender(t))}),w(),o(2,`
  `)}if(a&2){let n=c();m(),f("viewDate",n.viewDate)("events",n.events)}}function F(a,s){if(a&1){let n=v();o(0,`
  `),d(1,"mwl-calendar-week-view",2),C("beforeViewRender",function(t){_(n);let e=c();return p(e.beforeWeekViewRender(t))}),w(),o(2,`
  `)}if(a&2){let n=c();m(),f("viewDate",n.viewDate)("events",n.events)}}function B(a,s){if(a&1){let n=v();o(0,`
  `),d(1,"mwl-calendar-day-view",2),C("beforeViewRender",function(t){_(n);let e=c();return p(e.beforeDayViewRender(t))}),w(),o(2,`
  `)}if(a&2){let n=c();m(),f("viewDate",n.viewDate)("events",n.events)}}var Y=(()=>{let s=class s{constructor(){this.view=k.Month,this.viewDate=new Date,this.events=[]}beforeMonthViewRender(r){r.body.forEach(t=>{let e=t.date.getDate();e>5&&e<10&&t.inMonth&&(t.cssClass="bg-pink")})}beforeWeekViewRender(r){r.hourColumns.forEach(t=>{t.hours.forEach(e=>{e.segments.forEach(i=>{i.date.getHours()>=2&&i.date.getHours()<=5&&i.date.getDay()===2&&(i.cssClass="bg-pink")})})})}beforeDayViewRender(r){r.hourColumns.forEach(t=>{t.hours.forEach(e=>{e.segments.forEach(i=>{i.date.getHours()>=2&&i.date.getHours()<=5&&(i.cssClass="bg-pink")})})})}};s.\u0275fac=function(t){return new(t||s)},s.\u0275cmp=h({type:s,selectors:[["mwl-demo-component"]],features:[y([E({provide:b,useFactory:M})])],decls:12,vars:3,consts:[[3,"viewChange","viewDateChange","view","viewDate"],[1,"alert","alert-info"],[3,"beforeViewRender","viewDate","events"]],template:function(t,e){if(t&1&&(d(0,"mwl-demo-utils-calendar-header",0),g("viewChange",function(l){return u(e.view,l)||(e.view=l),l})("viewDateChange",function(l){return u(e.viewDate,l)||(e.viewDate=l),l}),w(),o(1,`

`),d(2,"div",1),o(3,`
  You can use each views beforeViewRender output to add a custom cssClass to
  different cells to add styling for disabled time slots
`),w(),o(4,`

`),d(5,"div"),o(6,`
  `),D(7,H,3,2)(8,F,3,2)(9,B,3,2),o(10,`
`),w(),o(11,`
`)),t&2){let i;V("view",e.view)("viewDate",e.viewDate),m(7),x((i=e.view)==="month"?7:i==="week"?8:i==="day"?9:-1)}},dependencies:[W,R,S,T],styles:[`.cal-month-view .bg-pink,.cal-week-view .cal-day-columns .bg-pink,.cal-day-view .bg-pink{background-color:#ff69b4!important}
`],encapsulation:2,changeDetection:0});let a=s;return a})();export{Y as DemoComponent};
