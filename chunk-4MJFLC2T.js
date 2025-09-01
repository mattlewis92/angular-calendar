import{a as D}from"./chunk-SIVC2SE7.js";import{a as M}from"./chunk-CFSPUUHB.js";import{D as F}from"./chunk-2HQHCNGL.js";import{Ka as m,Kb as t,Mc as x,Nb as u,Nc as g,Ob as p,Pb as h,Rb as y,Ua as C,Yc as T,ad as S,gd as W,hd as E,jb as _,lb as f,pb as w,qb as s,rb as c,sb as v,zb as d}from"./chunk-ODVXNMMH.js";import"./chunk-RACSJ3AQ.js";function k(e,n){if(e&1&&(t(0,`
  `),v(1,"mwl-calendar-month-view",1),t(2,`
  `)),e&2){let i=d();m(),w("viewDate",i.viewDate)("events",i.events)("activeDayIsOpen",!0)}}function B(e,n){if(e&1&&(t(0,`
  `),v(1,"mwl-calendar-week-view",2),t(2,`
  `)),e&2){let i=d();m(),w("viewDate",i.viewDate)("events",i.events)}}function I(e,n){if(e&1&&(t(0,`
  `),v(1,"mwl-calendar-day-view",2),t(2,`
  `)),e&2){let i=d();m(),w("viewDate",i.viewDate)("events",i.events)}}var L=(()=>{let n=class n{constructor(){this.view=g.Month,this.viewDate=new Date,this.events=[{title:"Event 1",color:D.yellow,start:new Date,meta:{id:1}},{title:"Event 2",color:D.blue,start:new Date,meta:{id:2}}]}};n.\u0275fac=function(l){return new(l||n)},n.\u0275cmp=C({type:n,selectors:[["mwl-demo-component"]],features:[y([T({provide:x,useFactory:F})])],decls:9,vars:3,consts:[[3,"viewChange","viewDateChange","view","viewDate"],[3,"viewDate","events","activeDayIsOpen"],[3,"viewDate","events"]],template:function(l,a){if(l&1&&(s(0,"mwl-demo-utils-calendar-header",0),h("viewChange",function(o){return p(a.view,o)||(a.view=o),o})("viewDateChange",function(o){return p(a.viewDate,o)||(a.viewDate=o),o}),c(),t(1,`

`),s(2,"div"),t(3,`
  `),_(4,k,3,3)(5,B,3,2)(6,I,3,2),t(7,`
`),c(),t(8,`
`)),l&2){let r;u("view",a.view)("viewDate",a.viewDate),m(4),f((r=a.view)==="month"?4:r==="week"?5:r==="day"?6:-1)}},dependencies:[M,S,W,E],encapsulation:2,changeDetection:0});let e=n;return e})();export{L as DemoComponent};
