
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{d as p,aL as r,r as l,o as u,b as m,y as s,g as f,z as n,i as a,b8 as h,aH as v,aI as w,L as y}from"./index-BseM2dkr.js";const S=t=>(v("data-v-e5b7e2cd"),t=t(),w(),t),I={class:"news p-4"},x={class:"type"},N=S(()=>s("span",null,null,-1)),T={class:"news-content"},b={class:"content"},g={class:"time"},B=p({name:"PersonalNotificationNews",__name:"notification-news",emits:["delSelectId"],setup(t,{expose:i,emit:L}){const c=r(),e=l({}),d=o=>{e.value=o,o.isReadAlready!==2&&_()},_=async()=>{await h.updateTenantMessage({id:e.value.id})};return i({showEdit:d}),(o,k)=>(u(),m("div",I,[s("div",x,[N,f(" "+n(a(c).auditTypeList[a(e).auditType-1]||""),1)]),s("div",T,[s("div",b,n(a(e).messageContent),1),s("div",g,n(a(e).createTime),1)])]))}}),E=y(B,[["__scopeId","data-v-e5b7e2cd"]]);export{E as default};
