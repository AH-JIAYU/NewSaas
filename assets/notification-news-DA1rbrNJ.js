
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{d as v,al as y,r as g,a as S,o as r,b as k,s as e,H as n,i as s,g as o,f as x,w as _,e as C,j as N,an as b,aL as I,aM as B,R as T}from"./index-IO_LN-IO.js";const p=a=>(I("data-v-748cd2a7"),a=a(),B(),a),V={class:"news p-4"},M={class:"content"},z={class:"theme flex-s"},E=p(()=>e("span",{class:"title"},"主 题:",-1)),L={class:"bg"},R={class:"news-content bg"},j=p(()=>e("br",null,null,-1)),A={class:"footer"},D=v({name:"PersonalNotificationNews",__name:"notification-news",emits:["delSelectId"],setup(a,{expose:u,emit:m}){const f=m,c=y(),t=g({}),h=d=>{t.value=d},w=async()=>{await b.updateTenantMessage({id:t.value.id}),await c.getUnreadMessage(),i()},i=()=>{f("delSelectId")};return u({showEdit:h}),(d,H)=>{const l=S("el-button");return r(),k("div",V,[e("div",M,[e("div",z,[E,e("p",L,n(s(c).auditTypeList[s(t).auditType-1]||""),1)]),e("div",R,[o(n(s(t).messageContent)+" ",1),j,o(" 说明："+n(s(t).remark),1)])]),e("div",A,[x(l,{plain:"",type:"primary",size:"default",onClick:i},{default:_(()=>[o("关闭")]),_:1}),s(t).isReadAlready===1?(r(),C(l,{key:0,plain:"",type:"primary",size:"default",onClick:w},{default:_(()=>[o("已读")]),_:1})):N("",!0)])])}}}),U=T(D,[["__scopeId","data-v-748cd2a7"]]);export{U as default};
