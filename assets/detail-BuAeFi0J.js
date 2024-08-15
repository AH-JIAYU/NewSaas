
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{_ as x}from"./index-C4irRxFb.js";import{d as B,x as v,M as R,v as S,r as w,a as o,o as y,b as M,f as e,w as t,g as s,i as c,C as h,L as $,aE as z,aq as L,ap as _}from"./index-DntGxMRg.js";import{_ as N}from"./index.vue_vue_type_script_setup_true_lang-CJ7UvmOG.js";import{u as T}from"./useTabbar-BIk3kekB.js";import"./tenant_role-DFFVIXjM.js";import"./configuration_role-9yA6ue5l.js";const G=B({name:"SettingUserDetail",__name:"detail",setup(P){const l=v(),m=R(),u=T(),r=S(),i=w();function f(){i.value.submit().then(()=>{h.emit("get-data-list"),n()})}function p(){n()}function n(){r.settings.tabbar.enable&&r.settings.tabbar.mergeTabsBy!=="activeMenu"?u.close({name:"pagesExampleGeneralManagerList"}):m.push({name:"pagesExampleGeneralManagerList"})}return(V,q)=>{const d=$,a=o("ElButton"),g=z,b=o("ElCol"),C=o("ElRow"),E=L,k=x;return y(),M("div",null,[e(g,{title:c(l).name==="routerName"?"新增用户":"编辑用户"},{default:t(()=>[e(a,{size:"default",round:"",onClick:n},{icon:t(()=>[e(d,{name:"i-ep:arrow-left"})]),default:t(()=>[s(" 返回 ")]),_:1})]),_:1},8,["title"]),e(E,null,{default:t(()=>[e(C,null,{default:t(()=>[e(b,{md:24,lg:16},{default:t(()=>[e(N,{id:c(l).params.id,ref_key:"formRef",ref:i},null,8,["id"])]),_:1})]),_:1})]),_:1}),e(k,null,{default:t(()=>[e(a,{type:"primary",size:"large",onClick:f},{default:t(()=>[s(" 提交 ")]),_:1}),e(a,{size:"large",onClick:p},{default:t(()=>[s(" 取消 ")]),_:1})]),_:1})])}}});typeof _=="function"&&_(G);export{G as default};
