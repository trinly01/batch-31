(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[4],{"74fe":function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[t._v("\n  "+t._s(t.storeRating)+"\n  "),n("pie-chart",{attrs:{donut:!0,data:t.storeRating}})],1)},r=[],i=n("a34a"),s=n.n(i),c=(n("7514"),n("96cf"),n("c973")),u=n.n(c),o={mounted:function(){var t=this;return u()(s.a.mark((function e(){var n,a;return s.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$dbCon.authenticate();case 2:t.itemsService=t.$dbCon.wingsService("items"),n=5;case 4:if(!(n>0)){e.next=12;break}return e.next=7,t.itemsService.find({query:{rating:n,$limit:0}});case 7:a=e.sent.total,t.storeRating.push([n+"stars",a]);case 9:n--,e.next=4;break;case 12:case"end":return e.stop()}}),e)})))()},data:function(){return{storeRating:[]}}},d=o,f=n("2877"),l=Object(f["a"])(d,a,r,!1,null,null,null);e["default"]=l.exports}}]);