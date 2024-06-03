
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{_ as x}from"./index-CNAXjV8L.js";import{d as k,v as B,L as v,t as w,r as y,a as o,o as S,b as h,f as e,w as t,g as s,i as c,D as $,K as z,ar as G,s as L,q as _}from"./index-JVwiYWif.js";import{_ as P}from"./index.vue_vue_type_script_setup_true_lang-sE7gNqTi.js";import{u as T}from"./useTabbar-BWyEDWW7.js";import"./role-DJxMHb7L.js";const D=k({name:"PagesExampleRoleDetail",__name:"detail",setup(M){const l=B(),m=v(),u=T(),r=w(),i=y();function f(){i.value.submit().then(()=>{$.emit("get-data-list"),a()})}function p(){a()}function a(){r.settings.tabbar.enable&&r.settings.tabbar.mergeTabsBy!=="activeMenu"?u.close({name:"pagesExampleGeneralRoleList"}):m.push({name:"pagesExampleGeneralRoleList"})}return(N,V)=>{const d=z,n=o("ElButton"),g=G,b=o("ElCol"),E=o("ElRow"),C=L,R=x;return S(),h("div",null,[e(g,{title:c(l).name==="pagesExampleGeneralRoleCreate"?"新增角色":"编辑角色"},{default:t(()=>[e(n,{size:"default",round:"",onClick:a},{icon:t(()=>[e(d,{name:"i-ep:arrow-left"})]),default:t(()=>[s(" 返回 ")]),_:1})]),_:1},8,["title"]),e(C,null,{default:t(()=>[e(E,null,{default:t(()=>[e(b,{md:24,lg:16},{default:t(()=>[e(P,{id:c(l).params.id,ref_key:"formRef",ref:i},null,8,["id"])]),_:1})]),_:1})]),_:1}),e(R,null,{default:t(()=>[e(n,{type:"primary",size:"large",onClick:f},{default:t(()=>[s(" 提交 ")]),_:1}),e(n,{size:"large",onClick:p},{default:t(()=>[s(" 取消 ")]),_:1})]),_:1})])}}});typeof _=="function"&&_(D);export{D as default};
