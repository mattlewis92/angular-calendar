import{a as B}from"./chunk-CFSPUUHB.js";import{D as M}from"./chunk-2HQHCNGL.js";import{Ka as d,Kb as e,Mc as V,Nb as k,Nc as f,Ob as y,Pb as S,Rb as T,Ua as u,Yc as E,ad as W,gd as F,hd as H,ia as v,ja as p,jb as C,lb as D,pb as _,qb as r,rb as m,sb as g,wb as x,yb as h,zb as c}from"./chunk-ODVXNMMH.js";import"./chunk-RACSJ3AQ.js";function P(t,n){t&1&&(e(0,`
    `),r(1,"span"),e(2,"Click on a month label to change the view to that month."),m(),e(3,`
    `))}function b(t,n){t&1&&(e(0,`
    `),r(1,"span"),e(2,"Click on a day header to change the view to that day."),m(),e(3,`
    `))}function A(t,n){t&1&&(e(0,`
    `),r(1,"span"),e(2,"There is no other view to navigate to."),m(),e(3,`
    `))}function L(t,n){if(t&1){let i=x();e(0,`
  `),r(1,"mwl-calendar-month-view",2),h("dayClicked",function(l){v(i);let a=c();return p(a.changeDay(l.day.date))}),m(),e(2,`
  `)}if(t&2){let i=c();d(),_("viewDate",i.viewDate)("events",i.events)}}function j(t,n){if(t&1){let i=x();e(0,`
  `),r(1,"mwl-calendar-week-view",3),h("dayHeaderClicked",function(l){v(i);let a=c();return p(a.changeDay(l.day.date))}),m(),e(2,`
  `)}if(t&2){let i=c();d(),_("viewDate",i.viewDate)("events",i.events)}}function q(t,n){if(t&1&&(e(0,`
  `),g(1,"mwl-calendar-day-view",4),e(2,`
  `)),t&2){let i=c();d(),_("viewDate",i.viewDate)("events",i.events)}}var K=(()=>{let n=class n{constructor(){this.view=f.Month,this.viewDate=new Date,this.events=[]}changeDay(w){this.viewDate=w,this.view=f.Day}};n.\u0275fac=function(l){return new(l||n)},n.\u0275cmp=u({type:n,selectors:[["mwl-demo-component"]],features:[T([E({provide:V,useFactory:M})])],decls:19,vars:4,consts:[[3,"viewChange","viewDateChange","view","viewDate"],[1,"alert","alert-info"],[3,"dayClicked","viewDate","events"],[3,"dayHeaderClicked","viewDate","events"],[3,"viewDate","events"]],template:function(l,a){if(l&1&&(r(0,"mwl-demo-utils-calendar-header",0),S("viewChange",function(o){return y(a.view,o)||(a.view=o),o})("viewDateChange",function(o){return y(a.viewDate,o)||(a.viewDate=o),o}),m(),e(1,`

`),r(2,"div",1),e(3,`
  `),r(4,"div"),e(5,`
    `),C(6,P,4,0)(7,b,4,0)(8,A,4,0),e(9,`
  `),m(),e(10,`
`),m(),e(11,`

`),r(12,"div"),e(13,`
  `),C(14,L,3,2)(15,j,3,2)(16,q,3,2),e(17,`
`),m(),e(18,`
`)),l&2){let s,o;k("view",a.view)("viewDate",a.viewDate),d(6),D((s=a.view)==="month"?6:s==="week"?7:s==="day"?8:-1),d(8),D((o=a.view)==="month"?14:o==="week"?15:o==="day"?16:-1)}},dependencies:[B,W,F,H],encapsulation:2,changeDetection:0});let t=n;return t})();export{K as DemoComponent};
