
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{_ as E}from"./index-CfkN2XOD.js";import{d as v,H as B,I as k,v as R,r as w,a,o as S,b as h,f as e,w as t,g as s,i as c,x as y,_ as F,au as M,an as z,L as D}from"./index-DG8rCAXq.js";import{D as I}from"./index-Bt9a9J5C.js";import{u as L}from"./useTabbar-CMi1Tk01.js";const N=v({name:"ConfigurationApplicationCenterDetail",__name:"detail",setup(T){const l=B(),_=k(),u=L(),r=R(),i=w();function m(){i.value.submit().then(()=>{y.emit("get-data-list"),n()})}function f(){n()}function n(){r.settings.tabbar.enable&&r.settings.tabbar.mergeTabsBy!=="activeMenu"?u.close({name:"pagesExampleGeneralFormModeList"}):_.push({name:"pagesExampleGeneralFormModeList"})}return($,A)=>{const p=F,o=a("ElButton"),d=M,g=a("ElCol"),b=a("ElRow"),C=z,x=E;return S(),h("div",null,[e(d,{title:c(l).name==="routerName"?"新增应用中心":"编辑应用中心"},{default:t(()=>[e(o,{size:"default",round:"",onClick:n},{icon:t(()=>[e(p,{name:"i-ep:arrow-left"})]),default:t(()=>[s(" 返回 ")]),_:1})]),_:1},8,["title"]),e(C,null,{default:t(()=>[e(b,null,{default:t(()=>[e(g,{md:24,lg:16},{default:t(()=>[e(I,{id:c(l).params.id,ref_key:"formRef",ref:i},null,8,["id"])]),_:1})]),_:1})]),_:1}),e(x,null,{default:t(()=>[e(o,{type:"primary",size:"large",onClick:m},{default:t(()=>[s(" 提交 ")]),_:1}),e(o,{size:"large",onClick:f},{default:t(()=>[s(" 取消 ")]),_:1})]),_:1})])}}}),j=D(N,[["__scopeId","data-v-6f9be788"]]);export{j as default};
