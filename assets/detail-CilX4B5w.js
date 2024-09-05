
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{_ as E}from"./index-DFUPbfE3.js";import{d as x,z as k,O as v,y as R,r as y,a as n,o as w,b as M,f as e,w as t,g as s,i as c,G as S,N as h,aB as z,ap as F,R as N}from"./index-ChVS5QWJ.js";import{D}from"./index-DWCn9i6Z.js";import{u as G}from"./useTabbar-CAZvJo27.js";import"./index-CmTXxcxE.js";import"./zh_Hans-h1bdvWP1.js";import"./zh_Hans-B39mJ-rS.js";const T=x({name:"MybillDetail",__name:"detail",setup($){const l=k(),m=v(),_=G(),r=R(),i=y();function u(){i.value.submit().then(()=>{S.emit("get-data-list"),o()})}function p(){o()}function o(){r.settings.tabbar.enable&&r.settings.tabbar.mergeTabsBy!=="activeMenu"?_.close({name:"pagesExampleGeneralFormModeList"}):m.push({name:"pagesExampleGeneralFormModeList"})}return(I,L)=>{const f=h,a=n("ElButton"),d=z,g=n("ElCol"),b=n("ElRow"),B=F,C=E;return w(),M("div",null,[e(d,{title:c(l).name==="routerName"?"新增我的账单":"编辑我的账单"},{default:t(()=>[e(a,{size:"default",round:"",onClick:o},{icon:t(()=>[e(f,{name:"i-ep:arrow-left"})]),default:t(()=>[s(" 返回 ")]),_:1})]),_:1},8,["title"]),e(B,null,{default:t(()=>[e(b,null,{default:t(()=>[e(g,{md:24,lg:16},{default:t(()=>[e(D,{id:c(l).params.id,ref_key:"formRef",ref:i},null,8,["id"])]),_:1})]),_:1})]),_:1}),e(C,null,{default:t(()=>[e(a,{type:"primary",size:"large",onClick:u},{default:t(()=>[s(" 提交 ")]),_:1}),e(a,{size:"large",onClick:p},{default:t(()=>[s(" 取消 ")]),_:1})]),_:1})])}}}),J=N(T,[["__scopeId","data-v-b78bce29"]]);export{J as default};
