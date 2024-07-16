
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{_ as k}from"./index-DFSDwJHu.js";import{d as x,s as B,M as v,q as M,r as R,a as n,o as w,b as y,f as e,w as t,g as s,i as c,C as S,L as h,at as F,ak as z,P as D}from"./index-DcR1bT4S.js";import{D as L}from"./index-pVfKlhNJ.js";import{u as N}from"./useTabbar-BiBAapmD.js";import"./index-Jl6LMcm1.js";import"./zh_Hans-B39mJ-rS.js";const P=x({name:"MybillDetail",__name:"detail",setup(T){const l=B(),m=v(),_=N(),r=M(),i=R();function u(){i.value.submit().then(()=>{S.emit("get-data-list"),o()})}function f(){o()}function o(){r.settings.tabbar.enable&&r.settings.tabbar.mergeTabsBy!=="activeMenu"?_.close({name:"pagesExampleGeneralFormModeList"}):m.push({name:"pagesExampleGeneralFormModeList"})}return($,G)=>{const p=h,a=n("ElButton"),d=F,g=n("ElCol"),b=n("ElRow"),C=z,E=k;return w(),y("div",null,[e(d,{title:c(l).name==="routerName"?"新增我的账单":"编辑我的账单"},{default:t(()=>[e(a,{size:"default",round:"",onClick:o},{icon:t(()=>[e(p,{name:"i-ep:arrow-left"})]),default:t(()=>[s(" 返回 ")]),_:1})]),_:1},8,["title"]),e(C,null,{default:t(()=>[e(b,null,{default:t(()=>[e(g,{md:24,lg:16},{default:t(()=>[e(L,{id:c(l).params.id,ref_key:"formRef",ref:i},null,8,["id"])]),_:1})]),_:1})]),_:1}),e(E,null,{default:t(()=>[e(a,{type:"primary",size:"large",onClick:u},{default:t(()=>[s(" 提交 ")]),_:1}),e(a,{size:"large",onClick:f},{default:t(()=>[s(" 取消 ")]),_:1})]),_:1})])}}}),J=D(P,[["__scopeId","data-v-b78bce29"]]);export{J as default};
