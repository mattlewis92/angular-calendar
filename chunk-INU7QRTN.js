import{b as E,d as P,e as V,f as F}from"./chunk-763GFVYG.js";import{D as N,v as g}from"./chunk-2HQHCNGL.js";import{Gb as x,Hb as v,Ka as o,Kb as e,Mc as W,Nb as D,Ob as b,Pb as T,Rb as S,Ua as h,Ya as w,Yc as O,bc as H,gd as A,ia as f,ja as k,jb as M,lb as y,pb as C,qb as a,rb as m,sb as p,wb as _,zb as u}from"./chunk-ODVXNMMH.js";import"./chunk-RACSJ3AQ.js";function z(t,n){if(t&1&&(e(0,`
  `),p(1,"div",5),e(2,`
  `)),t&2){let d=u().topPx;o(),v("top",d,"px")}}function B(t,n){if(t&1&&(e(0,`
  `),M(1,z,3,2)),t&2){let d=n.isVisible,c=u();o(),y(d&&c.showMarker?1:-1)}}var K=(()=>{let n=class n{constructor(){this.viewDate=new Date,this.showMarker=!0,this.dayStartHour=Math.max(0,g(new Date)-2),this.dayEndHour=Math.min(23,g(new Date)+2)}};n.\u0275fac=function(i){return new(i||n)},n.\u0275cmp=h({type:n,selectors:[["mwl-demo-component"]],features:[S([O({provide:W,useFactory:N})])],decls:13,vars:5,consts:[["currentTimeMarkerTemplate",""],[1,"form-group","form-check"],["type","checkbox","id","showMarker",1,"form-check-input",3,"ngModelChange","ngModel"],["for","showMarker",1,"form-check-label"],[3,"viewDate","currentTimeMarkerTemplate","dayStartHour","dayEndHour"],[1,"cal-current-time-marker"]],template:function(i,r){if(i&1){let l=_();w(0,B,2,1,"ng-template",null,0,H),e(2,`

`),a(3,"div",1),e(4,`
  `),a(5,"input",2),T("ngModelChange",function(s){return f(l),b(r.showMarker,s)||(r.showMarker=s),k(s)}),m(),e(6,`
  `),a(7,"label",3),e(8,"Show marker"),m(),e(9,`
`),m(),e(10,`

`),p(11,"mwl-calendar-week-view",4),e(12,`
`)}if(i&2){let l=x(1);o(5),D("ngModel",r.showMarker),o(6),C("viewDate",r.viewDate)("currentTimeMarkerTemplate",l)("dayStartHour",r.dayStartHour)("dayEndHour",r.dayEndHour)}},dependencies:[F,E,P,V,A],styles:[".cal-current-time-marker[_ngcontent-%COMP%]{height:3px;background:linear-gradient(270deg,#ec268d,#1f55dd);background-size:400% 400%;animation:_ngcontent-%COMP%_background-fade 5s ease infinite}@keyframes _ngcontent-%COMP%_background-fade{0%{background-position:0 50%}50%{background-position:100% 50%}to{background-position:0 50%}}"],changeDetection:0});let t=n;return t})();export{K as DemoComponent};
