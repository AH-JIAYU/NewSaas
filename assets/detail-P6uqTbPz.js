
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{_ as E}from"./index-DGyvJnoz.js";import{d as v,v as x,K as k,s as R,r as w,a as n,o as S,b as h,f as e,w as t,g as s,i as c,B as y,J as F,au as M,am as N,N as z}from"./index-CyRDEfVX.js";import{D}from"./index-BMSIyZUx.js";import{u as T}from"./useTabbar-BGkIZK8q.js";const $=v({name:"ConfigurationApplicationCenterDetail",__name:"detail",setup(A){const l=x(),_=k(),m=T(),r=R(),i=w();function u(){i.value.submit().then(()=>{y.emit("get-data-list"),o()})}function f(){o()}function o(){r.settings.tabbar.enable&&r.settings.tabbar.mergeTabsBy!=="activeMenu"?m.close({name:"pagesExampleGeneralFormModeList"}):_.push({name:"pagesExampleGeneralFormModeList"})}return(G,I)=>{const p=F,a=n("ElButton"),d=M,g=n("ElCol"),b=n("ElRow"),C=N,B=E;return S(),h("div",null,[e(d,{title:c(l).name==="routerName"?"新增应用中心":"编辑应用中心"},{default:t(()=>[e(a,{size:"default",round:"",onClick:o},{icon:t(()=>[e(p,{name:"i-ep:arrow-left"})]),default:t(()=>[s(" 返回 ")]),_:1})]),_:1},8,["title"]),e(C,null,{default:t(()=>[e(b,null,{default:t(()=>[e(g,{md:24,lg:16},{default:t(()=>[e(D,{id:c(l).params.id,ref_key:"formRef",ref:i},null,8,["id"])]),_:1})]),_:1})]),_:1}),e(B,null,{default:t(()=>[e(a,{type:"primary",size:"large",onClick:u},{default:t(()=>[s(" 提交 ")]),_:1}),e(a,{size:"large",onClick:f},{default:t(()=>[s(" 取消 ")]),_:1})]),_:1})])}}}),J=z($,[["__scopeId","data-v-6f9be788"]]);export{J as default};
