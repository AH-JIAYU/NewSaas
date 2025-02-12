
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{_ as x}from"./index-CGCWvo8T.js";import{d as B,q as k,s as v,u as y,r as R,a2 as n,a as h,i as w,f as e,w as t,g as s,h as c,e as M,_ as S,aC as F,ao as z,y as D}from"./index-D3S8ejkd.js";import{D as N}from"./index-Dk-39tN9.js";import{u as T}from"./useTabbar-MG2kerTi.js";import"./index-Bupd0cE7.js";import"./index-iJRjh0Y-.js";import"./zh_Hans-CrfEz-Jr.js";const $=B({name:"MybillDetail",__name:"detail",setup(G){const l=k(),m=v(),_=T(),r=y(),i=R();function u(){i.value.submit().then(()=>{M.emit("get-data-list"),o()})}function f(){o()}function o(){r.settings.tabbar.enable&&r.settings.tabbar.mergeTabsBy!=="activeMenu"?_.close({name:"pagesExampleGeneralFormModeList"}):m.push({name:"pagesExampleGeneralFormModeList"})}return(I,L)=>{const p=S,a=n("ElButton"),d=F,g=n("ElCol"),b=n("ElRow"),C=z,E=x;return h(),w("div",null,[e(d,{title:c(l).name==="routerName"?"新增我的账单":"编辑我的账单"},{default:t(()=>[e(a,{size:"default",round:"",onClick:o},{icon:t(()=>[e(p,{name:"i-ep:arrow-left"})]),default:t(()=>[s(" 返回 ")]),_:1})]),_:1},8,["title"]),e(C,null,{default:t(()=>[e(b,null,{default:t(()=>[e(g,{md:24,lg:16},{default:t(()=>[e(N,{id:c(l).params.id,ref_key:"formRef",ref:i},null,8,["id"])]),_:1})]),_:1})]),_:1}),e(E,null,{default:t(()=>[e(a,{type:"primary",size:"large",onClick:u},{default:t(()=>[s(" 提交 ")]),_:1}),e(a,{size:"large",onClick:f},{default:t(()=>[s(" 取消 ")]),_:1})]),_:1})])}}}),K=D($,[["__scopeId","data-v-b78bce29"]]);export{K as default};
