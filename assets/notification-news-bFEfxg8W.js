
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{d as p,aM as r,r as l,o as u,b as m,s,g as f,A as n,i as a,bb as h,aI as v,aJ as w,M as S}from"./index-BZHzFsqK.js";const y=t=>(v("data-v-e5b7e2cd"),t=t(),w(),t),I={class:"news p-4"},b={class:"type"},x=y(()=>s("span",null,null,-1)),N={class:"news-content"},T={class:"content"},g={class:"time"},B=p({name:"PersonalNotificationNews",__name:"notification-news",emits:["delSelectId"],setup(t,{expose:i,emit:M}){const c=r(),e=l({}),d=o=>{e.value=o,o.isReadAlready!==2&&_()},_=async()=>{await h.updateTenantMessage({id:e.value.id})};return i({showEdit:d}),(o,k)=>(u(),m("div",I,[s("div",b,[x,f(" "+n(a(c).auditTypeList[a(e).auditType-1]||""),1)]),s("div",N,[s("div",T,n(a(e).messageContent),1),s("div",g,n(a(e).createTime),1)])]))}}),C=S(B,[["__scopeId","data-v-e5b7e2cd"]]);export{C as default};
