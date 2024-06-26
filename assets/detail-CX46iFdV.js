
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{_ as v}from"./index-Cv_Z87ye.js";import{d as x,v as B,O as k,t as R,r as w,a as n,o as y,b as M,f as e,w as t,g as s,i as c,H as S,N as h,at as F,s as N,_ as z}from"./index-C9-fbFy3.js";import{D}from"./index-BBWj1pQ8.js";import{u as T}from"./useTabbar-B0-xiDGW.js";import"./index-g7cV2AAH.js";import"./zh_Hans-B39mJ-rS.js";const $=x({name:"MybillDetail",__name:"detail",setup(G){const l=B(),_=k(),m=T(),r=R(),i=w();function u(){i.value.submit().then(()=>{S.emit("get-data-list"),o()})}function f(){o()}function o(){r.settings.tabbar.enable&&r.settings.tabbar.mergeTabsBy!=="activeMenu"?m.close({name:"pagesExampleGeneralFormModeList"}):_.push({name:"pagesExampleGeneralFormModeList"})}return(H,I)=>{const p=h,a=n("ElButton"),d=F,g=n("ElCol"),b=n("ElRow"),C=N,E=v;return y(),M("div",null,[e(d,{title:c(l).name==="routerName"?"新增我的账单":"编辑我的账单"},{default:t(()=>[e(a,{size:"default",round:"",onClick:o},{icon:t(()=>[e(p,{name:"i-ep:arrow-left"})]),default:t(()=>[s(" 返回 ")]),_:1})]),_:1},8,["title"]),e(C,null,{default:t(()=>[e(b,null,{default:t(()=>[e(g,{md:24,lg:16},{default:t(()=>[e(D,{id:c(l).params.id,ref_key:"formRef",ref:i},null,8,["id"])]),_:1})]),_:1})]),_:1}),e(E,null,{default:t(()=>[e(a,{type:"primary",size:"large",onClick:u},{default:t(()=>[s(" 提交 ")]),_:1}),e(a,{size:"large",onClick:f},{default:t(()=>[s(" 取消 ")]),_:1})]),_:1})])}}}),q=z($,[["__scopeId","data-v-b78bce29"]]);export{q as default};
