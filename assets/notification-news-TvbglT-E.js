
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{d as p,aL as r,r as l,a as u,i as m,b as t,g as f,t as n,h as a,bd as h,aH as v,aI as w,y}from"./index-tHSAnviy.js";const S=s=>(v("data-v-2bd1b05c"),s=s(),w(),s),b={class:"news p-4"},I={class:"type"},x=S(()=>t("span",null,null,-1)),N={class:"news-content"},T={class:"content"},g={class:"time"},B=p({name:"PersonalNotificationNews",__name:"notification-news",emits:["delSelectId"],setup(s,{expose:i,emit:k}){const c=r(),e=l({}),d=o=>{e.value=o,o.isReadAlready!==2&&_()},_=async()=>{await h.updateTenantMessage({id:e.value.id})};return i({showEdit:d}),(o,C)=>(u(),m("div",b,[t("div",I,[x,f(" "+n(a(c).auditTypeList[a(e).auditType-1]||""),1)]),t("div",N,[t("div",T,n(a(e).messageContent),1),t("div",g,n(a(e).createTime),1)])]))}}),L=y(B,[["__scopeId","data-v-2bd1b05c"]]);export{L as default};
