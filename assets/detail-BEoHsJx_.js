
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{_ as E}from"./index-pbv2Dwiw.js";import{d as B,n as k,G as v,l as R,r as w,a,o as F,b as S,f as e,w as t,g as s,i as c,x as h,F as y,at as M,aj as z,J as D}from"./index-CHE_Y-qx.js";import{D as G}from"./index-CTVhNMDv.js";import{u as N}from"./useTabbar-BP1Pwett.js";const T=B({name:"ConfigurationApplicationCenterDetail",__name:"detail",setup($){const l=k(),_=v(),m=N(),r=R(),i=w();function u(){i.value.submit().then(()=>{h.emit("get-data-list"),n()})}function f(){n()}function n(){r.settings.tabbar.enable&&r.settings.tabbar.mergeTabsBy!=="activeMenu"?m.close({name:"pagesExampleGeneralFormModeList"}):_.push({name:"pagesExampleGeneralFormModeList"})}return(A,I)=>{const p=y,o=a("ElButton"),d=M,g=a("ElCol"),b=a("ElRow"),C=z,x=E;return F(),S("div",null,[e(d,{title:c(l).name==="routerName"?"新增应用中心":"编辑应用中心"},{default:t(()=>[e(o,{size:"default",round:"",onClick:n},{icon:t(()=>[e(p,{name:"i-ep:arrow-left"})]),default:t(()=>[s(" 返回 ")]),_:1})]),_:1},8,["title"]),e(C,null,{default:t(()=>[e(b,null,{default:t(()=>[e(g,{md:24,lg:16},{default:t(()=>[e(G,{id:c(l).params.id,ref_key:"formRef",ref:i},null,8,["id"])]),_:1})]),_:1})]),_:1}),e(x,null,{default:t(()=>[e(o,{type:"primary",size:"large",onClick:u},{default:t(()=>[s(" 提交 ")]),_:1}),e(o,{size:"large",onClick:f},{default:t(()=>[s(" 取消 ")]),_:1})]),_:1})])}}}),H=D(T,[["__scopeId","data-v-6f9be788"]]);export{H as default};
