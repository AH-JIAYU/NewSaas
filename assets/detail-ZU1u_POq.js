
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{_ as C}from"./index-BdmKhCtS.js";import{d as E,y as k,N as v,x as y,r as M,a as n,o as R,b as w,f as e,w as t,g as s,i as c,D as S,M as h,aB as D,an as F,Q as N}from"./index-D5mKHCpP.js";import{D as z}from"./index-BJ_QNz31.js";import{u as T}from"./useTabbar-D0k6uSDC.js";import"./index-BRzif-Pl.js";import"./zh_Hans-CdmNlI-1.js";import"./zh_Hans-B39mJ-rS.js";const $=E({name:"MybillDetail",__name:"detail",setup(G){const l=k(),m=v(),_=T(),r=y(),i=M();function u(){i.value.submit().then(()=>{S.emit("get-data-list"),o()})}function f(){o()}function o(){r.settings.tabbar.enable&&r.settings.tabbar.mergeTabsBy!=="activeMenu"?_.close({name:"pagesExampleGeneralFormModeList"}):m.push({name:"pagesExampleGeneralFormModeList"})}return(I,L)=>{const p=h,a=n("ElButton"),d=D,g=n("ElCol"),b=n("ElRow"),x=F,B=C;return R(),w("div",null,[e(d,{title:c(l).name==="routerName"?"新增我的账单":"编辑我的账单"},{default:t(()=>[e(a,{size:"default",round:"",onClick:o},{icon:t(()=>[e(p,{name:"i-ep:arrow-left"})]),default:t(()=>[s(" 返回 ")]),_:1})]),_:1},8,["title"]),e(x,null,{default:t(()=>[e(b,null,{default:t(()=>[e(g,{md:24,lg:16},{default:t(()=>[e(z,{id:c(l).params.id,ref_key:"formRef",ref:i},null,8,["id"])]),_:1})]),_:1})]),_:1}),e(B,null,{default:t(()=>[e(a,{type:"primary",size:"large",onClick:u},{default:t(()=>[s(" 提交 ")]),_:1}),e(a,{size:"large",onClick:f},{default:t(()=>[s(" 取消 ")]),_:1})]),_:1})])}}}),J=N($,[["__scopeId","data-v-b78bce29"]]);export{J as default};
