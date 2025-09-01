import{a as A}from"./chunk-SIVC2SE7.js";import{a as B}from"./chunk-CFSPUUHB.js";import{D as j}from"./chunk-2HQHCNGL.js";import{Ic as w,Ka as s,Kb as i,Mc as I,Nb as F,Nc as k,Ob as f,Pb as T,Rb as b,Ua as y,Yc as S,Z as u,ad as W,ca as h,dc as E,gd as M,hd as V,jb as x,lb as g,pb as c,qb as C,rb as D,sb as d,tc as v,va as _,zb as p}from"./chunk-ODVXNMMH.js";import"./chunk-RACSJ3AQ.js";var L=(()=>{let e=class e extends w{constructor(){super(...arguments),this.locale=h(E)}month(n){return`<b>${v(n.start,"h:m a",this.locale)}</b> ${n.title}`}week(n){return`<b>${v(n.start,"h:m a",this.locale)}</b> ${n.title}`}day(n){return`<b>${v(n.start,"h:m a",this.locale)}</b> ${n.title}`}};e.\u0275fac=(()=>{let n;return function(a){return(n||(n=_(e)))(a||e)}})(),e.\u0275prov=u({token:e,factory:e.\u0275fac});let t=e;return t})();function P(t,e){if(t&1&&(i(0,`
  `),d(1,"mwl-calendar-month-view",1),i(2,`
  `)),t&2){let o=p();s(),c("viewDate",o.viewDate)("events",o.events)("activeDayIsOpen",!0)}}function $(t,e){if(t&1&&(i(0,`
  `),d(1,"mwl-calendar-week-view",2),i(2,`
  `)),t&2){let o=p();s(),c("viewDate",o.viewDate)("events",o.events)}}function H(t,e){if(t&1&&(i(0,`
  `),d(1,"mwl-calendar-day-view",2),i(2,`
  `)),t&2){let o=p();s(),c("viewDate",o.viewDate)("events",o.events)}}var Y=(()=>{let e=class e{constructor(){this.view=k.Month,this.viewDate=new Date,this.events=[{title:"An event",start:new Date,color:A.red}]}};e.\u0275fac=function(m){return new(m||e)},e.\u0275cmp=y({type:e,selectors:[["mwl-demo-component"]],features:[b([S({provide:I,useFactory:j},{eventTitleFormatter:{provide:w,useClass:L}})])],decls:9,vars:3,consts:[[3,"viewChange","viewDateChange","view","viewDate"],[3,"viewDate","events","activeDayIsOpen"],[3,"viewDate","events"]],template:function(m,a){if(m&1&&(C(0,"mwl-demo-utils-calendar-header",0),T("viewChange",function(r){return f(a.view,r)||(a.view=r),r})("viewDateChange",function(r){return f(a.viewDate,r)||(a.viewDate=r),r}),D(),i(1,`

`),C(2,"div"),i(3,`
  `),x(4,P,3,3)(5,$,3,2)(6,H,3,2),i(7,`
`),D(),i(8,`
`)),m&2){let l;F("view",a.view)("viewDate",a.viewDate),s(4),g((l=a.view)==="month"?4:l==="week"?5:l==="day"?6:-1)}},dependencies:[B,W,M,V],encapsulation:2,changeDetection:0});let t=e;return t})();export{Y as DemoComponent};
