
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{_ as f}from"./index-Bfnd7LbU.js";import{d,q as b,M as g,p as B,r as k,a as y,o as h,b as v,f as e,w as t,i as x,g as i,B as C,ak as S,P as R}from"./index-DU62AkNh.js";import{D}from"./index-BUjvwBws.js";import{u as E}from"./useTabbar-CViNJAkP.js";/* empty css                      */import"./apiLoading-lBcgD0ER.js";import"./otherFunctions_screenLibrary-BhebjlUo.js";import"./basicDictionary-CjcCybBo.js";import"./otherFunctions_basicDictionary-CPwgOpKG.js";const F={class:"absolute-container"},L=d({name:"OtherFunctionsScreenLibraryDetail",__name:"detail",setup(M){const c=b(),u=g(),m=E(),o=B(),a=k();function n(){a.value.submit().then(()=>{C.emit("get-data-list"),s()})}function l(){s()}function s(){o.settings.tabbar.enable&&o.settings.tabbar.mergeTabsBy!=="activeMenu"?m.close({name:"screenLibrary"}):u.push({name:"screenLibrary"})}return(T,w)=>{const _=S,r=y("ElButton"),p=f;return h(),v("div",F,[e(_,null,{default:t(()=>[e(D,{id:x(c).params.id,ref_key:"formRef",ref:a,onOnSubmit:n},null,8,["id"])]),_:1}),e(p,null,{default:t(()=>[e(r,{type:"primary",size:"large",onClick:n},{default:t(()=>[i(" 提交 ")]),_:1}),e(r,{size:"large",onClick:l},{default:t(()=>[i(" 取消 ")]),_:1})]),_:1})])}}}),j=R(L,[["__scopeId","data-v-4c645875"]]);export{j as default};
