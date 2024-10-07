
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{_ as E}from"./index-CfD_lwVw.js";import{d as x,I as k,J as v,y,r as M,a as n,o as R,b as w,f as e,w as t,g as s,i as c,z as S,_ as h,aB as z,ap as F,M as D}from"./index-BldWHR0B.js";import{D as I}from"./index-BQLvV7ho.js";import{u as N}from"./useTabbar-DrSqEhti.js";import"./index-pjAGizuk.js";import"./zh_Hans-B0EGZami.js";import"./zh_Hans-B39mJ-rS.js";const T=x({name:"MybillDetail",__name:"detail",setup($){const l=k(),m=v(),_=N(),r=y(),i=M();function u(){i.value.submit().then(()=>{S.emit("get-data-list"),o()})}function p(){o()}function o(){r.settings.tabbar.enable&&r.settings.tabbar.mergeTabsBy!=="activeMenu"?_.close({name:"pagesExampleGeneralFormModeList"}):m.push({name:"pagesExampleGeneralFormModeList"})}return(G,L)=>{const f=h,a=n("ElButton"),d=z,g=n("ElCol"),b=n("ElRow"),B=F,C=E;return R(),w("div",null,[e(d,{title:c(l).name==="routerName"?"新增我的账单":"编辑我的账单"},{default:t(()=>[e(a,{size:"default",round:"",onClick:o},{icon:t(()=>[e(f,{name:"i-ep:arrow-left"})]),default:t(()=>[s(" 返回 ")]),_:1})]),_:1},8,["title"]),e(B,null,{default:t(()=>[e(b,null,{default:t(()=>[e(g,{md:24,lg:16},{default:t(()=>[e(I,{id:c(l).params.id,ref_key:"formRef",ref:i},null,8,["id"])]),_:1})]),_:1})]),_:1}),e(C,null,{default:t(()=>[e(a,{type:"primary",size:"large",onClick:u},{default:t(()=>[s(" 提交 ")]),_:1}),e(a,{size:"large",onClick:p},{default:t(()=>[s(" 取消 ")]),_:1})]),_:1})])}}}),K=D(T,[["__scopeId","data-v-b78bce29"]]);export{K as default};
