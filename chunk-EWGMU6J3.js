import{a as B}from"./chunk-SIVC2SE7.js";import{a as O}from"./chunk-CFSPUUHB.js";import{D as I}from"./chunk-2HQHCNGL.js";import{Ka as w,Kb as i,Mb as y,Mc as S,Nb as g,Nc as E,Ob as x,Pb as R,Rb as b,Ua as V,Yc as W,ad as k,ca as h,gd as F,hd as M,ia as _,ja as v,jb as D,jc as T,lb as u,pb as p,qb as d,rb as m,wb as C,yb as f,zb as a}from"./chunk-ODVXNMMH.js";import"./chunk-RACSJ3AQ.js";function P(t,o){if(t&1&&(i(0,`
`),d(1,"div",1),i(2),m(),i(3,`
`)),t&2){let e=a();w(2),y("There are no events on this ",e.view)}}function j(t,o){if(t&1){let e=C();i(0,`
  `),d(1,"mwl-calendar-month-view",2),f("beforeViewRender",function(r){_(e);let n=a();return v(n.beforeViewRender(r))}),m(),i(2,`
  `)}if(t&2){let e=a();w(),p("viewDate",e.viewDate)("events",e.events)("activeDayIsOpen",!0)}}function A(t,o){if(t&1){let e=C();i(0,`
  `),d(1,"mwl-calendar-week-view",3),f("beforeViewRender",function(r){_(e);let n=a();return v(n.beforeViewRender(r))}),m(),i(2,`
  `)}if(t&2){let e=a();w(),p("viewDate",e.viewDate)("events",e.events)}}function H(t,o){if(t&1){let e=C();i(0,`
  `),d(1,"mwl-calendar-day-view",3),f("beforeViewRender",function(r){_(e);let n=a();return v(n.beforeViewRender(r))}),m(),i(2,`
  `)}if(t&2){let e=a();w(),p("viewDate",e.viewDate)("events",e.events)}}var U=(()=>{let o=class o{constructor(){this.view=E.Month,this.viewDate=new Date,this.events=[{title:"Event 1",color:B.yellow,start:new Date}],this.cdr=h(T)}beforeViewRender(s){this.period=s.period,this.cdr.detectChanges()}};o.\u0275fac=function(r){return new(r||o)},o.\u0275cmp=V({type:o,selectors:[["mwl-demo-component"]],features:[b([W({provide:S,useFactory:I})])],decls:10,vars:4,consts:[[3,"viewChange","viewDateChange","view","viewDate"],[1,"alert","alert-warning"],[3,"beforeViewRender","viewDate","events","activeDayIsOpen"],[3,"beforeViewRender","viewDate","events"]],template:function(r,n){if(r&1&&(d(0,"mwl-demo-utils-calendar-header",0),R("viewChange",function(l){return x(n.view,l)||(n.view=l),l})("viewDateChange",function(l){return x(n.viewDate,l)||(n.viewDate=l),l}),m(),i(1,`

`),D(2,P,4,1),d(3,"div"),i(4,`
  `),D(5,j,3,3)(6,A,3,2)(7,H,3,2),i(8,`
`),m(),i(9,`
`)),r&2){let c;g("view",n.view)("viewDate",n.viewDate),w(2),u((n.period==null?null:n.period.events.length)===0?2:-1),w(3),u((c=n.view)==="month"?5:c==="week"?6:c==="day"?7:-1)}},dependencies:[O,k,F,M],encapsulation:2,changeDetection:0});let t=o;return t})();export{U as DemoComponent};
