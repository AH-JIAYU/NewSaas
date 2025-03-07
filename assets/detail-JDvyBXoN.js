
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{_ as x}from"./index-C26k-B6G.js";import{d as B,I as k,J as v,y as R,r as w,a as n,o as y,b as M,f as e,w as t,g as s,i as c,z as S,_ as h,au as z,ao as F,M as D}from"./index-fxjDEbzK.js";import{D as I}from"./index-BvBTtgwl.js";import{u as N}from"./useTabbar-DfxfoC-o.js";const T=B({name:"ConfigurationApplicationCenterDetail",__name:"detail",setup($){const l=k(),_=v(),u=N(),r=R(),i=w();function m(){i.value.submit().then(()=>{S.emit("get-data-list"),o()})}function f(){o()}function o(){r.settings.tabbar.enable&&r.settings.tabbar.mergeTabsBy!=="activeMenu"?u.close({name:"pagesExampleGeneralFormModeList"}):_.push({name:"pagesExampleGeneralFormModeList"})}return(A,G)=>{const p=h,a=n("ElButton"),d=z,g=n("ElCol"),b=n("ElRow"),C=F,E=x;return y(),M("div",null,[e(d,{title:c(l).name==="routerName"?"新增应用中心":"编辑应用中心"},{default:t(()=>[e(a,{size:"default",round:"",onClick:o},{icon:t(()=>[e(p,{name:"i-ep:arrow-left"})]),default:t(()=>[s(" 返回 ")]),_:1})]),_:1},8,["title"]),e(C,null,{default:t(()=>[e(b,null,{default:t(()=>[e(g,{md:24,lg:16},{default:t(()=>[e(I,{id:c(l).params.id,ref_key:"formRef",ref:i},null,8,["id"])]),_:1})]),_:1})]),_:1}),e(E,null,{default:t(()=>[e(a,{type:"primary",size:"large",onClick:m},{default:t(()=>[s(" 提交 ")]),_:1}),e(a,{size:"large",onClick:f},{default:t(()=>[s(" 取消 ")]),_:1})]),_:1})])}}}),J=D(T,[["__scopeId","data-v-6f9be788"]]);export{J as default};
