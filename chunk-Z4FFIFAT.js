import{a as T}from"./chunk-ECISVBUJ.js";import{a as E}from"./chunk-CFSPUUHB.js";import{b as Y}from"./chunk-4RHQDWD6.js";import{D as W,e as S}from"./chunk-2HQHCNGL.js";import{Ka as s,Kb as i,Mc as k,Nb as _,Nc as F,Ob as h,Pb as y,Rb as x,Ua as f,Yc as b,ad as H,ca as w,gd as M,hd as O,jb as D,jc as g,lb as u,pb as d,qb as v,rb as C,sb as c,zb as p}from"./chunk-ODVXNMMH.js";import"./chunk-RACSJ3AQ.js";function V(e,t,n){return S(e,t*12,n)}function A(e,t,n){return V(e,-t,n)}function I(e,t){if(e&1&&(i(0,`
  `),c(1,"mwl-calendar-month-view",1),i(2,`
  `)),e&2){let n=p();s(),d("viewDate",n.viewDate)("events",n.events)}}function P(e,t){if(e&1&&(i(0,`
  `),c(1,"mwl-calendar-week-view",1),i(2,`
  `)),e&2){let n=p();s(),d("viewDate",n.viewDate)("events",n.events)}}function B(e,t){if(e&1&&(i(0,`
  `),c(1,"mwl-calendar-day-view",1),i(2,`
  `)),e&2){let n=p();s(),d("viewDate",n.viewDate)("events",n.events)}}var L="8eb2582d-3a4c-4fc5-94c8-3e21487d4e23",R="US",te=(()=>{let t=class t{constructor(){this.view=F.Month,this.viewDate=T(A(new Date,1)),this.events=[],this.http=w(Y),this.cdr=w(g)}ngOnInit(){this.fetchHolidays()}fetchHolidays(){this.http.get("https://holidayapi.com/v1/holidays",{params:{country:R,year:String(new Date().getFullYear()-1),key:L}}).subscribe(({holidays:l})=>{this.events=l.map(a=>({start:new Date(a.date),title:a.name,allDay:!0,meta:{type:"holiday",holiday:a}})),this.cdr.markForCheck()})}};t.\u0275fac=function(a){return new(a||t)},t.\u0275cmp=f({type:t,selectors:[["mwl-demo-component"]],features:[x([b({provide:k,useFactory:W})])],decls:9,vars:3,consts:[[3,"viewChange","viewDateChange","view","viewDate"],[3,"viewDate","events"]],template:function(a,o){if(a&1&&(v(0,"mwl-demo-utils-calendar-header",0),y("viewChange",function(r){return h(o.view,r)||(o.view=r),r})("viewDateChange",function(r){return h(o.viewDate,r)||(o.viewDate=r),r}),C(),i(1,`

`),v(2,"div"),i(3,`
  `),D(4,I,3,2)(5,P,3,2)(6,B,3,2),i(7,`
`),C(),i(8,`
`)),a&2){let m;_("view",o.view)("viewDate",o.viewDate),s(4),u((m=o.view)==="month"?4:m==="week"?5:m==="day"?6:-1)}},dependencies:[E,H,M,O],encapsulation:2,changeDetection:0});let e=t;return e})();export{te as DemoComponent};
