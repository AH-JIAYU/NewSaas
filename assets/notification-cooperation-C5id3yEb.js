
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{d as I,aM as N,r as C,a as T,o as l,b as _,v as a,A as i,i as s,f as u,w as m,g as d,j as b,bb as c,aI as g,aJ as x,M as k}from"./index-BL1kLiLm.js";const A=o=>(g("data-v-5f5423d3"),o=o(),x(),o),V={class:"news p-4"},B=A(()=>a("div",{class:"type"},[a("span"),d(" 合作邀约 ")],-1)),E={class:"news-content"},U={class:"content"},M={class:"time"},j={key:0,class:"footer"},D=I({name:"PersonalNotificationCooperation",__name:"notification-cooperation",emits:["delSelectId"],setup(o,{expose:f,emit:v}){const r=v,n=N(),t=C({}),h=e=>{t.value=e,w()},w=async()=>{const e={id:t.value.id,type:1};await c.updateTenantAudit(e),await n.getUnreadTodo()},y=async()=>{const e={id:t.value.id,type:2};r("delSelectId"),await c.updateTenantAudit(e),await n.getUnreadTodo()},S=async()=>{const e={id:t.value.id,type:3};r("delSelectId"),await c.updateTenantAudit(e),await n.getUnreadTodo()};return f({showEdit:h}),(e,J)=>{const p=T("el-button");return l(),_("div",V,[B,a("div",E,[a("div",U," 尊贵的"+i(s(t).beInvitedName),1),a("div",M," 您好，我是"+i(s(t).invitationName||"-")+"诚挚邀请您与我们一同协作共赢！若有疑问请联系"+i(s(t).phoneOrEmail)+"。 ",1),s(t).auditStatus===1?(l(),_("div",j,[u(p,{onClick:y},{default:m(()=>[d("拒绝合作")]),_:1}),u(p,{type:"primary",onClick:S},{default:m(()=>[d(" 同意合作 ")]),_:1})])):b("",!0)])])}}}),P=k(D,[["__scopeId","data-v-5f5423d3"]]);export{P as default};
