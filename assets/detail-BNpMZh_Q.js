
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{_ as p}from"./index-BR8OZnQy.js";import{d,s as b,M as g,q as B,r as y,a as h,o as k,b as v,f as e,w as t,i as x,g as i,B as C,al as S,P as R}from"./index-DoiK1_dJ.js";import{D}from"./index-DWbq3l5w.js";import{u as E}from"./useTabbar-BfNOz3n3.js";/* empty css                      */import"./apiLoading-DQ5kQxCY.js";import"./otherFunctions_screenLibrary-Dt8pcUfN.js";const F={class:"absolute-container"},L=d({name:"OtherFunctionsScreenLibraryDetail",__name:"detail",setup(M){const c=b(),u=g(),l=E(),a=B(),n=y();function o(){n.value.submit().then(()=>{C.emit("get-data-list"),s()})}function m(){s()}function s(){a.settings.tabbar.enable&&a.settings.tabbar.mergeTabsBy!=="activeMenu"?l.close({name:"screenLibrary"}):u.push({name:"screenLibrary"})}return(T,w)=>{const _=S,r=h("ElButton"),f=p;return k(),v("div",F,[e(_,null,{default:t(()=>[e(D,{id:x(c).params.id,ref_key:"formRef",ref:n,onOnSubmit:o},null,8,["id"])]),_:1}),e(f,null,{default:t(()=>[e(r,{type:"primary",size:"large",onClick:o},{default:t(()=>[i(" 提交 ")]),_:1}),e(r,{size:"large",onClick:m},{default:t(()=>[i(" 取消 ")]),_:1})]),_:1})])}}}),I=R(L,[["__scopeId","data-v-4c645875"]]);export{I as default};
