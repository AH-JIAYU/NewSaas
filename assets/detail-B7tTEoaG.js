
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{_ as v}from"./index-CZLMNveZ.js";import{d as x,H as B,I as R,v as S,r as w,a as o,o as y,b as h,f as e,w as t,g as s,i as c,x as M,_ as $,av as z,ap as N,ao as _}from"./index-Ci7w1hVZ.js";import{_ as T}from"./index.vue_vue_type_script_setup_true_lang-BXdYZPx9.js";import{u as G}from"./useTabbar-CUKehOZr.js";import"./tenant_role-DSGJukTy.js";import"./configuration_role-zRYRARA3.js";const H=x({name:"SettingUserDetail",__name:"detail",setup(I){const l=B(),m=R(),u=G(),r=S(),i=w();function f(){i.value.submit().then(()=>{M.emit("get-data-list"),n()})}function p(){n()}function n(){r.settings.tabbar.enable&&r.settings.tabbar.mergeTabsBy!=="activeMenu"?u.close({name:"pagesExampleGeneralManagerList"}):m.push({name:"pagesExampleGeneralManagerList"})}return(L,P)=>{const d=$,a=o("ElButton"),g=z,b=o("ElCol"),C=o("ElRow"),E=N,k=v;return y(),h("div",null,[e(g,{title:c(l).name==="routerName"?"新增用户":"编辑用户"},{default:t(()=>[e(a,{size:"default",round:"",onClick:n},{icon:t(()=>[e(d,{name:"i-ep:arrow-left"})]),default:t(()=>[s(" 返回 ")]),_:1})]),_:1},8,["title"]),e(E,null,{default:t(()=>[e(C,null,{default:t(()=>[e(b,{md:24,lg:16},{default:t(()=>[e(T,{id:c(l).params.id,ref_key:"formRef",ref:i},null,8,["id"])]),_:1})]),_:1})]),_:1}),e(k,null,{default:t(()=>[e(a,{type:"primary",size:"large",onClick:f},{default:t(()=>[s(" 提交 ")]),_:1}),e(a,{size:"large",onClick:p},{default:t(()=>[s(" 取消 ")]),_:1})]),_:1})])}}});typeof _=="function"&&_(H);export{H as default};
