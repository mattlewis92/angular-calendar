import{a as B}from"./chunk-CFSPUUHB.js";import{D as F}from"./chunk-2HQHCNGL.js";import{Ka as c,Kb as e,Mc as k,Nb as b,Nc as T,Ob as f,Pb as E,Rb as S,Ua as x,Yc as R,ad as L,f as C,gd as M,hd as W,ia as u,ja as D,jb as y,lb as g,pb as p,qb as l,rb as m,sb as v,wb as V,yb as _,zb as w}from"./chunk-ODVXNMMH.js";import"./chunk-RACSJ3AQ.js";function P(n,r){if(n&1){let t=V();e(0,`
  `),l(1,"mwl-calendar-month-view",3),_("beforeViewRender",function(o){u(t);let i=w();return D(i.beforeMonthViewRender(o))}),m(),e(2,`
  `)}if(n&2){let t=w();c(),p("viewDate",t.viewDate)("events",t.events)("refresh",t.refresh)}}function j(n,r){if(n&1&&(e(0,`
  `),v(1,"mwl-calendar-week-view",4),e(2,`
  `)),n&2){let t=w();c(),p("viewDate",t.viewDate)("events",t.events)("refresh",t.refresh)}}function A(n,r){if(n&1&&(e(0,`
  `),v(1,"mwl-calendar-day-view",4),e(2,`
  `)),n&2){let t=w();c(),p("viewDate",t.viewDate)("events",t.events)("refresh",t.refresh)}}var h="red-cell",H="blue-cell",J=(()=>{let r=class r{constructor(){this.view=T.Month,this.viewDate=new Date,this.events=[],this.refresh=new C,this.cssClass=h}refreshView(){this.cssClass=this.cssClass===h?H:h,this.refresh.next()}beforeMonthViewRender({body:d}){d.forEach(o=>{o.date.getDate()%2===1&&(o.cssClass=this.cssClass)})}};r.\u0275fac=function(o){return new(o||r)},r.\u0275cmp=x({type:r,selectors:[["mwl-demo-component"]],features:[S([R({provide:k,useFactory:F})])],decls:15,vars:3,consts:[[3,"viewChange","viewDateChange","view","viewDate"],[1,"text-center"],[1,"btn","btn-primary",3,"click"],[3,"beforeViewRender","viewDate","events","refresh"],[3,"viewDate","events","refresh"]],template:function(o,i){if(o&1&&(l(0,"mwl-demo-utils-calendar-header",0),E("viewChange",function(a){return f(i.view,a)||(i.view=a),a})("viewDateChange",function(a){return f(i.viewDate,a)||(i.viewDate=a),a}),m(),e(1,`

`),l(2,"div",1),e(3,`
  `),l(4,"button",2),_("click",function(){return i.refreshView()}),e(5,`
    Refresh + re-render the current view
  `),m(),e(6,`
`),m(),e(7,`

`),l(8,"div"),e(9,`
  `),y(10,P,3,3)(11,j,3,3)(12,A,3,3),e(13,`
`),m(),e(14,`
`)),o&2){let s;b("view",i.view)("viewDate",i.viewDate),c(10),g((s=i.view)==="month"?10:s==="week"?11:s==="day"?12:-1)}},dependencies:[B,L,M,W],styles:[`.red-cell{background-color:red!important}.blue-cell{background-color:#00f!important}
`],encapsulation:2,changeDetection:0});let n=r;return n})();export{J as DemoComponent};
