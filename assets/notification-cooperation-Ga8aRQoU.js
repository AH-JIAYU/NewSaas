
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{d as w,aM as y,r as N,a as C,o as r,b as p,s as a,H as n,i as s,f as _,w as l,g as i,j as S,b8 as u,aJ as x,aK as b,R as g}from"./index-DXIwLSJH.js";const k=o=>(x("data-v-7f1e60d3"),o=o(),b(),o),I={class:"news p-4"},T=k(()=>a("div",{class:"type"},[a("span"),i(" 合作邀约 ")],-1)),V={class:"news-content"},B={class:"content"},E={class:"time"},A={key:0,class:"footer"},U=w({name:"PersonalNotificationCooperation",__name:"notification-cooperation",setup(o,{expose:f}){const c=y(),t=N({}),m=e=>{t.value=e},v=async()=>{const e={id:t.value.id,type:2};await u.updateTenantAudit(e),await c.getUnreadTodo()},h=async()=>{const e={id:t.value.id,type:3};await u.updateTenantAudit(e),await c.getUnreadTodo()};return f({showEdit:m}),(e,j)=>{const d=C("el-button");return r(),p("div",I,[T,a("div",V,[a("div",B," 尊贵的"+n(s(t).beInvitedName),1),a("div",E," 您好，我是"+n(s(t).invitationName||"-")+"诚挚邀请您与我们一同协作共赢！若有疑问请联系"+n(s(t).phoneOrEmail)+"。 ",1),s(t).auditStatus===1?(r(),p("div",A,[_(d,{onClick:v},{default:l(()=>[i("拒绝合作")]),_:1}),_(d,{type:"primary",onClick:h},{default:l(()=>[i(" 同意合作 ")]),_:1})])):S("",!0)])])}}}),H=g(U,[["__scopeId","data-v-7f1e60d3"]]);export{H as default};
