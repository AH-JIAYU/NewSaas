
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{d as w,ak as v,r as y,a as g,o as d,b as S,p as e,D as l,i as a,f as k,w as p,g as r,e as x,j as C,am as N,aJ as I,aK as b,P as B}from"./index-CsSreFXq.js";const T=s=>(I("data-v-3f01f507"),s=s(),b(),s),V={class:"news p-4"},z={class:"content"},D={class:"theme flex-s"},E=T(()=>e("span",{class:"title"},"主 题:",-1)),M={class:"bg"},P={class:"news-content bg"},j={class:"footer"},A=w({name:"PersonalNotificationNews",__name:"notification-news",emits:["delSelectId"],setup(s,{expose:_,emit:f}){const m=f,o=v(),t=y({}),u=c=>{t.value=c},h=async()=>{await N.updateTenantMessage({id:t.value.id}),await o.getUnreadMessage(),n()},n=()=>{m("delSelectId")};return _({showEdit:u}),(c,J)=>{const i=g("el-button");return d(),S("div",V,[e("div",z,[e("div",D,[E,e("p",M,l(a(o).auditTypeList[a(t).auditType-1]||""),1)]),e("div",P,l(a(t).messageContent),1)]),e("div",j,[k(i,{plain:"",type:"primary",size:"default",onClick:n},{default:p(()=>[r("关闭")]),_:1}),a(t).isReadAlready===1?(d(),x(i,{key:0,plain:"",type:"primary",size:"default",onClick:h},{default:p(()=>[r("已读")]),_:1})):C("",!0)])])}}}),L=B(A,[["__scopeId","data-v-3f01f507"]]);export{L as default};
