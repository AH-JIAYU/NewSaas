
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{_ as k}from"./index-BxoETpZQ.js";import{d as x,I as v,J as y,y as R,r as S,a as o,o as w,b as h,f as e,w as t,g as s,i as c,z,_ as M,aB as $,ap as N,ao as _}from"./index-CXflPANZ.js";import{_ as T}from"./index.vue_vue_type_script_setup_true_lang-mRVUO8ir.js";import{u as G}from"./useTabbar-BWASMX3e.js";import"./tenant_role-B3jW5G_w.js";import"./configuration_role-BZUP7mjA.js";const I=x({name:"SettingUserDetail",__name:"detail",setup(L){const l=v(),m=y(),u=G(),r=R(),i=S();function f(){i.value.submit().then(()=>{z.emit("get-data-list"),n()})}function p(){n()}function n(){r.settings.tabbar.enable&&r.settings.tabbar.mergeTabsBy!=="activeMenu"?u.close({name:"pagesExampleGeneralManagerList"}):m.push({name:"pagesExampleGeneralManagerList"})}return(P,V)=>{const d=M,a=o("ElButton"),g=$,b=o("ElCol"),B=o("ElRow"),C=N,E=k;return w(),h("div",null,[e(g,{title:c(l).name==="routerName"?"新增用户":"编辑用户"},{default:t(()=>[e(a,{size:"default",round:"",onClick:n},{icon:t(()=>[e(d,{name:"i-ep:arrow-left"})]),default:t(()=>[s(" 返回 ")]),_:1})]),_:1},8,["title"]),e(C,null,{default:t(()=>[e(B,null,{default:t(()=>[e(b,{md:24,lg:16},{default:t(()=>[e(T,{id:c(l).params.id,ref_key:"formRef",ref:i},null,8,["id"])]),_:1})]),_:1})]),_:1}),e(E,null,{default:t(()=>[e(a,{type:"primary",size:"large",onClick:f},{default:t(()=>[s(" 提交 ")]),_:1}),e(a,{size:"large",onClick:p},{default:t(()=>[s(" 取消 ")]),_:1})]),_:1})])}}});typeof _=="function"&&_(I);export{I as default};
