
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{d as p,aK as r,r as l,o as u,b as m,y as s,g as f,z as n,i as a,b7 as h,aG as v,aH as w,L as y}from"./index-CIPmcJv-.js";const S=t=>(v("data-v-2bd1b05c"),t=t(),w(),t),b={class:"news p-4"},x={class:"type"},I=S(()=>s("span",null,null,-1)),N={class:"news-content"},T={class:"content"},g={class:"time"},B=p({name:"PersonalNotificationNews",__name:"notification-news",emits:["delSelectId"],setup(t,{expose:i,emit:k}){const c=r(),e=l({}),d=o=>{e.value=o,o.isReadAlready!==2&&_()},_=async()=>{await h.updateTenantMessage({id:e.value.id})};return i({showEdit:d}),(o,C)=>(u(),m("div",b,[s("div",x,[I,f(" "+n(a(c).auditTypeList[a(e).auditType-1]||""),1)]),s("div",N,[s("div",T,n(a(e).messageContent),1),s("div",g,n(a(e).createTime),1)])]))}}),L=y(B,[["__scopeId","data-v-2bd1b05c"]]);export{L as default};
