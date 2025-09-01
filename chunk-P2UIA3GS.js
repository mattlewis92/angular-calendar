import{a as L}from"./chunk-RVDWITUA.js";import{a as A}from"./chunk-XJHUD62E.js";import{a as k}from"./chunk-CFSPUUHB.js";import{Ka as r,Kb as e,Mc as x,Nb as f,Nc as g,Ob as C,Oc as F,Pb as h,Rb as y,Tc as M,Ua as u,Wc as S,Xc as T,Yc as E,ad as W,gd as b,hd as V,jb as D,lb as _,pb as l,qb as s,rb as w,sb as v,zb as p}from"./chunk-ODVXNMMH.js";import{g as B}from"./chunk-RACSJ3AQ.js";var c=B(L());function N(t,n){if(t&1&&(e(0,`
  `),v(1,"mwl-calendar-month-view",2),e(2,`
  `)),t&2){let i=p();r(),l("viewDate",i.viewDate)("events",i.events)}}function P(t,n){if(t&1&&(e(0,`
  `),v(1,"mwl-calendar-week-view",2),e(2,`
  `)),t&2){let i=p();r(),l("viewDate",i.viewDate)("events",i.events)}}function Y(t,n){if(t&1&&(e(0,`
  `),v(1,"mwl-calendar-day-view",2),e(2,`
  `)),t&2){let i=p();r(),l("viewDate",i.viewDate)("events",i.events)}}c.default.updateLocale("en",{week:{dow:F.MONDAY,doy:0}});var U=(()=>{let n=class n{constructor(){this.view=g.Month,this.viewDate=new Date,this.events=[]}};n.\u0275fac=function(d){return new(d||n)},n.\u0275cmp=u({type:n,selectors:[["mwl-demo-component"]],features:[y([E({provide:x,useFactory:()=>A(c.default)},{dateFormatter:{provide:M,useClass:T}}),{provide:S,useValue:c.default}])],decls:12,vars:3,consts:[[1,"alert","alert-info"],[3,"viewChange","viewDateChange","view","viewDate"],[3,"viewDate","events"]],template:function(d,a){if(d&1&&(s(0,"div",0),e(1,`
  Use this if you're already using moment heavily in your app and don't want to
  include date-fns in your bundle, or you need to be able to adjust dates to be
  in a different timezone than the users browser via moment-locale
`),w(),e(2,`

`),s(3,"mwl-demo-utils-calendar-header",1),h("viewChange",function(o){return C(a.view,o)||(a.view=o),o})("viewDateChange",function(o){return C(a.viewDate,o)||(a.viewDate=o),o}),w(),e(4,`

`),s(5,"div"),e(6,`
  `),D(7,N,3,2)(8,P,3,2)(9,Y,3,2),e(10,`
`),w(),e(11,`
`)),d&2){let m;r(3),f("view",a.view)("viewDate",a.viewDate),r(4),_((m=a.view)==="month"?7:m==="week"?8:m==="day"?9:-1)}},dependencies:[k,W,b,V],encapsulation:2,changeDetection:0});let t=n;return t})();export{U as DemoComponent};
