
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{_ as p}from"./index-De3JT5wE.js";import{d,q as b,s as g,u as y,r as B,a2 as h,a as k,i as v,f as e,w as t,h as x,g as i,e as C,ao as S,y as R}from"./index-gUKi6LaV.js";import{D}from"./index-BOhLbnVi.js";import{u as E}from"./useTabbar-B940c-3D.js";/* empty css                      */import"./apiLoading-DdLVbZti.js";import"./otherFunctions_screenLibrary-BnTET-qz.js";const F={class:"absolute-container"},L=d({name:"OtherFunctionsScreenLibraryDetail",__name:"detail",setup(T){const c=b(),u=g(),l=E(),a=y(),n=B();function o(){n.value.submit().then(()=>{C.emit("get-data-list"),s()})}function m(){s()}function s(){a.settings.tabbar.enable&&a.settings.tabbar.mergeTabsBy!=="activeMenu"?l.close({name:"screenLibrary"}):u.push({name:"screenLibrary"})}return(w,z)=>{const _=S,r=h("ElButton"),f=p;return k(),v("div",F,[e(_,null,{default:t(()=>[e(D,{id:x(c).params.id,ref_key:"formRef",ref:n,onOnSubmit:o},null,8,["id"])]),_:1}),e(f,null,{default:t(()=>[e(r,{type:"primary",size:"large",onClick:o},{default:t(()=>[i(" 提交 ")]),_:1}),e(r,{size:"large",onClick:m},{default:t(()=>[i(" 取消 ")]),_:1})]),_:1})])}}}),P=R(L,[["__scopeId","data-v-73d4aaff"]]);export{P as default};
