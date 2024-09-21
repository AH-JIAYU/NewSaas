
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{_ as E}from"./index-BQciTlip.js";import{d as x,z as k,O as v,y as R,r as h,b as a,o as w,e as y,g as e,w as t,h as s,j as c,G as S,N as z,aB as F,ap as M,R as N}from"./index--j4xLQ48.js";import{D}from"./index-BRSxvEjo.js";import{u as G}from"./useTabbar-CsMmuUwA.js";const T=x({name:"ConfigurationApplicationCenterDetail",__name:"detail",setup($){const l=k(),_=v(),m=G(),r=R(),i=h();function u(){i.value.submit().then(()=>{S.emit("get-data-list"),o()})}function f(){o()}function o(){r.settings.tabbar.enable&&r.settings.tabbar.mergeTabsBy!=="activeMenu"?m.close({name:"pagesExampleGeneralFormModeList"}):_.push({name:"pagesExampleGeneralFormModeList"})}return(A,I)=>{const p=z,n=a("ElButton"),d=F,g=a("ElCol"),b=a("ElRow"),C=M,B=E;return w(),y("div",null,[e(d,{title:c(l).name==="routerName"?"新增应用中心":"编辑应用中心"},{default:t(()=>[e(n,{size:"default",round:"",onClick:o},{icon:t(()=>[e(p,{name:"i-ep:arrow-left"})]),default:t(()=>[s(" 返回 ")]),_:1})]),_:1},8,["title"]),e(C,null,{default:t(()=>[e(b,null,{default:t(()=>[e(g,{md:24,lg:16},{default:t(()=>[e(D,{id:c(l).params.id,ref_key:"formRef",ref:i},null,8,["id"])]),_:1})]),_:1})]),_:1}),e(B,null,{default:t(()=>[e(n,{type:"primary",size:"large",onClick:u},{default:t(()=>[s(" 提交 ")]),_:1}),e(n,{size:"large",onClick:f},{default:t(()=>[s(" 取消 ")]),_:1})]),_:1})])}}}),H=N(T,[["__scopeId","data-v-6f9be788"]]);export{H as default};
