
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{_ as B}from"./index-C4mQSFwt.js";import{d as x,s as v,K as R,q as S,r as w,a as o,o as y,b as h,f as e,w as t,g as s,i as c,z,J as M,at as $,aj as N,ai as _}from"./index-CN3B1iWi.js";import{_ as T}from"./index.vue_vue_type_script_setup_true_lang-Od3SslH1.js";import{u as G}from"./useTabbar-CSZxznGO.js";import"./configuration_role-QFhqEi8O.js";const L=x({name:"SettingUserDetail",__name:"detail",setup(P){const l=v(),u=R(),m=G(),r=S(),i=w();function f(){i.value.submit().then(()=>{z.emit("get-data-list"),n()})}function p(){n()}function n(){r.settings.tabbar.enable&&r.settings.tabbar.mergeTabsBy!=="activeMenu"?m.close({name:"pagesExampleGeneralManagerList"}):u.push({name:"pagesExampleGeneralManagerList"})}return(V,j)=>{const d=M,a=o("ElButton"),g=$,b=o("ElCol"),C=o("ElRow"),E=N,k=B;return y(),h("div",null,[e(g,{title:c(l).name==="routerName"?"新增用户":"编辑用户"},{default:t(()=>[e(a,{size:"default",round:"",onClick:n},{icon:t(()=>[e(d,{name:"i-ep:arrow-left"})]),default:t(()=>[s(" 返回 ")]),_:1})]),_:1},8,["title"]),e(E,null,{default:t(()=>[e(C,null,{default:t(()=>[e(b,{md:24,lg:16},{default:t(()=>[e(T,{id:c(l).params.id,ref_key:"formRef",ref:i},null,8,["id"])]),_:1})]),_:1})]),_:1}),e(k,null,{default:t(()=>[e(a,{type:"primary",size:"large",onClick:f},{default:t(()=>[s(" 提交 ")]),_:1}),e(a,{size:"large",onClick:p},{default:t(()=>[s(" 取消 ")]),_:1})]),_:1})])}}});typeof _=="function"&&_(L);export{L as default};
