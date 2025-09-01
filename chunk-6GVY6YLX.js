import{a as B}from"./chunk-CFSPUUHB.js";import{D as W}from"./chunk-2HQHCNGL.js";import{Ka as l,Kb as a,Mc as V,Nb as g,Nc as M,Ob as f,Pb as F,Rb as E,Tc as v,Ua as h,Yc as T,Z as D,ad as H,gd as k,hd as S,jb as y,lb as x,pb as c,qb as C,rb as u,sb as w,tc as s,va as _,zb as p}from"./chunk-ODVXNMMH.js";import"./chunk-RACSJ3AQ.js";var I=(()=>{let e=class e extends v{monthViewColumnHeader({date:i,locale:n}){return s(i,"EEE",n)}monthViewTitle({date:i,locale:n}){return s(i,"MMM y",n)}weekViewColumnHeader({date:i,locale:n}){return s(i,"EEE",n)}dayViewHour({date:i,locale:n}){return s(i,"HH:mm",n)}};e.\u0275fac=(()=>{let i;return function(o){return(i||(i=_(e)))(o||e)}})(),e.\u0275prov=D({token:e,factory:e.\u0275fac});let t=e;return t})();function j(t,e){if(t&1&&(a(0,`
  `),w(1,"mwl-calendar-month-view",1),a(2,`
  `)),t&2){let r=p();l(),c("viewDate",r.viewDate)("events",r.events)}}function P(t,e){if(t&1&&(a(0,`
  `),w(1,"mwl-calendar-week-view",1),a(2,`
  `)),t&2){let r=p();l(),c("viewDate",r.viewDate)("events",r.events)}}function A(t,e){if(t&1&&(a(0,`
  `),w(1,"mwl-calendar-day-view",1),a(2,`
  `)),t&2){let r=p();l(),c("viewDate",r.viewDate)("events",r.events)}}var O=(()=>{let e=class e{constructor(){this.view=M.Month,this.viewDate=new Date,this.events=[]}};e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=h({type:e,selectors:[["mwl-demo-component"]],features:[E([T({provide:V,useFactory:W},{dateFormatter:{provide:v,useClass:I}})])],decls:9,vars:3,consts:[[3,"viewChange","viewDateChange","view","viewDate"],[3,"viewDate","events"]],template:function(n,o){if(n&1&&(C(0,"mwl-demo-utils-calendar-header",0),F("viewChange",function(m){return f(o.view,m)||(o.view=m),m})("viewDateChange",function(m){return f(o.viewDate,m)||(o.viewDate=m),m}),u(),a(1,`

`),C(2,"div"),a(3,`
  `),y(4,j,3,2)(5,P,3,2)(6,A,3,2),a(7,`
`),u(),a(8,`
`)),n&2){let d;g("view",o.view)("viewDate",o.viewDate),l(4),x((d=o.view)==="month"?4:d==="week"?5:d==="day"?6:-1)}},dependencies:[B,H,k,S],encapsulation:2,changeDetection:0});let t=e;return t})();export{O as DemoComponent};
