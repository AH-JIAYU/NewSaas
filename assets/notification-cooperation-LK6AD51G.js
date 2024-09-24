
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{d as I,aM as N,r as C,b as T,o as l,e as _,t as a,H as i,j as s,g as u,w as m,h as d,k as g,ba as c,aI as k,aJ as x,R as b}from"./index-Bgpn2lkb.js";const V=o=>(k("data-v-5f5423d3"),o=o(),x(),o),A={class:"news p-4"},B=V(()=>a("div",{class:"type"},[a("span"),d(" 合作邀约 ")],-1)),E={class:"news-content"},U={class:"content"},j={class:"time"},D={key:0,class:"footer"},H=I({name:"PersonalNotificationCooperation",__name:"notification-cooperation",emits:["delSelectId"],setup(o,{expose:f,emit:v}){const r=v,n=N(),t=C({}),h=e=>{t.value=e,w()},w=async()=>{const e={id:t.value.id,type:1};await c.updateTenantAudit(e),await n.getUnreadTodo()},y=async()=>{const e={id:t.value.id,type:2};r("delSelectId"),await c.updateTenantAudit(e),await n.getUnreadTodo()},S=async()=>{const e={id:t.value.id,type:3};r("delSelectId"),await c.updateTenantAudit(e),await n.getUnreadTodo()};return f({showEdit:h}),(e,J)=>{const p=T("el-button");return l(),_("div",A,[B,a("div",E,[a("div",U," 尊贵的"+i(s(t).beInvitedName),1),a("div",j," 您好，我是"+i(s(t).invitationName||"-")+"诚挚邀请您与我们一同协作共赢！若有疑问请联系"+i(s(t).phoneOrEmail)+"。 ",1),s(t).auditStatus===1?(l(),_("div",D,[u(p,{onClick:y},{default:m(()=>[d("拒绝合作")]),_:1}),u(p,{type:"primary",onClick:S},{default:m(()=>[d(" 同意合作 ")]),_:1})])):g("",!0)])])}}}),O=b(H,[["__scopeId","data-v-5f5423d3"]]);export{O as default};
