
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{_ as x}from"./index-D4XA0xCG.js";import{d as B,y as v,N as y,x as R,r as S,a as o,o as w,b as M,f as e,w as t,g as s,i as c,D as h,M as N,aD as $,ap as z,ao as _}from"./index-XUp5c_5V.js";import{_ as D}from"./index.vue_vue_type_script_setup_true_lang-C8MptgtL.js";import{u as T}from"./useTabbar-Ch-vg-Nu.js";import"./configuration_role-CjhlY4M4.js";const G=B({name:"SettingUserDetail",__name:"detail",setup(L){const l=v(),u=y(),m=T(),r=R(),i=S();function f(){i.value.submit().then(()=>{h.emit("get-data-list"),n()})}function p(){n()}function n(){r.settings.tabbar.enable&&r.settings.tabbar.mergeTabsBy!=="activeMenu"?m.close({name:"pagesExampleGeneralManagerList"}):u.push({name:"pagesExampleGeneralManagerList"})}return(P,V)=>{const d=N,a=o("ElButton"),g=$,b=o("ElCol"),C=o("ElRow"),E=z,k=x;return w(),M("div",null,[e(g,{title:c(l).name==="routerName"?"新增用户":"编辑用户"},{default:t(()=>[e(a,{size:"default",round:"",onClick:n},{icon:t(()=>[e(d,{name:"i-ep:arrow-left"})]),default:t(()=>[s(" 返回 ")]),_:1})]),_:1},8,["title"]),e(E,null,{default:t(()=>[e(C,null,{default:t(()=>[e(b,{md:24,lg:16},{default:t(()=>[e(D,{id:c(l).params.id,ref_key:"formRef",ref:i},null,8,["id"])]),_:1})]),_:1})]),_:1}),e(k,null,{default:t(()=>[e(a,{type:"primary",size:"large",onClick:f},{default:t(()=>[s(" 提交 ")]),_:1}),e(a,{size:"large",onClick:p},{default:t(()=>[s(" 取消 ")]),_:1})]),_:1})])}}});typeof _=="function"&&_(G);export{G as default};
