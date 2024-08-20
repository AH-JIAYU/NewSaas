
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{_ as x}from"./index-DAdDgijk.js";import{d as B,z as k,O as v,y as R,r as y,a as n,o as w,b as M,f as e,w as t,g as s,i as c,G as S,N as h,aE as z,aq as F,R as N}from"./index-BCb3LVAr.js";import G from"./index-Bfuv5i6I.js";import{u as T}from"./useTabbar-HHG2FLVc.js";import"./configuration_manager-mGWjNn5m.js";import"./department-Do-qvgMO.js";const $=B({name:"MybillDetail",__name:"detail",setup(D){const l=k(),m=v(),_=T(),r=R(),i=y();function u(){i.value.submit().then(()=>{S.emit("get-data-list"),o()})}function f(){o()}function o(){r.settings.tabbar.enable&&r.settings.tabbar.mergeTabsBy!=="activeMenu"?_.close({name:"pagesExampleGeneralFormModeList"}):m.push({name:"pagesExampleGeneralFormModeList"})}return(I,L)=>{const p=h,a=n("ElButton"),d=z,g=n("ElCol"),b=n("ElRow"),E=F,C=x;return w(),M("div",null,[e(d,{title:c(l).name==="routerName"?"新增我的账单":"编辑我的账单"},{default:t(()=>[e(a,{size:"default",round:"",onClick:o},{icon:t(()=>[e(p,{name:"i-ep:arrow-left"})]),default:t(()=>[s(" 返回 ")]),_:1})]),_:1},8,["title"]),e(E,null,{default:t(()=>[e(b,null,{default:t(()=>[e(g,{md:24,lg:16},{default:t(()=>[e(G,{id:c(l).params.id,ref_key:"formRef",ref:i},null,8,["id"])]),_:1})]),_:1})]),_:1}),e(C,null,{default:t(()=>[e(a,{type:"primary",size:"large",onClick:u},{default:t(()=>[s(" 提交 ")]),_:1}),e(a,{size:"large",onClick:f},{default:t(()=>[s(" 取消 ")]),_:1})]),_:1})])}}}),j=N($,[["__scopeId","data-v-a76f4108"]]);export{j as default};
