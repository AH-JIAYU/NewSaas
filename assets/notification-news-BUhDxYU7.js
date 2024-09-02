
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{d as p,aI as r,r as l,o as u,b as m,s,g as f,H as n,i as a,b8 as h,aG as v,aH as w,R as S}from"./index-CWiGh2AJ.js";const y=t=>(v("data-v-e5b7e2cd"),t=t(),w(),t),I={class:"news p-4"},x={class:"type"},N=y(()=>s("span",null,null,-1)),T={class:"news-content"},b={class:"content"},g={class:"time"},B=p({name:"PersonalNotificationNews",__name:"notification-news",emits:["delSelectId"],setup(t,{expose:i,emit:k}){const c=r(),e=l({}),d=o=>{e.value=o,o.isReadAlready!==2&&_()},_=async()=>{await h.updateTenantMessage({id:e.value.id})};return i({showEdit:d}),(o,C)=>(u(),m("div",I,[s("div",x,[N,f(" "+n(a(c).auditTypeList[a(e).auditType-1]||""),1)]),s("div",T,[s("div",b,n(a(e).messageContent),1),s("div",g,n(a(e).createTime),1)])]))}}),H=S(B,[["__scopeId","data-v-e5b7e2cd"]]);export{H as default};
