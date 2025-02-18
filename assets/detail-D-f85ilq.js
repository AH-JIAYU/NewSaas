
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{_ as v}from"./index-C_miB3ub.js";import{d as x,s as B,v as k,u as R,r as h,a3 as n,b as w,j as S,g as e,w as t,h as s,i as c,e as y,_ as z,aC as F,ao as M,z as D}from"./index-CZbucr5m.js";import{D as N}from"./index-CD_DHh-m.js";import{u as T}from"./useTabbar-DSe1Bx4d.js";const $=x({name:"ConfigurationApplicationCenterDetail",__name:"detail",setup(A){const l=B(),_=k(),u=T(),r=R(),i=h();function m(){i.value.submit().then(()=>{y.emit("get-data-list"),o()})}function f(){o()}function o(){r.settings.tabbar.enable&&r.settings.tabbar.mergeTabsBy!=="activeMenu"?u.close({name:"pagesExampleGeneralFormModeList"}):_.push({name:"pagesExampleGeneralFormModeList"})}return(G,I)=>{const p=z,a=n("ElButton"),d=F,g=n("ElCol"),b=n("ElRow"),C=M,E=v;return w(),S("div",null,[e(d,{title:c(l).name==="routerName"?"新增应用中心":"编辑应用中心"},{default:t(()=>[e(a,{size:"default",round:"",onClick:o},{icon:t(()=>[e(p,{name:"i-ep:arrow-left"})]),default:t(()=>[s(" 返回 ")]),_:1})]),_:1},8,["title"]),e(C,null,{default:t(()=>[e(b,null,{default:t(()=>[e(g,{md:24,lg:16},{default:t(()=>[e(N,{id:c(l).params.id,ref_key:"formRef",ref:i},null,8,["id"])]),_:1})]),_:1})]),_:1}),e(E,null,{default:t(()=>[e(a,{type:"primary",size:"large",onClick:m},{default:t(()=>[s(" 提交 ")]),_:1}),e(a,{size:"large",onClick:f},{default:t(()=>[s(" 取消 ")]),_:1})]),_:1})])}}}),H=D($,[["__scopeId","data-v-6f9be788"]]);export{H as default};
