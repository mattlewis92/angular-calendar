import{B as _,C as F,D as J,d as S,e as D,h as T,j as O,n as M,q as P,r as B,s as W,t as I,y as R}from"./chunk-2HQHCNGL.js";import{Ib as p,Ka as d,Kb as e,Lb as k,Mc as A,Nc as N,Rb as V,Ua as x,Uc as j,Xb as g,Yc as q,_b as E,ad as z,gd as G,hd as H,ia as u,ja as f,jb as b,lb as C,pb as v,qb as a,rb as o,sb as w,wb as y,yb as m,zb as h}from"./chunk-ODVXNMMH.js";import"./chunk-RACSJ3AQ.js";function Q(t,i){if(t&1){let r=y();e(0,`
  `),a(1,"mwl-calendar-month-view",6),m("beforeViewRender",function(l){u(r);let n=h();return f(n.beforeMonthViewRender(l))}),o(),e(2,`
  `)}if(t&2){let r=h();d(),v("viewDate",r.viewDate)("events",r.events)}}function U(t,i){if(t&1&&(e(0,`
  `),w(1,"mwl-calendar-week-view",7),e(2,`
  `)),t&2){let r=h();d(),v("viewDate",r.viewDate)("events",r.events)}}function X(t,i){if(t&1&&(e(0,`
  `),w(1,"mwl-calendar-day-view",7),e(2,`
  `)),t&2){let r=h();d(),v("viewDate",r.viewDate)("events",r.events)}}function K(t,i,r){return{day:S,week:M,month:D}[t](i,r)}function L(t,i,r){return{day:R,week:F,month:_}[t](i,r)}function Y(t,i){return{day:O,week:T,month:W}[t](i)}function Z(t,i){return{day:P,week:I,month:B}[t](i)}var ne=(()=>{let i=class i{constructor(){this.view=N.Month,this.viewDate=new Date,this.events=[],this.minDate=_(new Date,1),this.maxDate=D(new Date,1),this.prevBtnDisabled=!1,this.nextBtnDisabled=!1,this.dateOrViewChanged()}increment(){this.changeDate(K(this.view,this.viewDate,1))}decrement(){this.changeDate(L(this.view,this.viewDate,1))}today(){this.changeDate(new Date)}dateIsValid(s){return s>=this.minDate&&s<=this.maxDate}changeDate(s){this.viewDate=s,this.dateOrViewChanged()}changeView(s){this.view=s,this.dateOrViewChanged()}dateOrViewChanged(){this.prevBtnDisabled=!this.dateIsValid(Z(this.view,L(this.view,this.viewDate,1))),this.nextBtnDisabled=!this.dateIsValid(Y(this.view,K(this.view,this.viewDate,1))),this.viewDate<this.minDate?this.changeDate(this.minDate):this.viewDate>this.maxDate&&this.changeDate(this.maxDate)}beforeMonthViewRender({body:s}){s.forEach(l=>{this.dateIsValid(l.date)||(l.cssClass="cal-disabled")})}};i.\u0275fac=function(l){return new(l||i)},i.\u0275cmp=x({type:i,selectors:[["mwl-demo-component"]],features:[V([q({provide:A,useFactory:J})])],decls:49,vars:14,consts:[[1,"row","text-center"],[1,"col-md-4"],[1,"btn-group"],[1,"btn","btn-primary",3,"click","disabled"],[1,"btn","btn-outline-secondary",3,"click"],[1,"btn","btn-primary",3,"click"],[3,"beforeViewRender","viewDate","events"],[3,"viewDate","events"]],template:function(l,n){if(l&1&&(a(0,"div",0),e(1,`
  `),a(2,"div",1),e(3,`
    `),a(4,"div",2),e(5,`
      `),a(6,"button",3),m("click",function(){return n.decrement()}),e(7,`
        Previous
      `),o(),e(8,`
      `),a(9,"button",4),m("click",function(){return n.today()}),e(10,"Today"),o(),e(11,`
      `),a(12,"button",3),m("click",function(){return n.increment()}),e(13,`
        Next
      `),o(),e(14,`
    `),o(),e(15,`
  `),o(),e(16,`
  `),a(17,"div",1),e(18,`
    `),a(19,"h3"),e(20),g(21,"calendarDate"),o(),e(22,`
  `),o(),e(23,`
  `),a(24,"div",1),e(25,`
    `),a(26,"div",2),e(27,`
      `),a(28,"div",5),m("click",function(){return n.changeView("month")}),e(29,`
        Month
      `),o(),e(30,`
      `),a(31,"div",5),m("click",function(){return n.changeView("week")}),e(32,`
        Week
      `),o(),e(33,`
      `),a(34,"div",5),m("click",function(){return n.changeView("day")}),e(35,`
        Day
      `),o(),e(36,`
    `),o(),e(37,`
  `),o(),e(38,`
`),o(),e(39,`
`),w(40,"br"),e(41,`

`),a(42,"div"),e(43,`
  `),b(44,Q,3,2)(45,U,3,2)(46,X,3,2),e(47,`
`),o(),e(48,`
`)),l&2){let c;d(6),v("disabled",n.prevBtnDisabled),d(6),v("disabled",n.nextBtnDisabled),d(8),k(E(21,10,n.viewDate,n.view+"ViewTitle","en")),d(8),p("active",n.view==="month"),d(3),p("active",n.view==="week"),d(3),p("active",n.view==="day"),d(10),C((c=n.view)==="month"?44:c==="week"?45:c==="day"?46:-1)}},dependencies:[z,G,H,j],styles:[`.cal-disabled{background-color:#eee;pointer-events:none}.cal-disabled .cal-day-number{opacity:.1}
`],encapsulation:2,changeDetection:0});let t=i;return t})();export{ne as DemoComponent};
