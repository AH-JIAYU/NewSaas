
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{_ as E}from"./index-D_r6p223.js";import{d as v,H as B,I as k,v as R,r as w,a as n,o as y,b as M,f as e,w as t,g as s,i as c,x as S,_ as h,au as F,ap as z,L as D}from"./index-btWrETMt.js";import{D as I}from"./index-DY6FgP31.js";import{u as L}from"./useTabbar-DWGmOYFg.js";import"./index-x4fh5IXM.js";import"./zh_Hans-D3NILHdn.js";import"./zh_Hans-B39mJ-rS.js";const N=v({name:"MybillDetail",__name:"detail",setup(T){const l=B(),m=k(),_=L(),r=R(),i=w();function u(){i.value.submit().then(()=>{S.emit("get-data-list"),o()})}function p(){o()}function o(){r.settings.tabbar.enable&&r.settings.tabbar.mergeTabsBy!=="activeMenu"?_.close({name:"pagesExampleGeneralFormModeList"}):m.push({name:"pagesExampleGeneralFormModeList"})}return($,G)=>{const f=h,a=n("ElButton"),d=F,g=n("ElCol"),b=n("ElRow"),x=z,C=E;return y(),M("div",null,[e(d,{title:c(l).name==="routerName"?"新增我的账单":"编辑我的账单"},{default:t(()=>[e(a,{size:"default",round:"",onClick:o},{icon:t(()=>[e(f,{name:"i-ep:arrow-left"})]),default:t(()=>[s(" 返回 ")]),_:1})]),_:1},8,["title"]),e(x,null,{default:t(()=>[e(b,null,{default:t(()=>[e(g,{md:24,lg:16},{default:t(()=>[e(I,{id:c(l).params.id,ref_key:"formRef",ref:i},null,8,["id"])]),_:1})]),_:1})]),_:1}),e(C,null,{default:t(()=>[e(a,{type:"primary",size:"large",onClick:u},{default:t(()=>[s(" 提交 ")]),_:1}),e(a,{size:"large",onClick:p},{default:t(()=>[s(" 取消 ")]),_:1})]),_:1})])}}}),K=D(N,[["__scopeId","data-v-b78bce29"]]);export{K as default};
