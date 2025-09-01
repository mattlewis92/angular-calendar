import{a as V}from"./chunk-SIVC2SE7.js";import{a as B}from"./chunk-CFSPUUHB.js";import{D as M}from"./chunk-2HQHCNGL.js";import{Ic as p,Ka as s,Kb as n,Mc as F,Nb as x,Nc as k,Ob as D,Pb as g,Rb as T,Ua as _,Yc as E,Z as f,ad as I,gd as S,hd as W,jb as h,lb as y,pb as v,qb as w,rb as C,sb as c,va as u,zb as d}from"./chunk-ODVXNMMH.js";import"./chunk-RACSJ3AQ.js";var b=(()=>{let e=class e extends p{monthTooltip(o){}weekTooltip(o){}dayTooltip(o){}};e.\u0275fac=(()=>{let o;return function(i){return(o||(o=u(e)))(i||e)}})(),e.\u0275prov=f({token:e,factory:e.\u0275fac});let t=e;return t})();function A(t,e){if(t&1&&(n(0,`
  `),c(1,"mwl-calendar-month-view",1),n(2,`
  `)),t&2){let a=d();s(),v("viewDate",a.viewDate)("events",a.events)("activeDayIsOpen",!0)}}function O(t,e){if(t&1&&(n(0,`
  `),c(1,"mwl-calendar-week-view",2),n(2,`
  `)),t&2){let a=d();s(),v("viewDate",a.viewDate)("events",a.events)}}function P(t,e){if(t&1&&(n(0,`
  `),c(1,"mwl-calendar-day-view",2),n(2,`
  `)),t&2){let a=d();s(),v("viewDate",a.viewDate)("events",a.events)}}var N=(()=>{let e=class e{constructor(){this.view=k.Month,this.viewDate=new Date,this.events=[{title:"An event",start:new Date,color:V.red}]}};e.\u0275fac=function(m){return new(m||e)},e.\u0275cmp=_({type:e,selectors:[["mwl-demo-component"]],features:[T([E({provide:F,useFactory:M},{eventTitleFormatter:{provide:p,useClass:b}})])],decls:9,vars:3,consts:[[3,"viewChange","viewDateChange","view","viewDate"],[3,"viewDate","events","activeDayIsOpen"],[3,"viewDate","events"]],template:function(m,i){if(m&1&&(w(0,"mwl-demo-utils-calendar-header",0),g("viewChange",function(r){return D(i.view,r)||(i.view=r),r})("viewDateChange",function(r){return D(i.viewDate,r)||(i.viewDate=r),r}),C(),n(1,`

`),w(2,"div"),n(3,`
  `),h(4,A,3,3)(5,O,3,2)(6,P,3,2),n(7,`
`),C(),n(8,`
`)),m&2){let l;x("view",i.view)("viewDate",i.viewDate),s(4),y((l=i.view)==="month"?4:l==="week"?5:l==="day"?6:-1)}},dependencies:[B,I,S,W],encapsulation:2,changeDetection:0});let t=e;return t})();export{N as DemoComponent};
