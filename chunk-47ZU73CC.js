import{a as u}from"./chunk-SIVC2SE7.js";import{a as q}from"./chunk-CFSPUUHB.js";import{D as N}from"./chunk-2HQHCNGL.js";import{$c as j,Hb as b,Ka as m,Kb as e,Mb as O,Mc as W,Nb as I,Nc as g,Ob as f,Pb as F,Rb as M,Sb as P,Tb as k,Ua as E,Yc as B,_c as L,ad as A,f as y,gd as z,hd as H,ia as w,ja as C,jb as h,lb as x,mb as T,nb as S,ob as V,pb as c,qb as r,rb as o,wb as D,yb as _,zb as p}from"./chunk-ODVXNMMH.js";import"./chunk-RACSJ3AQ.js";var G=i=>({event:i}),J=()=>({delay:300,delta:30});function K(i,l){i&1&&(e(0,`
        `),r(1,"p")(2,"em"),e(3,"No events added"),o()(),e(4,`
        `))}function Q(i,l){if(i&1&&(e(0,`
          `),r(1,"li",6),e(2,`
            `),r(3,"a",7),e(4),o(),e(5,`
          `),o(),e(6,`
          `)),i&2){let t=l.$implicit;m(),c("dropData",k(5,G,t))("touchStartLongPress",P(7,J)),m(2),b("color",t.color.primary),m(),O(`
              `,t.title,`
            `)}}function R(i,l){if(i&1){let t=D();e(0,`
      `),r(1,"mwl-calendar-month-view",8),_("eventTimesChanged",function(a){w(t);let n=p();return C(n.eventDropped(a))}),o(),e(2,`
      `)}if(i&2){let t=p();m(),c("viewDate",t.viewDate)("events",t.events)("activeDayIsOpen",t.activeDayIsOpen)("refresh",t.refresh)}}function U(i,l){if(i&1){let t=D();e(0,`
      `),r(1,"mwl-calendar-week-view",9),_("eventTimesChanged",function(a){w(t);let n=p();return C(n.eventDropped(a))}),o(),e(2,`
      `)}if(i&2){let t=p();m(),c("viewDate",t.viewDate)("events",t.events)("refresh",t.refresh)("snapDraggedEvents",!1)}}function X(i,l){if(i&1){let t=D();e(0,`
      `),r(1,"mwl-calendar-day-view",9),_("eventTimesChanged",function(a){w(t);let n=p();return C(n.eventDropped(a))}),o(),e(2,`
      `)}if(i&2){let t=p();m(),c("viewDate",t.viewDate)("events",t.events)("refresh",t.refresh)("snapDraggedEvents",!1)}}var ae=(()=>{let l=class l{constructor(){this.CalendarView=g,this.view=g.Month,this.viewDate=new Date,this.externalEvents=[{title:"Event 1",color:u.yellow,start:new Date,draggable:!0},{title:"Event 2",color:u.blue,start:new Date,draggable:!0}],this.events=[],this.activeDayIsOpen=!1,this.refresh=new y}eventDropped({event:s,newStart:a,newEnd:n,allDay:v}){let d=this.externalEvents.indexOf(s);typeof v<"u"&&(s.allDay=v),d>-1&&(this.externalEvents.splice(d,1),this.events.push(s)),s.start=a,n&&(s.end=n),this.view==="month"&&(this.viewDate=a,this.activeDayIsOpen=!0),this.events=[...this.events]}externalDrop(s){this.externalEvents.indexOf(s)===-1&&(this.events=this.events.filter(a=>a!==s),this.externalEvents.push(s))}};l.\u0275fac=function(a){return new(a||l)},l.\u0275cmp=E({type:l,selectors:[["mwl-demo-component"]],features:[M([B({provide:W,useFactory:N})])],decls:30,vars:4,consts:[[1,"row"],[1,"col-md-3"],["mwlDroppable","","dragOverClass","drag-over",1,"card",3,"drop"],[1,"card-body"],[1,"col-md-9"],[3,"viewChange","viewDateChange","view","viewDate"],["mwlDraggable","","dragActiveClass","drag-active",3,"dropData","touchStartLongPress"],["href","javascript:;"],[3,"eventTimesChanged","viewDate","events","activeDayIsOpen","refresh"],[3,"eventTimesChanged","viewDate","events","refresh","snapDraggedEvents"]],template:function(a,n){if(a&1&&(r(0,"div",0),e(1,`
  `),r(2,"div",1),e(3,`
    `),r(4,"div",2),_("drop",function(d){return n.externalDrop(d.dropData.event)}),e(5,`
      `),r(6,"div",3),e(7,`
        `),h(8,K,5,0),r(9,"ul"),e(10,`
          `),S(11,Q,7,8,null,null,T),o(),e(13,`
      `),o(),e(14,`
    `),o(),e(15,`
  `),o(),e(16,`

  `),r(17,"div",4),e(18,`
    `),r(19,"mwl-demo-utils-calendar-header",5),F("viewChange",function(d){return f(n.view,d)||(n.view=d),d})("viewDateChange",function(d){return f(n.viewDate,d)||(n.viewDate=d),d}),o(),e(20,`

    `),r(21,"div"),e(22,`
      `),h(23,R,3,4)(24,U,3,4)(25,X,3,4),e(26,`
    `),o(),e(27,`
  `),o(),e(28,`
`),o(),e(29,`
`)),a&2){let v;m(8),x(n.externalEvents.length===0?8:-1),m(3),V(n.externalEvents),m(8),I("view",n.view)("viewDate",n.viewDate),m(4),x((v=n.view)===n.CalendarView.Month?23:v===n.CalendarView.Week?24:v===n.CalendarView.Day?25:-1)}},dependencies:[j,L,q,A,z,H],styles:[".drag-active[_ngcontent-%COMP%]{position:relative;z-index:1;pointer-events:none}.drag-over[_ngcontent-%COMP%]{background-color:#eee}"],changeDetection:0});let i=l;return i})();export{ae as DemoComponent};
