
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{_ as p}from"./index-DsFb27BK.js";import{d,v as b,K as g,s as B,r as v,a as y,o as h,b as k,f as e,w as t,i as x,g as i,B as C,an as S,N as R}from"./index-BdHtZquS.js";import{D}from"./index-BFjIDoUS.js";import{u as E}from"./useTabbar-BTFEhxWQ.js";/* empty css                      */import"./apiLoading-CyvCFwB9.js";import"./otherFunctions_screenLibrary-DI45L_QP.js";const F={class:"absolute-container"},L=d({name:"OtherFunctionsScreenLibraryDetail",__name:"detail",setup(N){const c=b(),u=g(),l=E(),n=B(),a=v();function o(){a.value.submit().then(()=>{C.emit("get-data-list"),s()})}function m(){s()}function s(){n.settings.tabbar.enable&&n.settings.tabbar.mergeTabsBy!=="activeMenu"?l.close({name:"screenLibrary"}):u.push({name:"screenLibrary"})}return(T,w)=>{const _=S,r=y("ElButton"),f=p;return h(),k("div",F,[e(_,null,{default:t(()=>[e(D,{id:x(c).params.id,ref_key:"formRef",ref:a,onOnSubmit:o},null,8,["id"])]),_:1}),e(f,null,{default:t(()=>[e(r,{type:"primary",size:"large",onClick:o},{default:t(()=>[i(" 提交 ")]),_:1}),e(r,{size:"large",onClick:m},{default:t(()=>[i(" 取消 ")]),_:1})]),_:1})])}}}),P=R(L,[["__scopeId","data-v-4c645875"]]);export{P as default};
