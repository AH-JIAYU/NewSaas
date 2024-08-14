
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{d as T,ak as V,r as p,a as f,o as k,e as C,w as n,p as r,f as m,g as s,G as c,i,H as h,al as d}from"./index-DaerNgvX.js";const x=r("br",null,null,-1),U={class:"dialog-footer"},S=T({name:"PersonalNotificationCooperation",__name:"notification-cooperation",setup(A,{expose:_}){const l=V(),a=p(!1),t=p({}),g=e=>{console.log("row",e),t.value=e,a.value=!0},v=async e=>{const o={id:t.value.id,type:1};await d.updateTenantAudit(o),await l.getUnreadTodo(),a.value=!1},w=async()=>{const e={id:t.value.id,type:2};await d.updateTenantAudit(e),await l.getUnreadTodo(),a.value=!1},y=async()=>{const e={id:t.value.id,type:3};await d.updateTenantAudit(e),await l.getUnreadTodo(),a.value=!1};return _({showEdit:g}),(e,o)=>{const u=f("el-button"),b=f("el-dialog");return k(),C(b,{modelValue:i(a),"onUpdate:modelValue":o[0]||(o[0]=N=>h(a)?a.value=N:null),title:"合作邀约",width:"40%",center:"",draggable:"","before-close":v,"close-on-click-modal":!1},{footer:n(()=>[r("div",U,[m(u,{onClick:w},{default:n(()=>[s("决绝合作")]),_:1}),m(u,{type:"primary",onClick:y},{default:n(()=>[s(" 同意合作 ")]),_:1})])]),default:n(()=>[r("span",null,[s(" 尊贵的"+c(i(t).beInvitedName)+" ",1),x,s(" 您好，我是"+c(i(t).invitationName||"-")+"诚挚邀请您与我们一同协作共赢！若有疑问请联系"+c(i(t).phoneOrEmail)+"。 ",1)])]),_:1},8,["modelValue"])}}});export{S as _};
