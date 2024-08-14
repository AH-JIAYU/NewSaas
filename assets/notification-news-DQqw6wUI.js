
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{d as v,ak as g,r as k,a as C,o as r,b as S,p as e,D as _,i as a,f as u,w as n,g as i,e as b,j as x,al as N,aJ as I,aK as B,P as T}from"./index-Cc6n2BiZ.js";const V=s=>(I("data-v-3090b6de"),s=s(),B(),s),z={class:"news p-4"},D={class:"content"},E={class:"theme flex-s"},M=V(()=>e("span",{class:"title"},"主 题:",-1)),P={class:"bg"},j={class:"news-content bg"},A={class:"footer"},J=v({name:"PersonalNotificationNews",__name:"notification-news",emits:["delSelectId"],setup(s,{expose:f,emit:m}){const h=m,c=g(),t=k({}),w=l=>{t.value=l},y=async()=>{await N.updateTenantMessage({id:t.value.id}),await c.getUnreadMessage(),d()},d=()=>{h("delSelectId")};return f({showEdit:w}),(l,p)=>{const o=C("el-button");return r(),S("div",z,[e("div",D,[e("div",E,[M,e("p",P,_(a(c).auditTypeList[a(t).auditType-1]||""),1)]),e("div",j,_(a(t).messageContent),1)]),e("div",A,[u(o,{plain:"",type:"primary",size:"default",onClick:d},{default:n(()=>[i("关闭")]),_:1}),a(t).isReadAlready===1?(r(),b(o,{key:0,plain:"",type:"primary",size:"default",onClick:y},{default:n(()=>[i("已读")]),_:1})):x("",!0),u(o,{plain:"",type:"danger",onClick:p[0]||(p[0]=()=>{})},{default:n(()=>[i("删除")]),_:1})])])}}}),L=T(J,[["__scopeId","data-v-3090b6de"]]);export{L as default};
