
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{d as y,aM as N,r as b,a as C,o as p,b as _,s as e,H as i,i as s,f as u,w as l,g as d,j as S,b8 as c,aJ as T,aK as g,R as x}from"./index-C6aesvjM.js";const k=o=>(T("data-v-4133b326"),o=o(),g(),o),I={class:"news p-4"},V=k(()=>e("div",{class:"type"},[e("span"),d(" 合作邀约 ")],-1)),A={class:"news-content"},B={class:"content"},E={class:"time"},U={key:0,class:"footer"},j=y({name:"PersonalNotificationCooperation",__name:"notification-cooperation",setup(o,{expose:m}){const n=N(),t=b({}),f=a=>{t.value=a,v()},v=async()=>{const a={id:t.value.id,type:1};await c.updateTenantAudit(a),await n.getUnreadTodo()},h=async()=>{const a={id:t.value.id,type:2};await c.updateTenantAudit(a),await n.getUnreadTodo()},w=async()=>{const a={id:t.value.id,type:3};await c.updateTenantAudit(a),await n.getUnreadTodo()};return m({showEdit:f}),(a,D)=>{const r=C("el-button");return p(),_("div",I,[V,e("div",A,[e("div",B," 尊贵的"+i(s(t).beInvitedName),1),e("div",E," 您好，我是"+i(s(t).invitationName||"-")+"诚挚邀请您与我们一同协作共赢！若有疑问请联系"+i(s(t).phoneOrEmail)+"。 ",1),s(t).auditStatus===1?(p(),_("div",U,[u(r,{onClick:h},{default:l(()=>[d("拒绝合作")]),_:1}),u(r,{type:"primary",onClick:w},{default:l(()=>[d(" 同意合作 ")]),_:1})])):S("",!0)])])}}}),J=x(j,[["__scopeId","data-v-4133b326"]]);export{J as default};
