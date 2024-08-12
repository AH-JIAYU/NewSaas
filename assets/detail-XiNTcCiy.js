
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{_ as p}from"./index-BdmKhCtS.js";import{d,y as b,N as g,x as y,r as B,a as x,o as h,b as k,f as e,w as t,i as v,g as i,D as C,an as S,Q as D}from"./index-D5mKHCpP.js";import{D as R}from"./index-yVHW1ejB.js";import{u as E}from"./useTabbar-D0k6uSDC.js";/* empty css                      */import"./apiLoading-C5jWlBzD.js";import"./otherFunctions_screenLibrary-G4dGz0R3.js";const F={class:"absolute-container"},L=d({name:"OtherFunctionsScreenLibraryDetail",__name:"detail",setup(N){const c=b(),u=g(),l=E(),n=y(),a=B();function o(){a.value.submit().then(()=>{C.emit("get-data-list"),s()})}function m(){s()}function s(){n.settings.tabbar.enable&&n.settings.tabbar.mergeTabsBy!=="activeMenu"?l.close({name:"screenLibrary"}):u.push({name:"screenLibrary"})}return(T,w)=>{const _=S,r=x("ElButton"),f=p;return h(),k("div",F,[e(_,null,{default:t(()=>[e(R,{id:v(c).params.id,ref_key:"formRef",ref:a,onOnSubmit:o},null,8,["id"])]),_:1}),e(f,null,{default:t(()=>[e(r,{type:"primary",size:"large",onClick:o},{default:t(()=>[i(" 提交 ")]),_:1}),e(r,{size:"large",onClick:m},{default:t(()=>[i(" 取消 ")]),_:1})]),_:1})])}}}),Q=D(L,[["__scopeId","data-v-4c645875"]]);export{Q as default};
