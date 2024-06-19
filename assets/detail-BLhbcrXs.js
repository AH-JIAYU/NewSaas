
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{_ as x}from"./index-DF5TugSx.js";import{d as k,v as B,O as v,t as w,r as y,a as o,o as S,b as h,f as e,w as t,g as s,i as c,H as $,N as z,at as G,s as N,q as _}from"./index-CQB6STMM.js";import{_ as P}from"./index.vue_vue_type_script_setup_true_lang-Cx7oRPTI.js";import{u as T}from"./useTabbar-Dq9kqoYU.js";import"./role-DoEL4y8p.js";const H=k({name:"PagesExampleRoleDetail",__name:"detail",setup(L){const l=B(),m=v(),u=T(),i=w(),r=y();function f(){r.value.submit().then(()=>{$.emit("get-data-list"),a()})}function p(){a()}function a(){i.settings.tabbar.enable&&i.settings.tabbar.mergeTabsBy!=="activeMenu"?u.close({name:"pagesExampleGeneralRoleList"}):m.push({name:"pagesExampleGeneralRoleList"})}return(M,V)=>{const d=z,n=o("ElButton"),g=G,b=o("ElCol"),E=o("ElRow"),C=N,R=x;return S(),h("div",null,[e(g,{title:c(l).name==="pagesExampleGeneralRoleCreate"?"新增角色":"编辑角色"},{default:t(()=>[e(n,{size:"default",round:"",onClick:a},{icon:t(()=>[e(d,{name:"i-ep:arrow-left"})]),default:t(()=>[s(" 返回 ")]),_:1})]),_:1},8,["title"]),e(C,null,{default:t(()=>[e(E,null,{default:t(()=>[e(b,{md:24,lg:16},{default:t(()=>[e(P,{id:c(l).params.id,ref_key:"formRef",ref:r},null,8,["id"])]),_:1})]),_:1})]),_:1}),e(R,null,{default:t(()=>[e(n,{type:"primary",size:"large",onClick:f},{default:t(()=>[s(" 提交 ")]),_:1}),e(n,{size:"large",onClick:p},{default:t(()=>[s(" 取消 ")]),_:1})]),_:1})])}}});typeof _=="function"&&_(H);export{H as default};
