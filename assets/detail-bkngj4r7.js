
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{_ as g}from"./index-DFn6OKOI.js";import{d as B,s as C,L as k,t as v,r as y,a as h,o as x,b as S,f as e,w as t,g as o,i as c,C as L,K as R,as as w,q as z,_ as D}from"./index-C32xF_ni.js";import{D as E}from"./index-BblEX_Xx.js";import{u as F}from"./useTabbar-CpgdsKnT.js";import"./survey-creator-core.i18n-DA1fh3wM.js";const N={class:"absolute-container"},T=B({name:"OtherFunctionsScreenLibraryDetail",__name:"detail",setup($){const s=C(),_=k(),l=F(),r=v(),i=y();function u(){i.value.submit().then(()=>{L.emit("get-data-list"),a()})}function m(){a()}function a(){r.settings.tabbar.enable&&r.settings.tabbar.mergeTabsBy!=="activeMenu"?l.close({name:"screenLibrary"}):_.push({name:"screenLibrary"})}return(I,M)=>{const f=R,n=h("ElButton"),d=w,p=z,b=g;return x(),S("div",N,[e(d,{title:c(s).name==="routerName"?"新增筛选库":"编辑筛选库"},{default:t(()=>[e(n,{size:"default",round:"",onClick:a},{icon:t(()=>[e(f,{name:"i-ep:arrow-left"})]),default:t(()=>[o(" 返回 ")]),_:1})]),_:1},8,["title"]),e(p,null,{default:t(()=>[e(E,{id:c(s).params.id,ref_key:"formRef",ref:i},null,8,["id"])]),_:1}),e(b,null,{default:t(()=>[e(n,{type:"primary",size:"large",onClick:u},{default:t(()=>[o(" 提交 ")]),_:1}),e(n,{size:"large",onClick:m},{default:t(()=>[o(" 取消 ")]),_:1})]),_:1})])}}}),K=D(T,[["__scopeId","data-v-b74d5446"]]);export{K as default};
