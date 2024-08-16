
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{_ as x}from"./index-CiUNWnGU.js";import{d as v,x as B,M as k,v as R,r as w,a as n,o as M,b as S,f as e,w as t,g as s,i as c,C as h,L as y,aE as F,aq as z,P as D}from"./index-CsSreFXq.js";import{D as L}from"./index-CY5fjICZ.js";import{u as N}from"./useTabbar-BDOoY3GI.js";const P=v({name:"ConfigurationApplicationCenterDetail",__name:"detail",setup(T){const l=B(),_=k(),m=N(),r=R(),i=w();function u(){i.value.submit().then(()=>{h.emit("get-data-list"),o()})}function f(){o()}function o(){r.settings.tabbar.enable&&r.settings.tabbar.mergeTabsBy!=="activeMenu"?m.close({name:"pagesExampleGeneralFormModeList"}):_.push({name:"pagesExampleGeneralFormModeList"})}return($,A)=>{const p=y,a=n("ElButton"),d=F,g=n("ElCol"),b=n("ElRow"),C=z,E=x;return M(),S("div",null,[e(d,{title:c(l).name==="routerName"?"新增应用中心":"编辑应用中心"},{default:t(()=>[e(a,{size:"default",round:"",onClick:o},{icon:t(()=>[e(p,{name:"i-ep:arrow-left"})]),default:t(()=>[s(" 返回 ")]),_:1})]),_:1},8,["title"]),e(C,null,{default:t(()=>[e(b,null,{default:t(()=>[e(g,{md:24,lg:16},{default:t(()=>[e(L,{id:c(l).params.id,ref_key:"formRef",ref:i},null,8,["id"])]),_:1})]),_:1})]),_:1}),e(E,null,{default:t(()=>[e(a,{type:"primary",size:"large",onClick:u},{default:t(()=>[s(" 提交 ")]),_:1}),e(a,{size:"large",onClick:f},{default:t(()=>[s(" 取消 ")]),_:1})]),_:1})])}}}),H=D(P,[["__scopeId","data-v-6f9be788"]]);export{H as default};
