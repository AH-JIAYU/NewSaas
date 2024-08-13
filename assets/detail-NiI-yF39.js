
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{_ as E}from"./index-gUFESVr8.js";import{d as B,y as k,N as v,x as R,r as w,a as n,o as y,b as D,f as e,w as t,g as s,i as c,D as M,M as S,aD as h,ap as F,Q as N}from"./index-CIFOFIw0.js";import{D as z}from"./index-B77--ox3.js";import{u as T}from"./useTabbar-CGzsmyor.js";const $=B({name:"ConfigurationApplicationCenterDetail",__name:"detail",setup(A){const l=k(),_=v(),m=T(),r=R(),i=w();function u(){i.value.submit().then(()=>{M.emit("get-data-list"),o()})}function f(){o()}function o(){r.settings.tabbar.enable&&r.settings.tabbar.mergeTabsBy!=="activeMenu"?m.close({name:"pagesExampleGeneralFormModeList"}):_.push({name:"pagesExampleGeneralFormModeList"})}return(G,I)=>{const p=S,a=n("ElButton"),d=h,g=n("ElCol"),b=n("ElRow"),C=F,x=E;return y(),D("div",null,[e(d,{title:c(l).name==="routerName"?"新增应用中心":"编辑应用中心"},{default:t(()=>[e(a,{size:"default",round:"",onClick:o},{icon:t(()=>[e(p,{name:"i-ep:arrow-left"})]),default:t(()=>[s(" 返回 ")]),_:1})]),_:1},8,["title"]),e(C,null,{default:t(()=>[e(b,null,{default:t(()=>[e(g,{md:24,lg:16},{default:t(()=>[e(z,{id:c(l).params.id,ref_key:"formRef",ref:i},null,8,["id"])]),_:1})]),_:1})]),_:1}),e(x,null,{default:t(()=>[e(a,{type:"primary",size:"large",onClick:u},{default:t(()=>[s(" 提交 ")]),_:1}),e(a,{size:"large",onClick:f},{default:t(()=>[s(" 取消 ")]),_:1})]),_:1})])}}}),Q=N($,[["__scopeId","data-v-6f9be788"]]);export{Q as default};
