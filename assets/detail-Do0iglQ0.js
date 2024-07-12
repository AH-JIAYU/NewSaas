
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{_ as B}from"./index-B2VSdy2S.js";import{d as v,v as x,P as R,t as S,r as w,a as o,o as y,b as h,f as e,w as t,g as s,i as c,H as M,O as $,at as z,s as N,q as m}from"./index-Bh_VDJMf.js";import{_ as P}from"./index.vue_vue_type_script_setup_true_lang-Cgh-WFkc.js";import{u as T}from"./useTabbar-iIF_3ksk.js";import"./otherFunctions_basicDictionary-BAhY34-3.js";import"./basicDictionary-D-JQSrfT.js";import"./configuration_role-0CJlASLl.js";const G=v({name:"SettingUserDetail",__name:"detail",setup(H){const r=x(),_=R(),u=T(),l=S(),i=w();function f(){i.value.submit().then(()=>{M.emit("get-data-list"),n()})}function p(){n()}function n(){l.settings.tabbar.enable&&l.settings.tabbar.mergeTabsBy!=="activeMenu"?u.close({name:"pagesExampleGeneralManagerList"}):_.push({name:"pagesExampleGeneralManagerList"})}return(L,V)=>{const d=$,a=o("ElButton"),g=z,b=o("ElCol"),C=o("ElRow"),E=N,k=B;return y(),h("div",null,[e(g,{title:c(r).name==="routerName"?"新增用户":"编辑用户"},{default:t(()=>[e(a,{size:"default",round:"",onClick:n},{icon:t(()=>[e(d,{name:"i-ep:arrow-left"})]),default:t(()=>[s(" 返回 ")]),_:1})]),_:1},8,["title"]),e(E,null,{default:t(()=>[e(C,null,{default:t(()=>[e(b,{md:24,lg:16},{default:t(()=>[e(P,{id:c(r).params.id,ref_key:"formRef",ref:i},null,8,["id"])]),_:1})]),_:1})]),_:1}),e(k,null,{default:t(()=>[e(a,{type:"primary",size:"large",onClick:f},{default:t(()=>[s(" 提交 ")]),_:1}),e(a,{size:"large",onClick:p},{default:t(()=>[s(" 取消 ")]),_:1})]),_:1})])}}});typeof m=="function"&&m(G);export{G as default};
