
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{_ as E}from"./index-DVxHRm_R.js";import{d as x,I as k,J as v,y as R,r as w,a as n,o as y,b as M,f as e,w as t,g as s,i as c,z as S,_ as h,aB as z,ap as F,M as D}from"./index-oxkd8Woh.js";import{D as I}from"./index-KzzLT23E.js";import{u as N}from"./useTabbar-D1j4Kstn.js";const T=x({name:"ConfigurationApplicationCenterDetail",__name:"detail",setup($){const l=k(),_=v(),m=N(),r=R(),i=w();function u(){i.value.submit().then(()=>{S.emit("get-data-list"),o()})}function f(){o()}function o(){r.settings.tabbar.enable&&r.settings.tabbar.mergeTabsBy!=="activeMenu"?m.close({name:"pagesExampleGeneralFormModeList"}):_.push({name:"pagesExampleGeneralFormModeList"})}return(A,G)=>{const p=h,a=n("ElButton"),d=z,g=n("ElCol"),b=n("ElRow"),C=F,B=E;return y(),M("div",null,[e(d,{title:c(l).name==="routerName"?"新增应用中心":"编辑应用中心"},{default:t(()=>[e(a,{size:"default",round:"",onClick:o},{icon:t(()=>[e(p,{name:"i-ep:arrow-left"})]),default:t(()=>[s(" 返回 ")]),_:1})]),_:1},8,["title"]),e(C,null,{default:t(()=>[e(b,null,{default:t(()=>[e(g,{md:24,lg:16},{default:t(()=>[e(I,{id:c(l).params.id,ref_key:"formRef",ref:i},null,8,["id"])]),_:1})]),_:1})]),_:1}),e(B,null,{default:t(()=>[e(a,{type:"primary",size:"large",onClick:u},{default:t(()=>[s(" 提交 ")]),_:1}),e(a,{size:"large",onClick:f},{default:t(()=>[s(" 取消 ")]),_:1})]),_:1})])}}}),J=D(T,[["__scopeId","data-v-6f9be788"]]);export{J as default};
