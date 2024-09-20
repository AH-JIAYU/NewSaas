
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{_ as k}from"./index-D8IFh6v-.js";import{d as x,z as v,O as y,y as R,r as S,b as o,o as h,e as w,g as e,w as t,h as s,j as c,G as z,N as M,aB as N,ap as $,ao as _}from"./index-B9wLryVD.js";import{_ as G}from"./index.vue_vue_type_script_setup_true_lang-CEywC2Ci.js";import{u as T}from"./useTabbar-BU01F2xA.js";import"./tenant_role-DjmAaVU9.js";import"./configuration_role-CzkUcLDA.js";const L=x({name:"SettingUserDetail",__name:"detail",setup(P){const l=v(),m=y(),u=T(),r=R(),i=S();function f(){i.value.submit().then(()=>{z.emit("get-data-list"),n()})}function p(){n()}function n(){r.settings.tabbar.enable&&r.settings.tabbar.mergeTabsBy!=="activeMenu"?u.close({name:"pagesExampleGeneralManagerList"}):m.push({name:"pagesExampleGeneralManagerList"})}return(V,j)=>{const d=M,a=o("ElButton"),g=N,b=o("ElCol"),B=o("ElRow"),C=$,E=k;return h(),w("div",null,[e(g,{title:c(l).name==="routerName"?"新增用户":"编辑用户"},{default:t(()=>[e(a,{size:"default",round:"",onClick:n},{icon:t(()=>[e(d,{name:"i-ep:arrow-left"})]),default:t(()=>[s(" 返回 ")]),_:1})]),_:1},8,["title"]),e(C,null,{default:t(()=>[e(B,null,{default:t(()=>[e(b,{md:24,lg:16},{default:t(()=>[e(G,{id:c(l).params.id,ref_key:"formRef",ref:i},null,8,["id"])]),_:1})]),_:1})]),_:1}),e(E,null,{default:t(()=>[e(a,{type:"primary",size:"large",onClick:f},{default:t(()=>[s(" 提交 ")]),_:1}),e(a,{size:"large",onClick:p},{default:t(()=>[s(" 取消 ")]),_:1})]),_:1})])}}});typeof _=="function"&&_(L);export{L as default};
