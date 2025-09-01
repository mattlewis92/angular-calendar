import{a as u}from"./chunk-SIVC2SE7.js";import{a as ae}from"./chunk-CFSPUUHB.js";import{j as z}from"./chunk-QNBMA7NB.js";import"./chunk-763GFVYG.js";import{D as oe,j as w,w as O}from"./chunk-2HQHCNGL.js";import{Gb as x,Gc as J,Hc as K,Jb as A,Jc as Q,Ka as p,Kb as t,Kc as U,Lb as P,Lc as X,Mb as W,Mc as Y,Nb as N,Nc as Z,Ob as M,Pb as G,Qb as j,Rb as H,Ua as F,Uc as $,Vb as L,Xb as B,Ya as f,Yc as ee,_b as I,ad as te,bc as T,gd as ne,hd as ie,ia as C,ja as g,jb as y,lb as D,mb as S,nb as b,ob as V,pb as s,qb as m,rb as c,sb as _,vc as q,wb as E,yb as k,zb as v}from"./chunk-ODVXNMMH.js";import"./chunk-RACSJ3AQ.js";function R(n,i){return+O(n)==+O(i)}var le=(n,i,e)=>({color:n,backgroundColor:i,borderColor:e});function re(n,i){if(n&1&&(t(0,`
    `),m(1,"span",7),t(2),c(),t(3,`
    `)),n&2){let e=v().day;p(2),P(e.badgeTotal)}}function pe(n,i){if(n&1&&(t(0,`
    `),m(1,"span"),t(2),c(),t(3,`
    `)),n&2){let e=i.$implicit;p(),A(j("badge text-bg-",e[0])),p(),W(" ",e[1].length," ")}}function me(n,i){if(n&1&&(t(0,`
  `),m(1,"div",4),t(2,`
    `),y(3,re,4,1),m(4,"span",5),t(5),B(6,"calendarDate"),c(),t(7,`
  `),c(),t(8,`
  `),m(9,"div",6),t(10,`
    `),b(11,pe,4,4,null,null,S),c(),t(13,`
`)),n&2){let e=i.day,r=i.locale;p(3),D(e.badgeTotal>0?3:-1),p(2),P(I(6,2,e.date,"monthViewDayNumber",r)),p(6),V(e.eventGroups)}}function ce(n,i){if(n&1&&(t(0,`
      `),m(1,"div"),t(2,`
        `),_(3,"mwl-calendar-event-actions",11),t(4,`
         
        `),_(5,"mwl-calendar-event-title",9),t(6,`
      `),c(),t(7,`
      `)),n&2){let e=i.$implicit;p(3),s("event",e),p(2),s("event",e)}}function de(n,i){if(n&1&&(t(0,`
    `),m(1,"div",10),t(2,`
      `),b(3,ce,8,2,null,null,S),c(),t(5,`
  `)),n&2){let e=v().weekEvent;p(3),V(e.event.meta.groupedEvents)}}function se(n,i){if(n&1&&(t(0,`

    `),_(1,"mwl-calendar-event-actions",11),t(2,`
      `)),n&2){let e=v().weekEvent;p(),s("event",e.event)}}function ve(n,i){if(n&1){let e=E();t(0,`
  `),f(1,de,6,0,"ng-template",null,2,T),t(3,`

  `),m(4,"div",8),B(5,"calendarEventTitle"),k("mwlClick",function(){let o=C(e).eventClicked;return g(o.emit())}),t(6,`
    `),y(7,se,3,1),_(8,"mwl-calendar-event-title",9),t(9,`
  `),c(),t(10,`
`)}if(n&2){let e=i.weekEvent,r=i.tooltipPlacement,o=i.tooltipTemplate,l=i.tooltipAppendToBody,a=i.tooltipDisabled,h=i.tooltipDelay,d=x(2);p(4),s("ngbPopover",d)("disablePopover",!e.event.meta.groupedEvents)("ngStyle",L(15,le,e.event.color==null?null:e.event.color.secondaryText,e.event.color==null?null:e.event.color.secondary,e.event.color==null?null:e.event.color.primary))("mwlCalendarTooltip",!a&&!e.event.meta.groupedEvents?I(5,11,e.event.title,"weekTooltip",e.event):"")("tooltipPlacement",r)("tooltipEvent",e.event)("tooltipTemplate",o)("tooltipAppendToBody",l)("tooltipDelay",h),p(3),D(e.event.meta.groupedEvents?-1:7),p(),s("event",e.event)}}function _e(n,i){if(n&1){let e=E();t(0,`
  `),m(1,"mwl-calendar-month-view",12),k("beforeViewRender",function(o){C(e);let l=v();return g(l.beforeMonthViewRender(o))}),c(),t(2,`
  `)}if(n&2){let e=v(),r=x(3);p(),s("viewDate",e.viewDate)("events",e.events)("cellTemplate",r)("activeDayIsOpen",!0)}}function we(n,i){if(n&1&&(t(0,`
  `),_(1,"mwl-calendar-week-view",13),t(2,`
  `)),n&2){let e=v(),r=x(6);p(),s("viewDate",e.viewDate)("events",e.groupedSimilarEvents)("eventTemplate",r)}}function ue(n,i){if(n&1&&(t(0,`
  `),_(1,"mwl-calendar-day-view",13),t(2,`
  `)),n&2){let e=v(),r=x(6);p(),s("viewDate",e.viewDate)("events",e.groupedSimilarEvents)("eventTemplate",r)}}var be=(()=>{let i=class i{constructor(){this.view=Z.Month,this.viewDate=new Date,this.events=[{title:"Event 1",color:u.yellow,start:w(new Date),meta:{type:"warning"}},{title:"Event 2",color:u.yellow,start:w(new Date),meta:{type:"warning"}},{title:"Event 3",color:u.blue,start:w(new Date),meta:{type:"info"}},{title:"Event 4",color:u.red,start:w(new Date),meta:{type:"danger"}},{title:"Event 5",color:u.red,start:w(new Date),meta:{type:"danger"}}],this.groupedSimilarEvents=[]}ngOnInit(){this.groupedSimilarEvents=[];let r=new Set;this.events.forEach(o=>{if(r.has(o))return;let l=this.events.filter(a=>a!==o&&!r.has(a)&&R(a.start,o.start)&&(R(a.end,o.end)||!a.end&&!o.end)&&a.color.primary===o.color.primary&&a.color.secondary===o.color.secondary);r.add(o),l.forEach(a=>{r.add(a)}),l.length>0?this.groupedSimilarEvents.push({title:`${l.length+1} events`,color:o.color,start:o.start,end:o.end,meta:{groupedEvents:[o,...l]}}):this.groupedSimilarEvents.push(o)})}beforeMonthViewRender({body:r}){r.forEach(o=>{let l={};o.events.forEach(a=>{l[a.meta.type]=l[a.meta.type]||[],l[a.meta.type].push(a)}),o.eventGroups=Object.entries(l)})}};i.\u0275fac=function(o){return new(o||i)},i.\u0275cmp=F({type:i,selectors:[["mwl-demo-component"]],features:[H([ee({provide:Y,useFactory:oe})])],decls:15,vars:3,consts:[["customCellTemplate",""],["customEventTemplate",""],["groupedEventsTemplate",""],[3,"viewChange","viewDateChange","view","viewDate"],[1,"cal-cell-top"],[1,"cal-day-number"],[1,"cell-totals"],[1,"cal-day-badge"],[1,"cal-event",3,"mwlClick","ngbPopover","disablePopover","ngStyle","mwlCalendarTooltip","tooltipPlacement","tooltipEvent","tooltipTemplate","tooltipAppendToBody","tooltipDelay"],["view","week",3,"event"],[2,"min-width","150px"],[3,"event"],[3,"beforeViewRender","viewDate","events","cellTemplate","activeDayIsOpen"],[3,"viewDate","events","eventTemplate"]],template:function(o,l){if(o&1){let a=E();m(0,"mwl-demo-utils-calendar-header",3),G("viewChange",function(d){return C(a),M(l.view,d)||(l.view=d),g(d)})("viewDateChange",function(d){return C(a),M(l.viewDate,d)||(l.viewDate=d),g(d)}),c(),t(1,`

`),f(2,me,14,6,"ng-template",null,0,T),t(4,`

`),f(5,ve,11,19,"ng-template",null,1,T),t(7,`

`),m(8,"div"),t(9,`
  `),y(10,_e,3,4)(11,we,3,3)(12,ue,3,3),t(13,`
`),c(),t(14,`
`)}if(o&2){let a;N("view",l.view)("viewDate",l.viewDate),p(10),D((a=l.view)==="month"?10:a==="week"?11:a==="day"?12:-1)}},dependencies:[ae,K,U,z,q,X,J,te,ne,ie,$,Q],styles:[".cell-totals[_ngcontent-%COMP%]{margin:5px;text-align:center}.badge[_ngcontent-%COMP%]{margin-right:5px}"],changeDetection:0});let n=i;return n})();export{be as DemoComponent};
