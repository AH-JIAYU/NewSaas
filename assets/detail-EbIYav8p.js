
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{_ as E}from"./index-DLFhUZUD.js";import{d as x,z as k,O as v,y as R,r as y,b as n,o as h,e as w,g as e,w as t,h as s,j as c,G as M,N as S,aB as z,ap as F,R as N}from"./index-BKSxisHz.js";import{D}from"./index-Du5YDQY_.js";import{u as G}from"./useTabbar-CFgco6Cv.js";import"./index-CPFTf28q.js";import"./zh_Hans-C0Lvyw3A.js";import"./zh_Hans-B39mJ-rS.js";const T=x({name:"MybillDetail",__name:"detail",setup($){const l=k(),m=v(),_=G(),r=R(),i=y();function u(){i.value.submit().then(()=>{M.emit("get-data-list"),o()})}function p(){o()}function o(){r.settings.tabbar.enable&&r.settings.tabbar.mergeTabsBy!=="activeMenu"?_.close({name:"pagesExampleGeneralFormModeList"}):m.push({name:"pagesExampleGeneralFormModeList"})}return(I,L)=>{const f=S,a=n("ElButton"),d=z,g=n("ElCol"),b=n("ElRow"),B=F,C=E;return h(),w("div",null,[e(d,{title:c(l).name==="routerName"?"新增我的账单":"编辑我的账单"},{default:t(()=>[e(a,{size:"default",round:"",onClick:o},{icon:t(()=>[e(f,{name:"i-ep:arrow-left"})]),default:t(()=>[s(" 返回 ")]),_:1})]),_:1},8,["title"]),e(B,null,{default:t(()=>[e(b,null,{default:t(()=>[e(g,{md:24,lg:16},{default:t(()=>[e(D,{id:c(l).params.id,ref_key:"formRef",ref:i},null,8,["id"])]),_:1})]),_:1})]),_:1}),e(C,null,{default:t(()=>[e(a,{type:"primary",size:"large",onClick:u},{default:t(()=>[s(" 提交 ")]),_:1}),e(a,{size:"large",onClick:p},{default:t(()=>[s(" 取消 ")]),_:1})]),_:1})])}}}),J=N(T,[["__scopeId","data-v-b78bce29"]]);export{J as default};
