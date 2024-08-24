
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{d as y,aM as w,r as N,a as C,o as p,b as r,s as a,H as n,i as s,f as _,w as u,g as c,j as x,b8 as i,aJ as S,aK as b,R as k}from"./index-gkVyJmAv.js";const I=o=>(S("data-v-9f87de32"),o=o(),b(),o),T={class:"news p-4"},V=I(()=>a("div",{class:"type"},[a("span"),c(" 合作邀约 ")],-1)),g={class:"news-content"},A={class:"content"},B={class:"time"},E={key:0,class:"footer"},j=y({name:"PersonalNotificationCooperation",__name:"notification-cooperation",setup(o,{expose:l}){w();const t=N({}),m=e=>{t.value=e,f()},f=async()=>{const e={id:t.value.id,type:1};await i.updateTenantAudit(e)},v=async()=>{const e={id:t.value.id,type:2};await i.updateTenantAudit(e)},h=async()=>{const e={id:t.value.id,type:3};await i.updateTenantAudit(e)};return l({showEdit:m}),(e,D)=>{const d=C("el-button");return p(),r("div",T,[V,a("div",g,[a("div",A," 尊贵的"+n(s(t).beInvitedName),1),a("div",B," 您好，我是"+n(s(t).invitationName||"-")+"诚挚邀请您与我们一同协作共赢！若有疑问请联系"+n(s(t).phoneOrEmail)+"。 ",1),s(t).auditStatus===1?(p(),r("div",E,[_(d,{onClick:v},{default:u(()=>[c("拒绝合作")]),_:1}),_(d,{type:"primary",onClick:h},{default:u(()=>[c(" 同意合作 ")]),_:1})])):x("",!0)])])}}}),J=k(j,[["__scopeId","data-v-9f87de32"]]);export{J as default};
