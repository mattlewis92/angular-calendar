import{a as v}from"./chunk-SIVC2SE7.js";import{a as M}from"./chunk-CFSPUUHB.js";import{D as E,d as _,f as u,j as s}from"./chunk-2HQHCNGL.js";import{Ka as l,Kb as t,Mc as T,Nb as x,Nc as W,Ob as C,Pb as g,Rb as k,Ua as f,Yc as S,ad as V,gd as A,hd as F,jb as h,lb as y,pb as w,qb as p,rb as D,sb as d,zb as c}from"./chunk-ODVXNMMH.js";import"./chunk-RACSJ3AQ.js";function H(e,n){if(e&1&&(t(0,`
  `),d(1,"mwl-calendar-month-view",1),t(2,`
  `)),e&2){let i=c();l(),w("viewDate",i.viewDate)("events",i.events)}}function P(e,n){if(e&1&&(t(0,`
  `),d(1,"mwl-calendar-week-view",1),t(2,`
  `)),e&2){let i=c();l(),w("viewDate",i.viewDate)("events",i.events)}}function b(e,n){if(e&1&&(t(0,`
  `),d(1,"mwl-calendar-day-view",1),t(2,`
  `)),e&2){let i=c();l(),w("viewDate",i.viewDate)("events",i.events)}}var I=(()=>{let n=class n{constructor(){this.view=W.Week,this.viewDate=new Date,this.events=[{start:s(new Date),title:"An event",color:v.yellow},{start:u(s(new Date),2),end:new Date,title:"Another event",color:v.blue},{start:_(u(s(new Date),2),2),end:_(new Date,2),title:"And another",color:v.red}]}};n.\u0275fac=function(m){return new(m||n)},n.\u0275cmp=f({type:n,selectors:[["mwl-demo-component"]],features:[k([S({provide:T,useFactory:E})])],decls:9,vars:3,consts:[[3,"viewChange","viewDateChange","view","viewDate"],[3,"viewDate","events"]],template:function(m,a){if(m&1&&(p(0,"mwl-demo-utils-calendar-header",0),g("viewChange",function(o){return C(a.view,o)||(a.view=o),o})("viewDateChange",function(o){return C(a.viewDate,o)||(a.viewDate=o),o}),D(),t(1,`

`),p(2,"div"),t(3,`
  `),h(4,H,3,2)(5,P,3,2)(6,b,3,2),t(7,`
`),D(),t(8,`
`)),m&2){let r;x("view",a.view)("viewDate",a.viewDate),l(4),y((r=a.view)==="month"?4:r==="week"?5:r==="day"?6:-1)}},dependencies:[M,V,A,F],styles:[`.cal-week-view .cal-time-events .cal-day-column{margin-right:10px}.cal-week-view .cal-hour{width:calc(100% + 10px)}
`],encapsulation:2,changeDetection:0});let e=n;return e})();export{I as DemoComponent};
