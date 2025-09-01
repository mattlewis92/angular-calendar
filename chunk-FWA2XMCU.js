import{a as L}from"./chunk-CFSPUUHB.js";import{D as q,c as Q,j as E,p as P}from"./chunk-2HQHCNGL.js";import{Db as W,Eb as S,Fb as k,Ka as l,Kb as n,Mc as A,Nb as M,Nc as w,Ob as f,Pb as O,Rb as F,Ua as y,Yc as B,ad as I,ca as D,gd as R,hd as j,ia as m,ja as d,jb as g,jc as H,lb as x,pb as v,qb as _,rb as u,sb as p,wb as V,yb as T,zb as C}from"./chunk-ODVXNMMH.js";import"./chunk-RACSJ3AQ.js";function b(e,t){let i=Q(e,t?.in);return i.setMinutes(0,0,0),i}var z=["scrollContainer"];function G(e,t){if(e&1&&(n(0,`
  `),p(1,"mwl-calendar-month-view",3),n(2,`
  `)),e&2){let i=C();l(),v("viewDate",i.viewDate)("events",i.events)}}function J(e,t){if(e&1&&(n(0,`
  `),p(1,"mwl-calendar-week-view",3),n(2,`
  `)),e&2){let i=C();l(),v("viewDate",i.viewDate)("events",i.events)}}function K(e,t){if(e&1&&(n(0,`
  `),p(1,"mwl-calendar-day-view",3),n(2,`
  `)),e&2){let i=C();l(),v("viewDate",i.viewDate)("events",i.events)}}var ae=(()=>{let t=class t{constructor(){this.view=w.Week,this.viewDate=new Date,this.events=[],this.cdr=D(H)}ngAfterViewInit(){this.scrollToCurrentView()}viewChanged(){this.cdr.detectChanges(),this.scrollToCurrentView()}scrollToCurrentView(){if(this.view===w.Week||w.Day){let c=P(b(new Date),E(new Date)),r=this.view===w.Week?60:0;this.scrollContainer.nativeElement.scrollTop=c+r}}};t.\u0275fac=function(r){return new(r||t)},t.\u0275cmp=y({type:t,selectors:[["mwl-demo-component"]],viewQuery:function(r,o){if(r&1&&W(z,5),r&2){let a;S(a=k())&&(o.scrollContainer=a.first)}},features:[F([B({provide:A,useFactory:q})])],decls:10,vars:3,consts:[["scrollContainer",""],[3,"viewChange","viewDateChange","view","viewDate"],[1,"scroll-container"],[3,"viewDate","events"]],template:function(r,o){if(r&1){let a=V();_(0,"mwl-demo-utils-calendar-header",1),O("viewChange",function(s){return m(a),f(o.view,s)||(o.view=s),d(s)})("viewDateChange",function(s){return m(a),f(o.viewDate,s)||(o.viewDate=s),d(s)}),T("viewChange",function(){return m(a),d(o.viewChanged())}),u(),n(1,`

`),_(2,"div",2,0),n(4,`
  `),g(5,G,3,2)(6,J,3,2)(7,K,3,2),n(8,`
`),u(),n(9,`
`)}if(r&2){let a;M("view",o.view)("viewDate",o.viewDate),l(5),x((a=o.view)==="month"?5:a==="week"?6:a==="day"?7:-1)}},dependencies:[L,I,R,j],styles:[".scroll-container[_ngcontent-%COMP%]{height:calc(100vh - 320px);overflow-y:auto}"],changeDetection:0});let e=t;return e})();export{ae as DemoComponent};
