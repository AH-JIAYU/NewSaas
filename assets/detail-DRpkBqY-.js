
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{_ as B}from"./index-ouZ2CBU5.js";import{d as x,q as v,s as R,u as S,r as h,a2 as o,a as w,i as y,f as e,w as t,g as s,h as c,e as M,_ as $,aC as z,ao as N,an as _}from"./index-C7IrLSdY.js";import{_ as T}from"./index.vue_vue_type_script_setup_true_lang-clWEGhzQ.js";import{u as G}from"./useTabbar-CX-ZlMwC.js";import"./tenant_role-CMzvXC6f.js";import"./configuration_role-vXU0AvXX.js";const L=x({name:"SettingUserDetail",__name:"detail",setup(P){const l=v(),u=R(),m=G(),r=S(),i=h();function f(){i.value.submit().then(()=>{M.emit("get-data-list"),n()})}function p(){n()}function n(){r.settings.tabbar.enable&&r.settings.tabbar.mergeTabsBy!=="activeMenu"?m.close({name:"pagesExampleGeneralManagerList"}):u.push({name:"pagesExampleGeneralManagerList"})}return(V,q)=>{const d=$,a=o("ElButton"),g=z,b=o("ElCol"),C=o("ElRow"),E=N,k=B;return w(),y("div",null,[e(g,{title:c(l).name==="routerName"?"新增用户":"编辑用户"},{default:t(()=>[e(a,{size:"default",round:"",onClick:n},{icon:t(()=>[e(d,{name:"i-ep:arrow-left"})]),default:t(()=>[s(" 返回 ")]),_:1})]),_:1},8,["title"]),e(E,null,{default:t(()=>[e(C,null,{default:t(()=>[e(b,{md:24,lg:16},{default:t(()=>[e(T,{id:c(l).params.id,ref_key:"formRef",ref:i},null,8,["id"])]),_:1})]),_:1})]),_:1}),e(k,null,{default:t(()=>[e(a,{type:"primary",size:"large",onClick:f},{default:t(()=>[s(" 提交 ")]),_:1}),e(a,{size:"large",onClick:p},{default:t(()=>[s(" 取消 ")]),_:1})]),_:1})])}}});typeof _=="function"&&_(L);export{L as default};
