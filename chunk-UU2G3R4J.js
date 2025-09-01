import{a as _}from"./chunk-SIVC2SE7.js";import{a as B}from"./chunk-CFSPUUHB.js";import{A as D,D as k,z as C}from"./chunk-2HQHCNGL.js";import{Ka as m,Kb as t,Mc as T,Nb as y,Nc as S,Ob as p,Pb as x,Rb as g,Ua as f,Yc as W,ad as F,gd as M,hd as V,jb as u,lb as h,pb as d,qb as v,rb as c,sb as w,zb as s}from"./chunk-ODVXNMMH.js";import"./chunk-RACSJ3AQ.js";function H(e,n){if(e&1&&(t(0,`
  `),w(1,"mwl-calendar-month-view",1),t(2,`
  `)),e&2){let i=s();m(),d("viewDate",i.viewDate)("events",i.events)}}function N(e,n){if(e&1&&(t(0,`
  `),w(1,"mwl-calendar-week-view",1),t(2,`
  `)),e&2){let i=s();m(),d("viewDate",i.viewDate)("events",i.events)}}function P(e,n){if(e&1&&(t(0,`
  `),w(1,"mwl-calendar-day-view",1),t(2,`
  `)),e&2){let i=s();m(),d("viewDate",i.viewDate)("events",i.events)}}var G=(()=>{let n=class n{constructor(){this.view=S.Day,this.viewDate=new Date,this.events=[{title:"No event end date",start:C(D(new Date,0),3),color:_.blue},{title:"No event end date",start:C(D(new Date,0),5),color:_.yellow}]}};n.\u0275fac=function(l){return new(l||n)},n.\u0275cmp=f({type:n,selectors:[["mwl-demo-component"]],features:[g([W({provide:T,useFactory:k})])],decls:9,vars:3,consts:[[3,"viewChange","viewDateChange","view","viewDate"],[3,"viewDate","events"]],template:function(l,a){if(l&1&&(v(0,"mwl-demo-utils-calendar-header",0),x("viewChange",function(o){return p(a.view,o)||(a.view=o),o})("viewDateChange",function(o){return p(a.viewDate,o)||(a.viewDate=o),o}),c(),t(1,`

`),v(2,"div"),t(3,`
  `),u(4,H,3,2)(5,N,3,2)(6,P,3,2),t(7,`
`),c(),t(8,`
`)),l&2){let r;y("view",a.view)("viewDate",a.viewDate),m(4),h((r=a.view)==="month"?4:r==="week"?5:r==="day"?6:-1)}},dependencies:[B,F,M,V],encapsulation:2,changeDetection:0});let e=n;return e})();export{G as DemoComponent};
