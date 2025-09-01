import{a as Y}from"./chunk-CFSPUUHB.js";import{D as I}from"./chunk-2HQHCNGL.js";import{Ka as l,Kb as n,Mb as f,Mc as H,Nb as y,Nc as W,Ob as k,Pb as g,Rb as S,Ua as h,Xb as V,Yc as F,Zb as T,ad as M,gd as B,hd as P,ia as s,ja as w,jb as p,lb as v,pb as u,qb as c,rb as d,wb as x,yb as D,yc as E,zb as r}from"./chunk-ODVXNMMH.js";import"./chunk-RACSJ3AQ.js";function b(i,a){if(i&1&&(n(0,`
  `),c(1,"strong"),n(2),V(3,"date"),d(),n(4,`
  `)),i&2){let e=r();l(2),f("You clicked on this time: ",T(3,1,e.clickedDate,"medium"))}}function A(i,a){if(i&1&&(n(0,`
  `),c(1,"strong"),n(2),d(),n(3,`
  `)),i&2){let e=r();l(2),f("You clicked on this column: ",e.clickedColumn)}}function L(i,a){if(i&1){let e=x();n(0,`
  `),c(1,"mwl-calendar-month-view",2),D("columnHeaderClicked",function(o){s(e);let t=r();return w(t.clickedColumn=o.isoDayNumber)})("dayClicked",function(o){s(e);let t=r();return w(t.clickedDate=o.day.date)}),d(),n(2,`
  `)}if(i&2){let e=r();l(),u("viewDate",e.viewDate)("events",e.events)}}function N(i,a){if(i&1){let e=x();n(0,`
  `),c(1,"mwl-calendar-week-view",3),D("dayHeaderClicked",function(o){s(e);let t=r();return w(t.clickedDate=o.day.date)})("hourSegmentClicked",function(o){s(e);let t=r();return w(t.clickedDate=o.date)}),d(),n(2,`
  `)}if(i&2){let e=r();l(),u("viewDate",e.viewDate)("events",e.events)}}function j(i,a){if(i&1){let e=x();n(0,`
  `),c(1,"mwl-calendar-day-view",4),D("hourSegmentClicked",function(o){s(e);let t=r();return w(t.clickedDate=o.date)}),d(),n(2,`
  `)}if(i&2){let e=r();l(),u("viewDate",e.viewDate)("events",e.events)}}var O=(()=>{let a=class a{constructor(){this.view=W.Month,this.viewDate=new Date,this.events=[]}};a.\u0275fac=function(o){return new(o||a)},a.\u0275cmp=h({type:a,selectors:[["mwl-demo-component"]],features:[S([F({provide:H,useFactory:I})])],decls:14,vars:5,consts:[[3,"viewChange","viewDateChange","view","viewDate"],[1,"alert","alert-info"],[3,"columnHeaderClicked","dayClicked","viewDate","events"],[3,"dayHeaderClicked","hourSegmentClicked","viewDate","events"],[3,"hourSegmentClicked","viewDate","events"]],template:function(o,t){if(o&1&&(c(0,"mwl-demo-utils-calendar-header",0),g("viewChange",function(m){return k(t.view,m)||(t.view=m),m})("viewDateChange",function(m){return k(t.viewDate,m)||(t.viewDate=m),m}),d(),n(1,`

`),c(2,"div",1),n(3,`
  Click on a day or time slot on the view. `),p(4,b,5,4),p(5,A,4,1),d(),n(6,`

`),c(7,"div"),n(8,`
  `),p(9,L,3,2)(10,N,3,2)(11,j,3,2),n(12,`
`),d(),n(13,`
`)),o&2){let C;y("view",t.view)("viewDate",t.viewDate),l(4),v(t.clickedDate?4:-1),l(),v(t.clickedColumn!==void 0?5:-1),l(4),v((C=t.view)==="month"?9:C==="week"?10:C==="day"?11:-1)}},dependencies:[Y,M,B,P,E],encapsulation:2,changeDetection:0});let i=a;return i})();export{O as DemoComponent};
