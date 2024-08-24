
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{d as f,aM as u,r as m,o as h,b as v,s,g as w,H as n,i as a,b8 as S,aJ as g,aK as y,R as I}from"./index-CzCGM0rZ.js";const x=t=>(g("data-v-a36d513f"),t=t(),y(),t),N={class:"news p-4"},T={class:"type"},B=x(()=>s("span",null,null,-1)),M={class:"news-content"},b={class:"content"},k={class:"time"},C=f({name:"PersonalNotificationNews",__name:"notification-news",emits:["delSelectId"],setup(t,{expose:c,emit:d}){const _=d,i=u(),e=m({}),p=o=>{e.value=o,o.isReadAlready!==2&&l()},l=async()=>{await S.updateTenantMessage({id:e.value.id}),await i.getUnreadMessage(),r()},r=()=>{_("delSelectId")};return c({showEdit:p}),(o,E)=>(h(),v("div",N,[s("div",T,[B,w(" "+n(a(i).auditTypeList[a(e).auditType-1]||""),1)]),s("div",M,[s("div",b,n(a(e).messageContent),1),s("div",k,n(a(e).createTime),1)])]))}}),V=I(C,[["__scopeId","data-v-a36d513f"]]);export{V as default};
