
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{_ as x}from"./index-fEMnTvJj.js";import{d as B,s as k,M as v,q as M,r as R,a as n,o as w,b as y,f as e,w as t,g as s,i as c,E as S,L as h,at as F,p as z,_ as D}from"./index-13Balsai.js";import{D as L}from"./index-DOhHYqQq.js";import{u as N}from"./useTabbar-6x9eIbQX.js";import"./index-CuYjvna3.js";import"./zh_Hans-B39mJ-rS.js";const T=B({name:"MybillDetail",__name:"detail",setup($){const l=k(),_=v(),m=N(),r=M(),i=R();function u(){i.value.submit().then(()=>{S.emit("get-data-list"),o()})}function f(){o()}function o(){r.settings.tabbar.enable&&r.settings.tabbar.mergeTabsBy!=="activeMenu"?m.close({name:"pagesExampleGeneralFormModeList"}):_.push({name:"pagesExampleGeneralFormModeList"})}return(G,I)=>{const p=h,a=n("ElButton"),d=F,g=n("ElCol"),b=n("ElRow"),E=z,C=x;return w(),y("div",null,[e(d,{title:c(l).name==="routerName"?"新增我的账单":"编辑我的账单"},{default:t(()=>[e(a,{size:"default",round:"",onClick:o},{icon:t(()=>[e(p,{name:"i-ep:arrow-left"})]),default:t(()=>[s(" 返回 ")]),_:1})]),_:1},8,["title"]),e(E,null,{default:t(()=>[e(b,null,{default:t(()=>[e(g,{md:24,lg:16},{default:t(()=>[e(L,{id:c(l).params.id,ref_key:"formRef",ref:i},null,8,["id"])]),_:1})]),_:1})]),_:1}),e(C,null,{default:t(()=>[e(a,{type:"primary",size:"large",onClick:u},{default:t(()=>[s(" 提交 ")]),_:1}),e(a,{size:"large",onClick:f},{default:t(()=>[s(" 取消 ")]),_:1})]),_:1})])}}}),J=D(T,[["__scopeId","data-v-b78bce29"]]);export{J as default};
