
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{d as p,aM as r,r as l,o as u,e as m,t,h as f,H as n,j as a,bb as h,aI as v,aJ as w,R as S}from"./index-Hrr3bGjq.js";const y=s=>(v("data-v-e5b7e2cd"),s=s(),w(),s),I={class:"news p-4"},x={class:"type"},N=y(()=>t("span",null,null,-1)),T={class:"news-content"},b={class:"content"},g={class:"time"},B=p({name:"PersonalNotificationNews",__name:"notification-news",emits:["delSelectId"],setup(s,{expose:i,emit:k}){const c=r(),e=l({}),d=o=>{e.value=o,o.isReadAlready!==2&&_()},_=async()=>{await h.updateTenantMessage({id:e.value.id})};return i({showEdit:d}),(o,C)=>(u(),m("div",I,[t("div",x,[N,f(" "+n(a(c).auditTypeList[a(e).auditType-1]||""),1)]),t("div",T,[t("div",b,n(a(e).messageContent),1),t("div",g,n(a(e).createTime),1)])]))}}),M=S(B,[["__scopeId","data-v-e5b7e2cd"]]);export{M as default};
