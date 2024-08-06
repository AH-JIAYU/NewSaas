
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{_ as x}from"./index-nDRmKO3V.js";import{d as B,s as k,K as v,q as R,r as w,a as n,o as y,b as M,f as e,w as t,g as s,i as c,z as S,J as h,at as z,aj as F,N}from"./index-C7bD4Y39.js";import{D}from"./index-Bg5hiIPd.js";import{u as T}from"./useTabbar-B6ngmBD5.js";import"./index-D2IaOVB1.js";import"./zh_Hans-DleLUv_L.js";import"./zh_Hans-B39mJ-rS.js";const $=B({name:"MybillDetail",__name:"detail",setup(G){const l=k(),m=v(),_=T(),r=R(),i=w();function u(){i.value.submit().then(()=>{S.emit("get-data-list"),o()})}function f(){o()}function o(){r.settings.tabbar.enable&&r.settings.tabbar.mergeTabsBy!=="activeMenu"?_.close({name:"pagesExampleGeneralFormModeList"}):m.push({name:"pagesExampleGeneralFormModeList"})}return(I,L)=>{const p=h,a=n("ElButton"),d=z,g=n("ElCol"),b=n("ElRow"),C=F,E=x;return y(),M("div",null,[e(d,{title:c(l).name==="routerName"?"新增我的账单":"编辑我的账单"},{default:t(()=>[e(a,{size:"default",round:"",onClick:o},{icon:t(()=>[e(p,{name:"i-ep:arrow-left"})]),default:t(()=>[s(" 返回 ")]),_:1})]),_:1},8,["title"]),e(C,null,{default:t(()=>[e(b,null,{default:t(()=>[e(g,{md:24,lg:16},{default:t(()=>[e(D,{id:c(l).params.id,ref_key:"formRef",ref:i},null,8,["id"])]),_:1})]),_:1})]),_:1}),e(E,null,{default:t(()=>[e(a,{type:"primary",size:"large",onClick:u},{default:t(()=>[s(" 提交 ")]),_:1}),e(a,{size:"large",onClick:f},{default:t(()=>[s(" 取消 ")]),_:1})]),_:1})])}}}),K=N($,[["__scopeId","data-v-b78bce29"]]);export{K as default};
