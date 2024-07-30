
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{_ as E}from"./index-BR8OZnQy.js";import{d as v,s as x,M as R,q as S,r as w,a as o,o as y,b as M,f as e,w as t,g as s,i as c,B as h,L as $,av as z,al as L,ak as _}from"./index-DoiK1_dJ.js";import{_ as N}from"./index.vue_vue_type_script_setup_true_lang-BdBBOaTZ.js";import{u as T}from"./useTabbar-BfNOz3n3.js";import"./configuration_role-DDW_9wi7.js";const G=v({name:"SettingUserDetail",__name:"detail",setup(P){const l=x(),u=R(),m=T(),r=S(),i=w();function f(){i.value.submit().then(()=>{h.emit("get-data-list"),n()})}function p(){n()}function n(){r.settings.tabbar.enable&&r.settings.tabbar.mergeTabsBy!=="activeMenu"?m.close({name:"pagesExampleGeneralManagerList"}):u.push({name:"pagesExampleGeneralManagerList"})}return(V,q)=>{const d=$,a=o("ElButton"),g=z,b=o("ElCol"),k=o("ElRow"),B=L,C=E;return y(),M("div",null,[e(g,{title:c(l).name==="routerName"?"新增用户":"编辑用户"},{default:t(()=>[e(a,{size:"default",round:"",onClick:n},{icon:t(()=>[e(d,{name:"i-ep:arrow-left"})]),default:t(()=>[s(" 返回 ")]),_:1})]),_:1},8,["title"]),e(B,null,{default:t(()=>[e(k,null,{default:t(()=>[e(b,{md:24,lg:16},{default:t(()=>[e(N,{id:c(l).params.id,ref_key:"formRef",ref:i},null,8,["id"])]),_:1})]),_:1})]),_:1}),e(C,null,{default:t(()=>[e(a,{type:"primary",size:"large",onClick:f},{default:t(()=>[s(" 提交 ")]),_:1}),e(a,{size:"large",onClick:p},{default:t(()=>[s(" 取消 ")]),_:1})]),_:1})])}}});typeof _=="function"&&_(G);export{G as default};
