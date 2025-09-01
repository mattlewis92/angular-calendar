import{a as x}from"./chunk-SIVC2SE7.js";import{a as B}from"./chunk-CFSPUUHB.js";import{D as O}from"./chunk-2HQHCNGL.js";import{Ka as d,Kb as i,Mc as T,Nb as k,Nc as S,Ob as u,Pb as g,Rb as V,Ua as f,Yc as E,ad as W,gd as F,hd as M,ia as _,ja as v,jb as h,lb as y,pb as C,qb as m,rb as s,wb as p,yb as D,zb as l}from"./chunk-ODVXNMMH.js";import"./chunk-RACSJ3AQ.js";function I(n,a){if(n&1){let e=p();i(0,`
  `),m(1,"mwl-calendar-month-view",1),D("eventClicked",function(o){_(e);let t=l();return v(t.eventClicked(o))}),s(),i(2,`
  `)}if(n&2){let e=l();d(),C("viewDate",e.viewDate)("events",e.events)("activeDayIsOpen",!0)}}function P(n,a){if(n&1){let e=p();i(0,`
  `),m(1,"mwl-calendar-week-view",2),D("eventClicked",function(o){_(e);let t=l();return v(t.eventClicked(o))}),s(),i(2,`
  `)}if(n&2){let e=l();d(),C("viewDate",e.viewDate)("events",e.events)}}function b(n,a){if(n&1){let e=p();i(0,`
  `),m(1,"mwl-calendar-day-view",2),D("eventClicked",function(o){_(e);let t=l();return v(t.eventClicked(o))}),s(),i(2,`
  `)}if(n&2){let e=l();d(),C("viewDate",e.viewDate)("events",e.events)}}var z=(()=>{let a=class a{constructor(){this.view=S.Month,this.viewDate=new Date,this.events=[{title:"Click me",color:x.yellow,start:new Date},{title:"Or click me",color:x.blue,start:new Date}]}eventClicked({event:c}){console.log("Event clicked",c)}};a.\u0275fac=function(o){return new(o||a)},a.\u0275cmp=f({type:a,selectors:[["mwl-demo-component"]],features:[V([E({provide:T,useFactory:O})])],decls:9,vars:3,consts:[[3,"viewChange","viewDateChange","view","viewDate"],[3,"eventClicked","viewDate","events","activeDayIsOpen"],[3,"eventClicked","viewDate","events"]],template:function(o,t){if(o&1&&(m(0,"mwl-demo-utils-calendar-header",0),g("viewChange",function(r){return u(t.view,r)||(t.view=r),r})("viewDateChange",function(r){return u(t.viewDate,r)||(t.viewDate=r),r}),s(),i(1,`

`),m(2,"div"),i(3,`
  `),h(4,I,3,3)(5,P,3,2)(6,b,3,2),i(7,`
`),s(),i(8,`
`)),o&2){let w;k("view",t.view)("viewDate",t.viewDate),d(4),y((w=t.view)==="month"?4:w==="week"?5:w==="day"?6:-1)}},dependencies:[B,W,F,M],encapsulation:2,changeDetection:0});let n=a;return n})();export{z as DemoComponent};
