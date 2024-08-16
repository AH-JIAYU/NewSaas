
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{d as w,al as v,r as y,a as g,o as d,b as S,s as e,H as l,i as a,f as x,w as p,g as r,e as C,j as N,an as k,aJ as I,aK as b,R as B}from"./index-CUMm1uz-.js";const T=s=>(I("data-v-3f01f507"),s=s(),b(),s),V={class:"news p-4"},z={class:"content"},E={class:"theme flex-s"},M=T(()=>e("span",{class:"title"},"主 题:",-1)),R={class:"bg"},j={class:"news-content bg"},A={class:"footer"},D=w({name:"PersonalNotificationNews",__name:"notification-news",emits:["delSelectId"],setup(s,{expose:_,emit:f}){const u=f,o=v(),t=y({}),m=c=>{t.value=c},h=async()=>{await k.updateTenantMessage({id:t.value.id}),await o.getUnreadMessage(),n()},n=()=>{u("delSelectId")};return _({showEdit:m}),(c,H)=>{const i=g("el-button");return d(),S("div",V,[e("div",z,[e("div",E,[M,e("p",R,l(a(o).auditTypeList[a(t).auditType-1]||""),1)]),e("div",j,l(a(t).messageContent),1)]),e("div",A,[x(i,{plain:"",type:"primary",size:"default",onClick:n},{default:p(()=>[r("关闭")]),_:1}),a(t).isReadAlready===1?(d(),C(i,{key:0,plain:"",type:"primary",size:"default",onClick:h},{default:p(()=>[r("已读")]),_:1})):N("",!0)])])}}}),K=B(D,[["__scopeId","data-v-3f01f507"]]);export{K as default};
