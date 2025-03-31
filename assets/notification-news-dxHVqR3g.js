
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{d as p,b8 as r,r as l,o as u,b as f,v as s,g as m,A as n,i as a,bf as h,aI as v,aJ as b,M as w}from"./index-BEosAuiF.js";const S=t=>(v("data-v-2bd1b05c"),t=t(),b(),t),y={class:"news p-4"},I={class:"type"},x=S(()=>s("span",null,null,-1)),N={class:"news-content"},T={class:"content"},g={class:"time"},B=p({name:"PersonalNotificationNews",__name:"notification-news",emits:["delSelectId"],setup(t,{expose:i,emit:k}){const c=r(),e=l({}),d=o=>{e.value=o,o.isReadAlready!==2&&_()},_=async()=>{await h.updateTenantMessage({id:e.value.id})};return i({showEdit:d}),(o,A)=>(u(),f("div",y,[s("div",I,[x,m(" "+n(a(c).auditTypeList[a(e).auditType-1]||""),1)]),s("div",N,[s("div",T,n(a(e).messageContent),1),s("div",g,n(a(e).createTime),1)])]))}}),E=w(B,[["__scopeId","data-v-2bd1b05c"]]);export{E as default};
