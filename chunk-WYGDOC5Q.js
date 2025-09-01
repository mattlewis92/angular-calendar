import{a as w}from"./chunk-SIVC2SE7.js";import{a as F}from"./chunk-CFSPUUHB.js";import{D as W}from"./chunk-2HQHCNGL.js";import{Ka as m,Kb as t,Mc as g,Nb as u,Nc as b,Ob as C,Pb as y,Rb as x,Ua as f,Yc as T,ad as k,gd as E,hd as S,jb as _,lb as h,pb as c,qb as p,rb as D,sb as d,zb as v}from"./chunk-ODVXNMMH.js";import"./chunk-RACSJ3AQ.js";function M(e,n){if(e&1&&(t(0,`
  `),d(1,"mwl-calendar-month-view",1),t(2,`
  `)),e&2){let i=v();m(),c("viewDate",i.viewDate)("events",i.events)("activeDayIsOpen",!0)}}function V(e,n){if(e&1&&(t(0,`
  `),d(1,"mwl-calendar-week-view",2),t(2,`
  `)),e&2){let i=v();m(),c("viewDate",i.viewDate)("events",i.events)}}function B(e,n){if(e&1&&(t(0,`
  `),d(1,"mwl-calendar-day-view",2),t(2,`
  `)),e&2){let i=v();m(),c("viewDate",i.viewDate)("events",i.events)}}var L=(()=>{let n=class n{constructor(){this.view=b.Month,this.viewDate=new Date,this.events=[{title:"Editable event",color:w.yellow,start:new Date,actions:[{label:'<i class="fas fa-fw fa-pencil-alt"></i>',onClick:({event:l})=>{console.log("Edit event",l)}}]},{title:"Deletable event",color:w.blue,start:new Date,actions:[{label:'<i class="fas fa-fw fa-trash-alt"></i>',onClick:({event:l})=>{this.events=this.events.filter(r=>r!==l),console.log("Event deleted",l)}}]},{title:"Non editable and deletable event",color:w.red,start:new Date}]}};n.\u0275fac=function(r){return new(r||n)},n.\u0275cmp=f({type:n,selectors:[["mwl-demo-component"]],features:[x([T({provide:g,useFactory:W})])],decls:9,vars:3,consts:[[3,"viewChange","viewDateChange","view","viewDate"],[3,"viewDate","events","activeDayIsOpen"],[3,"viewDate","events"]],template:function(r,a){if(r&1&&(p(0,"mwl-demo-utils-calendar-header",0),y("viewChange",function(o){return C(a.view,o)||(a.view=o),o})("viewDateChange",function(o){return C(a.viewDate,o)||(a.viewDate=o),o}),D(),t(1,`

`),p(2,"div"),t(3,`
  `),_(4,M,3,3)(5,V,3,2)(6,B,3,2),t(7,`
`),D(),t(8,`
`)),r&2){let s;u("view",a.view)("viewDate",a.viewDate),m(4),h((s=a.view)==="month"?4:s==="week"?5:s==="day"?6:-1)}},dependencies:[F,k,E,S],encapsulation:2,changeDetection:0});let e=n;return e})();export{L as DemoComponent};
