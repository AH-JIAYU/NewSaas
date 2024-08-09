
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{_ as p}from"./index-DGyvJnoz.js";import{d,v as b,K as g,s as B,r as v,a as y,o as h,b as k,f as e,w as t,i as x,g as i,B as C,am as S,N as R}from"./index-CyRDEfVX.js";import{D}from"./index-CdjeZsIl.js";import{u as E}from"./useTabbar-BGkIZK8q.js";/* empty css                      */import"./apiLoading-U0vtWJsg.js";import"./otherFunctions_screenLibrary-DuczebT-.js";const F={class:"absolute-container"},L=d({name:"OtherFunctionsScreenLibraryDetail",__name:"detail",setup(N){const c=b(),u=g(),m=E(),a=B(),n=v();function o(){n.value.submit().then(()=>{C.emit("get-data-list"),s()})}function l(){s()}function s(){a.settings.tabbar.enable&&a.settings.tabbar.mergeTabsBy!=="activeMenu"?m.close({name:"screenLibrary"}):u.push({name:"screenLibrary"})}return(T,w)=>{const _=S,r=y("ElButton"),f=p;return h(),k("div",F,[e(_,null,{default:t(()=>[e(D,{id:x(c).params.id,ref_key:"formRef",ref:n,onOnSubmit:o},null,8,["id"])]),_:1}),e(f,null,{default:t(()=>[e(r,{type:"primary",size:"large",onClick:o},{default:t(()=>[i(" 提交 ")]),_:1}),e(r,{size:"large",onClick:l},{default:t(()=>[i(" 取消 ")]),_:1})]),_:1})])}}}),P=R(L,[["__scopeId","data-v-4c645875"]]);export{P as default};
