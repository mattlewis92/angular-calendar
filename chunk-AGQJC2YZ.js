import{a as f}from"./chunk-SIVC2SE7.js";import{a as B}from"./chunk-CFSPUUHB.js";import{D as A}from"./chunk-2HQHCNGL.js";import{Ka as _,Kb as a,Mc as b,Nb as T,Nc as E,Ob as D,Pb as V,Rb as S,Ua as u,Yc as W,ad as k,f as g,gd as F,hd as M,ia as v,ja as c,jb as x,lb as y,pb as C,qb as l,rb as d,wb as p,yb as h,zb as m}from"./chunk-ODVXNMMH.js";import"./chunk-RACSJ3AQ.js";function I(n,r){if(n&1){let e=p();a(0,`
  `),l(1,"mwl-calendar-month-view",1),h("eventTimesChanged",function(i){v(e);let t=m();return c(t.eventTimesChanged(i))}),d(),a(2,`
  `)}if(n&2){let e=m();_(),C("viewDate",e.viewDate)("events",e.events)("activeDayIsOpen",!0)("refresh",e.refresh)}}function O(n,r){if(n&1){let e=p();a(0,`
  `),l(1,"mwl-calendar-week-view",2),h("eventTimesChanged",function(i){v(e);let t=m();return c(t.eventTimesChanged(i))}),d(),a(2,`
  `)}if(n&2){let e=m();_(),C("viewDate",e.viewDate)("events",e.events)("refresh",e.refresh)}}function P(n,r){if(n&1){let e=p();a(0,`
  `),l(1,"mwl-calendar-day-view",2),h("eventTimesChanged",function(i){v(e);let t=m();return c(t.eventTimesChanged(i))}),d(),a(2,`
  `)}if(n&2){let e=m();_(),C("viewDate",e.viewDate)("events",e.events)("refresh",e.refresh)}}var J=(()=>{let r=class r{constructor(){this.view=E.Month,this.viewDate=new Date,this.events=[{title:"Draggable event",color:f.yellow,start:new Date,draggable:!0},{title:"A non draggable event",color:f.blue,start:new Date}],this.refresh=new g}eventTimesChanged({event:o,newStart:i,newEnd:t}){o.start=i,o.end=t,this.refresh.next()}};r.\u0275fac=function(i){return new(i||r)},r.\u0275cmp=u({type:r,selectors:[["mwl-demo-component"]],features:[S([W({provide:b,useFactory:A})])],decls:9,vars:3,consts:[[3,"viewChange","viewDateChange","view","viewDate"],[3,"eventTimesChanged","viewDate","events","activeDayIsOpen","refresh"],[3,"eventTimesChanged","viewDate","events","refresh"]],template:function(i,t){if(i&1&&(l(0,"mwl-demo-utils-calendar-header",0),V("viewChange",function(s){return D(t.view,s)||(t.view=s),s})("viewDateChange",function(s){return D(t.viewDate,s)||(t.viewDate=s),s}),d(),a(1,`

`),l(2,"div"),a(3,`
  `),x(4,I,3,4)(5,O,3,3)(6,P,3,3),a(7,`
`),d(),a(8,`
`)),i&2){let w;T("view",t.view)("viewDate",t.viewDate),_(4),y((w=t.view)==="month"?4:w==="week"?5:w==="day"?6:-1)}},dependencies:[B,k,F,M],encapsulation:2,changeDetection:0});let n=r;return n})();export{J as DemoComponent};
