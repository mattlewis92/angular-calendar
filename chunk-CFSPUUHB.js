import{Ib as o,Ka as l,Kb as i,Lb as g,Nb as m,Nc as f,Ob as C,Pb as p,Qc as S,Rc as E,Sc as T,Ua as h,Uc as V,Xb as c,_a as s,_b as y,pb as _,qb as t,rb as n,sb as u,yb as d}from"./chunk-ODVXNMMH.js";var B=(()=>{let v=class v{constructor(){this.locale="en",this.viewChange=new s,this.viewDateChange=new s,this.CalendarView=f}};v.\u0275fac=function(w){return new(w||v)},v.\u0275cmp=h({type:v,selectors:[["mwl-demo-utils-calendar-header"]],inputs:{view:"view",viewDate:"viewDate",locale:"locale"},outputs:{viewChange:"viewChange",viewDateChange:"viewDateChange"},decls:43,vars:16,consts:[[1,"row","text-center"],[1,"col-md-4"],[1,"btn-group"],["mwlCalendarPreviousView","",1,"btn","btn-primary",3,"viewDateChange","view","viewDate"],["mwlCalendarToday","",1,"btn","btn-outline-secondary",3,"viewDateChange","viewDate"],["mwlCalendarNextView","",1,"btn","btn-primary",3,"viewDateChange","view","viewDate"],[1,"btn","btn-primary",3,"click"]],template:function(w,e){w&1&&(i(0,`
    `),t(1,"div",0),i(2,`
      `),t(3,"div",1),i(4,`
        `),t(5,"div",2),i(6,`
          `),t(7,"div",3),p("viewDateChange",function(a){return C(e.viewDate,a)||(e.viewDate=a),a}),d("viewDateChange",function(){return e.viewDateChange.next(e.viewDate)}),i(8,`
            Previous
          `),n(),i(9,`
          `),t(10,"div",4),p("viewDateChange",function(a){return C(e.viewDate,a)||(e.viewDate=a),a}),d("viewDateChange",function(){return e.viewDateChange.next(e.viewDate)}),i(11,`
            Today
          `),n(),i(12,`
          `),t(13,"div",5),p("viewDateChange",function(a){return C(e.viewDate,a)||(e.viewDate=a),a}),d("viewDateChange",function(){return e.viewDateChange.next(e.viewDate)}),i(14,`
            Next
          `),n(),i(15,`
        `),n(),i(16,`
      `),n(),i(17,`
      `),t(18,"div",1),i(19,`
        `),t(20,"h3"),i(21),c(22,"calendarDate"),n(),i(23,`
      `),n(),i(24,`
      `),t(25,"div",1),i(26,`
        `),t(27,"div",2),i(28,`
          `),t(29,"div",6),d("click",function(){return e.viewChange.emit(e.CalendarView.Month)}),i(30,`
            Month
          `),n(),i(31,`
          `),t(32,"div",6),d("click",function(){return e.viewChange.emit(e.CalendarView.Week)}),i(33,`
            Week
          `),n(),i(34,`
          `),t(35,"div",6),d("click",function(){return e.viewChange.emit(e.CalendarView.Day)}),i(36,`
            Day
          `),n(),i(37,`
        `),n(),i(38,`
      `),n(),i(39,`
    `),n(),i(40,`
    `),u(41,"br"),i(42,`
  `)),w&2&&(l(7),_("view",e.view),m("viewDate",e.viewDate),l(3),m("viewDate",e.viewDate),l(3),_("view",e.view),m("viewDate",e.viewDate),l(8),g(y(22,12,e.viewDate,e.view+"ViewTitle",e.locale)),l(8),o("active",e.view===e.CalendarView.Month),l(3),o("active",e.view===e.CalendarView.Week),l(3),o("active",e.view===e.CalendarView.Day))},dependencies:[S,T,E,V],encapsulation:2});let D=v;return D})();export{B as a};
