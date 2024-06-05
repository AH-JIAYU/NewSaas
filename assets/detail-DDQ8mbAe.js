
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{_ as x}from"./index-hFEUMWsw.js";import{d as B,v,L as R,t as w,r as y,a as o,o as M,b as S,f as e,w as t,g as s,i as c,D as h,K as $,as as z,s as L,q as _}from"./index-CX2PmK0L.js";import{_ as N}from"./index.vue_vue_type_script_setup_true_lang-DAmzPLmS.js";import{u as P}from"./useTabbar-DBMJ9Xj8.js";import"./role-DcQGEGHC.js";const T=B({name:"PagesExampleManagerDetail",__name:"detail",setup(D){const l=v(),m=R(),u=P(),r=w(),i=y();function f(){i.value.submit().then(()=>{h.emit("get-data-list"),a()})}function p(){a()}function a(){r.settings.tabbar.enable&&r.settings.tabbar.mergeTabsBy!=="activeMenu"?u.close({name:"pagesExampleGeneralManagerList"}):m.push({name:"pagesExampleGeneralManagerList"})}return(G,V)=>{const d=$,n=o("ElButton"),g=z,b=o("ElCol"),E=o("ElRow"),C=L,k=x;return M(),S("div",null,[e(g,{title:c(l).name==="routerName"?"新增用户":"编辑用户"},{default:t(()=>[e(n,{size:"default",round:"",onClick:a},{icon:t(()=>[e(d,{name:"i-ep:arrow-left"})]),default:t(()=>[s(" 返回 ")]),_:1})]),_:1},8,["title"]),e(C,null,{default:t(()=>[e(E,null,{default:t(()=>[e(b,{md:24,lg:16},{default:t(()=>[e(N,{id:c(l).params.id,ref_key:"formRef",ref:i},null,8,["id"])]),_:1})]),_:1})]),_:1}),e(k,null,{default:t(()=>[e(n,{type:"primary",size:"large",onClick:f},{default:t(()=>[s(" 提交 ")]),_:1}),e(n,{size:"large",onClick:p},{default:t(()=>[s(" 取消 ")]),_:1})]),_:1})])}}});typeof _=="function"&&_(T);export{T as default};
