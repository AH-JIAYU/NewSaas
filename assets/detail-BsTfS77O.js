
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{_ as E}from"./index-pbv2Dwiw.js";import{d as B,n as k,G as v,l as R,r as w,a as n,o as y,b as F,f as e,w as t,g as s,i as c,x as M,F as S,at as h,aj as z,J as G}from"./index-CHE_Y-qx.js";import N from"./index-BMyQJF8D.js";import{u as T}from"./useTabbar-BP1Pwett.js";import"./index-CJWwRMMv.js";import"./zh_Hans-Cuq79kyC.js";import"./zh_Hans-B39mJ-rS.js";import"./announcement-BBPB0Gy-.js";const $=B({name:"MybillDetail",__name:"detail",setup(D){const l=k(),m=v(),_=T(),r=R(),i=w();function u(){i.value.submit().then(()=>{M.emit("get-data-list"),o()})}function p(){o()}function o(){r.settings.tabbar.enable&&r.settings.tabbar.mergeTabsBy!=="activeMenu"?_.close({name:"pagesExampleGeneralFormModeList"}):m.push({name:"pagesExampleGeneralFormModeList"})}return(I,L)=>{const f=S,a=n("ElButton"),d=h,g=n("ElCol"),b=n("ElRow"),x=z,C=E;return y(),F("div",null,[e(d,{title:c(l).name==="routerName"?"新增我的账单":"编辑我的账单"},{default:t(()=>[e(a,{size:"default",round:"",onClick:o},{icon:t(()=>[e(f,{name:"i-ep:arrow-left"})]),default:t(()=>[s(" 返回 ")]),_:1})]),_:1},8,["title"]),e(x,null,{default:t(()=>[e(b,null,{default:t(()=>[e(g,{md:24,lg:16},{default:t(()=>[e(N,{id:c(l).params.id,ref_key:"formRef",ref:i},null,8,["id"])]),_:1})]),_:1})]),_:1}),e(C,null,{default:t(()=>[e(a,{type:"primary",size:"large",onClick:u},{default:t(()=>[s(" 提交 ")]),_:1}),e(a,{size:"large",onClick:p},{default:t(()=>[s(" 取消 ")]),_:1})]),_:1})])}}}),O=G($,[["__scopeId","data-v-b78bce29"]]);export{O as default};
