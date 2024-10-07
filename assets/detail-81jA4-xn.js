
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{_ as B}from"./index-Cws-N43Z.js";import{d as v,I as x,J as y,y as R,r as S,a as o,o as w,b as h,f as e,w as t,g as s,i as c,z,_ as M,av as $,ap as N,ao as _}from"./index-CRiLI5We.js";import{_ as T}from"./index.vue_vue_type_script_setup_true_lang-JrmLh7k7.js";import{u as G}from"./useTabbar-BhO0_n7v.js";import"./tenant_role-COFGSdK7.js";import"./configuration_role-mdmOT2Ry.js";const I=v({name:"SettingUserDetail",__name:"detail",setup(L){const l=x(),m=y(),u=G(),r=R(),i=S();function f(){i.value.submit().then(()=>{z.emit("get-data-list"),n()})}function p(){n()}function n(){r.settings.tabbar.enable&&r.settings.tabbar.mergeTabsBy!=="activeMenu"?u.close({name:"pagesExampleGeneralManagerList"}):m.push({name:"pagesExampleGeneralManagerList"})}return(P,V)=>{const d=M,a=o("ElButton"),g=$,b=o("ElCol"),C=o("ElRow"),E=N,k=B;return w(),h("div",null,[e(g,{title:c(l).name==="routerName"?"新增用户":"编辑用户"},{default:t(()=>[e(a,{size:"default",round:"",onClick:n},{icon:t(()=>[e(d,{name:"i-ep:arrow-left"})]),default:t(()=>[s(" 返回 ")]),_:1})]),_:1},8,["title"]),e(E,null,{default:t(()=>[e(C,null,{default:t(()=>[e(b,{md:24,lg:16},{default:t(()=>[e(T,{id:c(l).params.id,ref_key:"formRef",ref:i},null,8,["id"])]),_:1})]),_:1})]),_:1}),e(k,null,{default:t(()=>[e(a,{type:"primary",size:"large",onClick:f},{default:t(()=>[s(" 提交 ")]),_:1}),e(a,{size:"large",onClick:p},{default:t(()=>[s(" 取消 ")]),_:1})]),_:1})])}}});typeof _=="function"&&_(I);export{I as default};
