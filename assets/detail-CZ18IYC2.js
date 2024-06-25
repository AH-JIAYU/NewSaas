
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{_ as B}from"./index-CT9Voe5n.js";import{d as v,v as x,O as R,t as S,r as w,a as o,o as y,b as h,f as e,w as t,g as s,i as c,H as M,N,at as $,s as z,q as m}from"./index-DakY7-gQ.js";import{_ as T}from"./index.vue_vue_type_script_setup_true_lang-rlslZI_J.js";import{u as G}from"./useTabbar-B5Y0o2MY.js";import"./otherFunctions_basicDictionary-CaS-7DdA.js";import"./basicDictionary-KFj2mMUc.js";import"./configuration_role-BNds21mD.js";const H=v({name:"SettingUserDetail",__name:"detail",setup(L){const r=x(),_=R(),u=G(),l=S(),i=w();function f(){i.value.submit().then(()=>{M.emit("get-data-list"),n()})}function p(){n()}function n(){l.settings.tabbar.enable&&l.settings.tabbar.mergeTabsBy!=="activeMenu"?u.close({name:"pagesExampleGeneralManagerList"}):_.push({name:"pagesExampleGeneralManagerList"})}return(P,V)=>{const d=N,a=o("ElButton"),g=$,b=o("ElCol"),C=o("ElRow"),E=z,k=B;return y(),h("div",null,[e(g,{title:c(r).name==="routerName"?"新增用户":"编辑用户"},{default:t(()=>[e(a,{size:"default",round:"",onClick:n},{icon:t(()=>[e(d,{name:"i-ep:arrow-left"})]),default:t(()=>[s(" 返回 ")]),_:1})]),_:1},8,["title"]),e(E,null,{default:t(()=>[e(C,null,{default:t(()=>[e(b,{md:24,lg:16},{default:t(()=>[e(T,{id:c(r).params.id,ref_key:"formRef",ref:i},null,8,["id"])]),_:1})]),_:1})]),_:1}),e(k,null,{default:t(()=>[e(a,{type:"primary",size:"large",onClick:f},{default:t(()=>[s(" 提交 ")]),_:1}),e(a,{size:"large",onClick:p},{default:t(()=>[s(" 取消 ")]),_:1})]),_:1})])}}});typeof m=="function"&&m(H);export{H as default};
