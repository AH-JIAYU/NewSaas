
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{_ as x}from"./index-zmP7Ly0W.js";import{d as B,q as k,s as v,u as R,r as h,a2 as n,a as w,i as y,f as e,w as t,g as s,h as c,e as S,_ as F,aC as M,ao as z,y as D}from"./index-DsJowmSc.js";import{D as N}from"./index-DhjW1qtk.js";import{u as T}from"./useTabbar-SeKW5n6i.js";const $=B({name:"ConfigurationApplicationCenterDetail",__name:"detail",setup(A){const l=k(),_=v(),u=T(),r=R(),i=h();function m(){i.value.submit().then(()=>{S.emit("get-data-list"),a()})}function f(){a()}function a(){r.settings.tabbar.enable&&r.settings.tabbar.mergeTabsBy!=="activeMenu"?u.close({name:"pagesExampleGeneralFormModeList"}):_.push({name:"pagesExampleGeneralFormModeList"})}return(G,I)=>{const p=F,o=n("ElButton"),d=M,g=n("ElCol"),b=n("ElRow"),C=z,E=x;return w(),y("div",null,[e(d,{title:c(l).name==="routerName"?"新增应用中心":"编辑应用中心"},{default:t(()=>[e(o,{size:"default",round:"",onClick:a},{icon:t(()=>[e(p,{name:"i-ep:arrow-left"})]),default:t(()=>[s(" 返回 ")]),_:1})]),_:1},8,["title"]),e(C,null,{default:t(()=>[e(b,null,{default:t(()=>[e(g,{md:24,lg:16},{default:t(()=>[e(N,{id:c(l).params.id,ref_key:"formRef",ref:i},null,8,["id"])]),_:1})]),_:1})]),_:1}),e(E,null,{default:t(()=>[e(o,{type:"primary",size:"large",onClick:m},{default:t(()=>[s(" 提交 ")]),_:1}),e(o,{size:"large",onClick:f},{default:t(()=>[s(" 取消 ")]),_:1})]),_:1})])}}}),H=D($,[["__scopeId","data-v-6f9be788"]]);export{H as default};
