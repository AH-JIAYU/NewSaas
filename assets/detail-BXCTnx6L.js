
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{_ as x}from"./index-DnBavbDL.js";import{d as k,s as B,L as v,t as w,r as y,a as o,o as S,b as h,f as e,w as t,g as s,i as c,C as z,K as G,ap as L,q as P,p as m}from"./index-DQumISPN.js";import T from"./index-VJaupo0p.js";import{u as $}from"./useTabbar-B7dQRT9e.js";import"./role-IA7-I9MZ.js";const D=k({name:"PagesExampleRoleDetail",__name:"detail",setup(F){const l=B(),u=v(),_=$(),r=w(),i=y();function f(){i.value.submit().then(()=>{z.emit("get-data-list"),a()})}function p(){a()}function a(){r.settings.tabbar.enable&&r.settings.tabbar.mergeTabsBy!=="activeMenu"?_.close({name:"pagesExampleGeneralRoleList"}):u.push({name:"pagesExampleGeneralRoleList"})}return(M,N)=>{const d=G,n=o("ElButton"),g=L,b=o("ElCol"),C=o("ElRow"),E=P,R=x;return S(),h("div",null,[e(g,{title:c(l).name==="pagesExampleGeneralRoleCreate"?"新增角色":"编辑角色"},{default:t(()=>[e(n,{size:"default",round:"",onClick:a},{icon:t(()=>[e(d,{name:"i-ep:arrow-left"})]),default:t(()=>[s(" 返回 ")]),_:1})]),_:1},8,["title"]),e(E,null,{default:t(()=>[e(C,null,{default:t(()=>[e(b,{md:24,lg:16},{default:t(()=>[e(T,{id:c(l).params.id,ref_key:"formRef",ref:i},null,8,["id"])]),_:1})]),_:1})]),_:1}),e(R,null,{default:t(()=>[e(n,{type:"primary",size:"large",onClick:f},{default:t(()=>[s(" 提交 ")]),_:1}),e(n,{size:"large",onClick:p},{default:t(()=>[s(" 取消 ")]),_:1})]),_:1})])}}});typeof m=="function"&&m(D);export{D as default};
