
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{_ as p}from"./index-BhTcxBlM.js";import{d,x as b,M as g,v as B,r as v,a as x,o as y,b as C,f as e,w as t,i as h,g as i,C as k,ap as S,P as R}from"./index-Cc6n2BiZ.js";import{D}from"./index-DxvjsbbQ.js";import{u as E}from"./useTabbar-DjHFjnfk.js";/* empty css                      */import"./apiLoading-TVdB8upv.js";import"./otherFunctions_screenLibrary-B-WOuP7u.js";const F={class:"absolute-container"},L=d({name:"OtherFunctionsScreenLibraryDetail",__name:"detail",setup(M){const c=b(),u=g(),l=E(),a=B(),n=v();function o(){n.value.submit().then(()=>{k.emit("get-data-list"),s()})}function m(){s()}function s(){a.settings.tabbar.enable&&a.settings.tabbar.mergeTabsBy!=="activeMenu"?l.close({name:"screenLibrary"}):u.push({name:"screenLibrary"})}return(T,w)=>{const _=S,r=x("ElButton"),f=p;return y(),C("div",F,[e(_,null,{default:t(()=>[e(D,{id:h(c).params.id,ref_key:"formRef",ref:n,onOnSubmit:o},null,8,["id"])]),_:1}),e(f,null,{default:t(()=>[e(r,{type:"primary",size:"large",onClick:o},{default:t(()=>[i(" 提交 ")]),_:1}),e(r,{size:"large",onClick:m},{default:t(()=>[i(" 取消 ")]),_:1})]),_:1})])}}}),$=R(L,[["__scopeId","data-v-4c645875"]]);export{$ as default};
