
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{d as N,ak as T,r as p,a as f,o as V,e as C,al as h,i as o,w as s,p as r,f as m,g as i,D as d,G as x,am as c}from"./index-DntGxMRg.js";const S=r("br",null,null,-1),U={class:"dialog-footer"},D=N({name:"PersonalNotificationCooperation",__name:"notification-cooperation",setup(A,{expose:_}){const l=T(),t=p(!1),e=p({}),v=a=>{console.log("row",a),e.value=a,t.value=!0},g=async a=>{const n={id:e.value.id,type:1};await c.updateTenantAudit(n),await l.getUnreadTodo(),t.value=!1},w=async()=>{const a={id:e.value.id,type:2};await c.updateTenantAudit(a),await l.getUnreadTodo(),t.value=!1},y=async()=>{const a={id:e.value.id,type:3};await c.updateTenantAudit(a),await l.getUnreadTodo(),t.value=!1};return _({showEdit:v}),(a,n)=>{const u=f("el-button"),b=f("el-dialog");return V(),C(b,{modelValue:o(t),"onUpdate:modelValue":n[0]||(n[0]=k=>x(t)?t.value=k:null),title:"合作邀约",width:"40%",center:"",draggable:"","before-close":g,"close-on-click-modal":!1},h({default:s(()=>[r("span",null,[i(" 尊贵的"+d(o(e).beInvitedName)+" ",1),S,i(" 您好，我是"+d(o(e).invitationName||"-")+"诚挚邀请您与我们一同协作共赢！若有疑问请联系"+d(o(e).phoneOrEmail)+"。 ",1)])]),_:2},[o(e).auditStatus===1?{name:"footer",fn:s(()=>[r("div",U,[m(u,{onClick:w},{default:s(()=>[i("决绝合作")]),_:1}),m(u,{type:"primary",onClick:y},{default:s(()=>[i(" 同意合作 ")]),_:1})])]),key:"0"}:void 0]),1032,["modelValue"])}}});export{D as _};
