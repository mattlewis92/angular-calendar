import{a as F}from"./chunk-SIVC2SE7.js";import{a as M}from"./chunk-CFSPUUHB.js";import{D as W}from"./chunk-2HQHCNGL.js";import{Ka as s,Kb as t,Mc as h,Nb as f,Nc as x,Ob as p,Pb as u,Rb as y,Ua as C,Yc as g,ad as T,gd as S,hd as V,jb as D,lb as _,pb as l,qb as v,rb as d,sb as c,zb as w}from"./chunk-ODVXNMMH.js";import"./chunk-RACSJ3AQ.js";function E(e,n){if(e&1&&(t(0,`
  `),c(1,"mwl-calendar-month-view",1),t(2,`
  `)),e&2){let i=w();s(),l("viewDate",i.viewDate)("events",i.events)("activeDayIsOpen",!0)}}function B(e,n){if(e&1&&(t(0,`
  `),c(1,"mwl-calendar-week-view",2),t(2,`
  `)),e&2){let i=w();s(),l("viewDate",i.viewDate)("events",i.events)}}function H(e,n){if(e&1&&(t(0,`
  `),c(1,"mwl-calendar-day-view",2),t(2,`
  `)),e&2){let i=w();s(),l("viewDate",i.viewDate)("events",i.events)}}var b=(()=>{let n=class n{constructor(){this.view=x.Month,this.viewDate=new Date,this.events=[{title:"Has custom class",color:F.yellow,start:new Date,cssClass:"my-custom-class"}]}};n.\u0275fac=function(m){return new(m||n)},n.\u0275cmp=C({type:n,selectors:[["mwl-demo-component"]],features:[y([g({provide:h,useFactory:W})])],decls:9,vars:3,consts:[[3,"viewChange","viewDateChange","view","viewDate"],[3,"viewDate","events","activeDayIsOpen"],[3,"viewDate","events"]],template:function(m,a){if(m&1&&(v(0,"mwl-demo-utils-calendar-header",0),u("viewChange",function(o){return p(a.view,o)||(a.view=o),o})("viewDateChange",function(o){return p(a.viewDate,o)||(a.viewDate=o),o}),d(),t(1,`

`),v(2,"div"),t(3,`
  `),D(4,E,3,3)(5,B,3,2)(6,H,3,2),t(7,`
`),d(),t(8,`
`)),m&2){let r;f("view",a.view)("viewDate",a.viewDate),s(4),_((r=a.view)==="month"?4:r==="week"?5:r==="day"?6:-1)}},dependencies:[M,T,S,V],styles:[`.my-custom-class span{color:#ff3d7f!important}
`],encapsulation:2,changeDetection:0});let e=n;return e})();export{b as DemoComponent};
