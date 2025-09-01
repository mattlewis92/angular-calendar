import{D as j}from"./chunk-2HQHCNGL.js";import{$b as V,Dc as B,Ib as u,Ka as d,Kb as e,Mb as k,Mc as N,Nb as C,Nc as h,Ob as y,Oc as S,Pb as f,Qc as W,Rb as E,Rc as b,Sc as A,Tc as _,Ua as F,Uc as H,Xb as T,Yc as I,Z as $,ad as O,gd as L,hd as R,jb as x,lb as P,pb as w,qb as r,rb as o,sb as D,tc as g,va as M,yb as c,zb as p}from"./chunk-ODVXNMMH.js";import"./chunk-RACSJ3AQ.js";function U(i){let a=i,n=Math.floor(Math.abs(i)),m=i.toString().replace(/^[^.]*\.?/,"").length,l=parseInt(i.toString().replace(/^[^e]*(e([-+]?\d+))?/,"$2"))||0;return n===0||n===1?1:l===0&&n!==0&&n%1e6===0&&m===0||!(l>=0&&l<=5)?4:5}var J=["fr",[["AM","PM"],void 0,void 0],void 0,[["D","L","M","M","J","V","S"],["dim.","lun.","mar.","mer.","jeu.","ven.","sam."],["dimanche","lundi","mardi","mercredi","jeudi","vendredi","samedi"],["di","lu","ma","me","je","ve","sa"]],void 0,[["J","F","M","A","M","J","J","A","S","O","N","D"],["janv.","f\xE9vr.","mars","avr.","mai","juin","juil.","ao\xFBt","sept.","oct.","nov.","d\xE9c."],["janvier","f\xE9vrier","mars","avril","mai","juin","juillet","ao\xFBt","septembre","octobre","novembre","d\xE9cembre"]],void 0,[["av. J.-C.","ap. J.-C."],void 0,["avant J\xE9sus-Christ","apr\xE8s J\xE9sus-Christ"]],1,[6,0],["dd/MM/y","d MMM y","d MMMM y","EEEE d MMMM y"],["HH:mm","HH:mm:ss","HH:mm:ss z","HH:mm:ss zzzz"],["{1} {0}","{1}, {0}","{1} '\xE0' {0}",void 0],[",","\u202F",";","%","+","-","E","\xD7","\u2030","\u221E","NaN",":"],["#,##0.###","#,##0\xA0%","#,##0.00\xA0\xA4","#E0"],"EUR","\u20AC","euro",{ARS:["$AR","$"],AUD:["$AU","$"],BEF:["FB"],BMD:["$BM","$"],BND:["$BN","$"],BYN:[void 0,"\u0440."],BZD:["$BZ","$"],CAD:["$CA","$"],CLP:["$CL","$"],CNY:[void 0,"\xA5"],COP:["$CO","$"],CYP:["\xA3CY"],EGP:[void 0,"\xA3E"],FJD:["$FJ","$"],FKP:["\xA3FK","\xA3"],FRF:["F"],GBP:["\xA3GB","\xA3"],GIP:["\xA3GI","\xA3"],HKD:[void 0,"$"],IEP:["\xA3IE"],ILP:["\xA3IL"],ITL:["\u20A4IT"],JPY:[void 0,"\xA5"],KMF:[void 0,"FC"],LBP:["\xA3LB","\xA3L"],MTP:["\xA3MT"],MXN:["$MX","$"],NAD:["$NA","$"],NIO:[void 0,"$C"],NZD:["$NZ","$"],PHP:[void 0,"\u20B1"],RHD:["$RH"],RON:[void 0,"L"],RWF:[void 0,"FR"],SBD:["$SB","$"],SGD:["$SG","$"],SRD:["$SR","$"],TOP:[void 0,"$T"],TTD:["$TT","$"],TWD:[void 0,"NT$"],USD:["$US","$"],UYU:["$UY","$"],WST:["$WS"],XCD:[void 0,"$"],XPF:["FCFP"],ZMW:[void 0,"Kw"]},"ltr",U];var Y=(()=>{let a=class a extends _{dayViewHour({date:m,locale:l}){return g(m,"HH:mm",l)}weekViewHour({date:m,locale:l}){return this.dayViewHour({date:m,locale:l})}};a.\u0275fac=(()=>{let m;return function(t){return(m||(m=M(a)))(t||a)}})(),a.\u0275prov=$({token:a,factory:a.\u0275fac});let i=a;return i})();function K(i,a){if(i&1&&(e(0,`
  `),D(1,"mwl-calendar-month-view",7),e(2,`
  `)),i&2){let n=p();d(),w("viewDate",n.viewDate)("events",n.events)("locale",n.locale)("weekStartsOn",n.weekStartsOn)("weekendDays",n.weekendDays)}}function z(i,a){if(i&1&&(e(0,`
  `),D(1,"mwl-calendar-week-view",7),e(2,`
  `)),i&2){let n=p();d(),w("viewDate",n.viewDate)("events",n.events)("locale",n.locale)("weekStartsOn",n.weekStartsOn)("weekendDays",n.weekendDays)}}function Z(i,a){if(i&1&&(e(0,`
  `),D(1,"mwl-calendar-day-view",8),e(2,`
  `)),i&2){let n=p();d(),w("viewDate",n.viewDate)("events",n.events)("locale",n.locale)}}B(J);var oe=(()=>{let a=class a{constructor(){this.view=h.Month,this.viewDate=new Date,this.events=[],this.locale="fr",this.weekStartsOn=S.MONDAY,this.weekendDays=[S.FRIDAY,S.SATURDAY],this.CalendarView=h}setView(m){this.view=m}};a.\u0275fac=function(l){return new(l||a)},a.\u0275cmp=F({type:a,selectors:[["mwl-demo-component"]],features:[E([I({provide:N,useFactory:j},{dateFormatter:{provide:_,useClass:Y}})])],decls:49,vars:18,consts:[[1,"row","text-center"],[1,"col-md-4"],[1,"btn-group"],["mwlCalendarPreviousView","",1,"btn","btn-primary",3,"viewDateChange","view","viewDate"],["mwlCalendarToday","",1,"btn","btn-outline-secondary",3,"viewDateChange","viewDate"],["mwlCalendarNextView","",1,"btn","btn-primary",3,"viewDateChange","view","viewDate"],[1,"btn","btn-primary",3,"click"],[3,"viewDate","events","locale","weekStartsOn","weekendDays"],[3,"viewDate","events","locale"]],template:function(l,t){if(l&1&&(r(0,"div",0),e(1,`
  `),r(2,"div",1),e(3,`
    `),r(4,"div",2),e(5,`
      `),r(6,"div",3),f("viewDateChange",function(s){return y(t.viewDate,s)||(t.viewDate=s),s}),e(7,`
        Previous
      `),o(),e(8,`
      `),r(9,"div",4),f("viewDateChange",function(s){return y(t.viewDate,s)||(t.viewDate=s),s}),e(10,`
        Today
      `),o(),e(11,`
      `),r(12,"div",5),f("viewDateChange",function(s){return y(t.viewDate,s)||(t.viewDate=s),s}),e(13,`
        Next
      `),o(),e(14,`
    `),o(),e(15,`
  `),o(),e(16,`
  `),r(17,"div",1),e(18,`
    `),r(19,"h3"),e(20),T(21,"calendarDate"),o(),e(22,`
  `),o(),e(23,`
  `),r(24,"div",1),e(25,`
    `),r(26,"div",2),e(27,`
      `),r(28,"div",6),c("click",function(){return t.setView(t.CalendarView.Month)}),e(29,`
        Month
      `),o(),e(30,`
      `),r(31,"div",6),c("click",function(){return t.setView(t.CalendarView.Week)}),e(32,`
        Week
      `),o(),e(33,`
      `),r(34,"div",6),c("click",function(){return t.setView(t.CalendarView.Day)}),e(35,`
        Day
      `),o(),e(36,`
    `),o(),e(37,`
  `),o(),e(38,`
`),o(),e(39,`
`),D(40,"br"),e(41,`

`),r(42,"div"),e(43,`
  `),x(44,K,3,5)(45,z,3,5)(46,Z,3,3),e(47,`
`),o(),e(48,`
`)),l&2){let v;d(6),w("view",t.view),C("viewDate",t.viewDate),d(3),C("viewDate",t.viewDate),d(3),w("view",t.view),C("viewDate",t.viewDate),d(8),k(`
      `,V(21,13,t.viewDate,t.view+"ViewTitle",t.locale,t.weekStartsOn),`
    `),d(8),u("active",t.view===t.CalendarView.Month),d(3),u("active",t.view===t.CalendarView.Week),d(3),u("active",t.view===t.CalendarView.Day),d(10),P((v=t.view)==="month"?44:v==="week"?45:v==="day"?46:-1)}},dependencies:[W,A,b,O,L,R,H],encapsulation:2,changeDetection:0});let i=a;return i})();export{oe as DemoComponent};
