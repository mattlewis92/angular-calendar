import{D as ae,d as G,l as J,t as K}from"./chunk-2HQHCNGL.js";import{Gb as x,Hb as L,Ib as A,Ic as E,Ka as w,Kb as t,Lb as M,M as k,Mb as j,Mc as Q,Nb as g,Ob as f,Pb as h,Qc as Z,Rb as R,Rc as $,Sc as ee,U as b,Ua as O,Uc as te,Xb as S,Ya as B,Yc as ie,Z as P,Zb as z,_b as U,bc as X,ca as W,gd as ne,ia as p,ja as v,jb as N,jc as Y,lb as H,pb as u,qb as l,rb as m,sb as _,uc as q,va as F,wb as y,y as C,yb as I,zb as T}from"./chunk-ODVXNMMH.js";import"./chunk-RACSJ3AQ.js";function se(a,e){if(a&1&&(t(0,`
    `),l(1,"div",11),t(2),S(3,"calendarDate"),m(),t(4,`
    `)),a&2){let c=T(),i=c.segment,r=c.locale;w(2),j(`
      `,U(3,1,i.date,"weekViewHour",r),`
    `)}}function le(a,e){if(a&1){let c=y();t(0,`
  `),l(1,"div",10,1),I("mousedown",function(r){let n=p(c).segment,s=x(2),d=T();return v(d.startDragToCreate(n,r,s))}),t(3,`
    `),N(4,se,5,5),m(),t(5,`
`)}if(a&2){let c=e.segment,i=e.segmentHeight,r=e.isTimeLabel;w(),L("height",i,"px"),A("cal-hour-start",c.isStart)("cal-after-hour-start",!c.isStart),u("ngClass",c.cssClass),w(3),H(r?4:-1)}}function me(a,e){return Math.floor(a/e)*e}function de(a,e){return Math.ceil(a/e)*e}var we=(()=>{let e=class e extends E{weekTooltip(i,r){if(!i.meta.tmpEvent)return super.weekTooltip(i,r)}dayTooltip(i,r){if(!i.meta.tmpEvent)return super.dayTooltip(i,r)}};e.\u0275fac=(()=>{let i;return function(n){return(i||(i=F(e)))(n||e)}})(),e.\u0275prov=P({token:e,factory:e.\u0275fac});let a=e;return a})(),xe=(()=>{let e=class e{constructor(){this.viewDate=new Date,this.events=[],this.dragToCreateActive=!1,this.weekStartsOn=0,this.cdr=W(Y)}startDragToCreate(i,r,n){let s={id:this.events.length,title:"New event",start:i.date,meta:{tmpEvent:!0}};this.events=[...this.events,s];let d=n.getBoundingClientRect();this.dragToCreateActive=!0;let o=K(this.viewDate,{weekStartsOn:this.weekStartsOn});C(document,"mousemove").pipe(k(()=>{delete s.meta.tmpEvent,this.dragToCreateActive=!1,this.refresh()}),b(C(document,"mouseup"))).subscribe(V=>{let re=de(V.clientY-d.top,30),oe=me(V.clientX-d.left,d.width)/d.width,D=G(J(i.date,re),oe);D>i.date&&D<o&&(s.end=D),this.refresh()})}refresh(){this.events=[...this.events],this.cdr.detectChanges()}};e.\u0275fac=function(r){return new(r||e)},e.\u0275cmp=O({type:e,selectors:[["mwl-demo-component"]],features:[R([ie({provide:Q,useFactory:ae},{eventTitleFormatter:{provide:E,useClass:we}})])],decls:32,vars:13,consts:[["weekViewHourSegmentTemplate",""],["segmentElement",""],[1,"row"],[1,"col-md-6"],[1,"btn-group"],["mwlCalendarPreviousView","",1,"btn","btn-primary",3,"viewDateChange","view","viewDate"],["mwlCalendarToday","",1,"btn","btn-outline-secondary",3,"viewDateChange","viewDate"],["mwlCalendarNextView","",1,"btn","btn-primary",3,"viewDateChange","view","viewDate"],[1,"col-md-6","text-right"],[3,"viewDate","events","hourSegmentTemplate","weekStartsOn"],[1,"cal-hour-segment",3,"mousedown","ngClass"],[1,"cal-time"]],template:function(r,n){if(r&1){let s=y();l(0,"div",2),t(1,`
  `),l(2,"div",3),t(3,`
    `),l(4,"div",4),t(5,`
      `),l(6,"div",5),h("viewDateChange",function(o){return p(s),f(n.viewDate,o)||(n.viewDate=o),v(o)}),t(7,`
        Previous
      `),m(),t(8,`
      `),l(9,"div",6),h("viewDateChange",function(o){return p(s),f(n.viewDate,o)||(n.viewDate=o),v(o)}),t(10,`
        Today
      `),m(),t(11,`
      `),l(12,"div",7),h("viewDateChange",function(o){return p(s),f(n.viewDate,o)||(n.viewDate=o),v(o)}),t(13,`
        Next
      `),m(),t(14,`
    `),m(),t(15,`
  `),m(),t(16,`
  `),l(17,"div",8),t(18,`
    `),l(19,"h3"),t(20),S(21,"calendarDate"),m(),t(22,`
  `),m(),t(23,`
`),m(),t(24,`
`),_(25,"br"),t(26,`

`),B(27,le,6,8,"ng-template",null,0,X),t(29,`

`),_(30,"mwl-calendar-week-view",9),t(31,`
`)}if(r&2){let s=x(28);w(6),u("view","week"),g("viewDate",n.viewDate),w(3),g("viewDate",n.viewDate),w(3),u("view","week"),g("viewDate",n.viewDate),w(8),M(z(21,10,n.viewDate,"weekViewTitle")),w(10),u("viewDate",n.viewDate)("events",n.events)("hourSegmentTemplate",s)("weekStartsOn",n.weekStartsOn)}},dependencies:[Z,ee,$,q,ne,te],styles:[`.disable-hover{pointer-events:none}
`],encapsulation:2,changeDetection:0});let a=e;return a})();export{we as CustomEventTitleFormatter,xe as DemoComponent};
