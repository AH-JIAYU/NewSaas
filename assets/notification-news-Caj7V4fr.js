
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{d as p,aK as r,r as l,o as u,b as m,y as s,g as f,z as n,i as a,b7 as h,aG as v,aH as w,L as y}from"./index-Caan35Ad.js";const S=t=>(v("data-v-e5b7e2cd"),t=t(),w(),t),x={class:"news p-4"},I={class:"type"},N=S(()=>s("span",null,null,-1)),T={class:"news-content"},b={class:"content"},g={class:"time"},B=p({name:"PersonalNotificationNews",__name:"notification-news",emits:["delSelectId"],setup(t,{expose:i,emit:k}){const c=r(),e=l({}),d=o=>{e.value=o,o.isReadAlready!==2&&_()},_=async()=>{await h.updateTenantMessage({id:e.value.id})};return i({showEdit:d}),(o,C)=>(u(),m("div",x,[s("div",I,[N,f(" "+n(a(c).auditTypeList[a(e).auditType-1]||""),1)]),s("div",T,[s("div",b,n(a(e).messageContent),1),s("div",g,n(a(e).createTime),1)])]))}}),L=y(B,[["__scopeId","data-v-e5b7e2cd"]]);export{L as default};
