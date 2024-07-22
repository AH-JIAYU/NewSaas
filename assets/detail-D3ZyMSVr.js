
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{_ as E}from"./index-_DNOuJFE.js";import{d as x,q as v,M as R,p as S,r as w,a as o,o as y,b as M,f as e,w as t,g as s,i as c,B as h,L as $,at as z,ak as L,aj as m}from"./index-BCmcck4o.js";import{_ as N}from"./index.vue_vue_type_script_setup_true_lang-knDwacrp.js";import{u as T}from"./useTabbar-C38ff8EA.js";import"./otherFunctions_basicDictionary-BNHwmyh7.js";import"./basicDictionary-B2_wNbhc.js";import"./configuration_role-DrCUF-T_.js";const G=x({name:"SettingUserDetail",__name:"detail",setup(P){const r=v(),_=R(),u=T(),l=S(),i=w();function f(){i.value.submit().then(()=>{h.emit("get-data-list"),n()})}function p(){n()}function n(){l.settings.tabbar.enable&&l.settings.tabbar.mergeTabsBy!=="activeMenu"?u.close({name:"pagesExampleGeneralManagerList"}):_.push({name:"pagesExampleGeneralManagerList"})}return(V,j)=>{const d=$,a=o("ElButton"),g=z,b=o("ElCol"),k=o("ElRow"),B=L,C=E;return y(),M("div",null,[e(g,{title:c(r).name==="routerName"?"新增用户":"编辑用户"},{default:t(()=>[e(a,{size:"default",round:"",onClick:n},{icon:t(()=>[e(d,{name:"i-ep:arrow-left"})]),default:t(()=>[s(" 返回 ")]),_:1})]),_:1},8,["title"]),e(B,null,{default:t(()=>[e(k,null,{default:t(()=>[e(b,{md:24,lg:16},{default:t(()=>[e(N,{id:c(r).params.id,ref_key:"formRef",ref:i},null,8,["id"])]),_:1})]),_:1})]),_:1}),e(C,null,{default:t(()=>[e(a,{type:"primary",size:"large",onClick:f},{default:t(()=>[s(" 提交 ")]),_:1}),e(a,{size:"large",onClick:p},{default:t(()=>[s(" 取消 ")]),_:1})]),_:1})])}}});typeof m=="function"&&m(G);export{G as default};
