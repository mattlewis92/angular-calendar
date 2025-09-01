import{a as R}from"./chunk-CFSPUUHB.js";import{D as N}from"./chunk-2HQHCNGL.js";import{Gb as T,Ka as a,Kb as e,Lb as D,Mb as S,Mc as k,Nb as V,Nc as B,Ob as h,Pb as E,Rb as b,Ua as f,Uc as I,Xb as F,Ya as y,Yc as P,_b as W,ad as A,bc as M,gd as H,hd as L,ia as _,ja as C,jb as x,lb as u,pb as w,qb as o,rb as l,sb as v,wb as g,zb as p}from"./chunk-ODVXNMMH.js";import"./chunk-RACSJ3AQ.js";function q(t,i){if(t&1&&(e(0,`
    `),o(1,"span",7),e(2),l(),e(3,`
    `)),t&2){let n=p().day;a(2),D(n.badgeTotal)}}function z(t,i){if(t&1&&(e(0,`
  `),o(1,"div",4),e(2,`
    `),x(3,q,4,1),o(4,"span",5),e(5),F(6,"calendarDate"),l(),e(7,`
  `),l(),e(8,`
  `),o(9,"small",6),e(10),l(),e(11,`
`)),t&2){let n=i.day,c=i.locale;a(3),u(n.badgeTotal>0?3:-1),a(2),D(W(6,3,n.date,"monthViewDayNumber",c)),a(5),S("There are ",n.events.length," events on this day")}}function G(t,i){if(t&1&&(e(0,`
  `),v(1,"mwl-calendar-month-view",8),e(2,`
  `)),t&2){let n=p(),c=T(9);a(),w("viewDate",n.viewDate)("events",n.events)("cellTemplate",c)}}function J(t,i){if(t&1&&(e(0,`
  `),v(1,"mwl-calendar-week-view",9),e(2,`
  `)),t&2){let n=p();a(),w("viewDate",n.viewDate)("events",n.events)}}function K(t,i){if(t&1&&(e(0,`
  `),v(1,"mwl-calendar-day-view",9),e(2,`
  `)),t&2){let n=p();a(),w("viewDate",n.viewDate)("events",n.events)}}var Y=(()=>{let i=class i{constructor(){this.view=B.Month,this.viewDate=new Date,this.events=[]}};i.\u0275fac=function(s){return new(s||i)},i.\u0275cmp=f({type:i,selectors:[["mwl-demo-component"]],features:[b([P({provide:k,useFactory:N})])],decls:18,vars:3,consts:[["customCellTemplate",""],[3,"viewChange","viewDateChange","view","viewDate"],[1,"alert","alert-info"],["href","https://github.com/mattlewis92/angular-calendar#how-do-i-use-a-custom-template"],[1,"cal-cell-top"],[1,"cal-day-number"],[2,"margin","5px"],[1,"cal-day-badge"],[3,"viewDate","events","cellTemplate"],[3,"viewDate","events"]],template:function(s,r){if(s&1){let d=g();o(0,"mwl-demo-utils-calendar-header",1),E("viewChange",function(m){return _(d),h(r.view,m)||(r.view=m),C(m)})("viewDateChange",function(m){return _(d),h(r.viewDate,m)||(r.viewDate=m),C(m)}),l(),e(1,`

`),o(2,"div",2),e(3,`
  For details on how to customise any of the templates, please see
  `),o(4,"a",3),e(5,"this guide"),l(),e(6,`
`),l(),e(7,`

`),y(8,z,12,7,"ng-template",null,0,M),e(10,`

`),o(11,"div"),e(12,`
  `),x(13,G,3,3)(14,J,3,2)(15,K,3,2),e(16,`
`),l(),e(17,`
`)}if(s&2){let d;V("view",r.view)("viewDate",r.viewDate),a(13),u((d=r.view)==="month"?13:d==="week"?14:d==="day"?15:-1)}},dependencies:[R,A,H,L,I],encapsulation:2,changeDetection:0});let t=i;return t})();export{Y as DemoComponent};
