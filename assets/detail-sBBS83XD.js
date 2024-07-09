
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{_ as f}from"./index-909zf__h.js";import{d,s as b,M as g,q as B,r as y,a as h,o as k,b as v,f as e,w as t,i as x,g as i,E as C,p as S,_ as E}from"./index-CpaKVi3K.js";import{D as R}from"./index-DEpAPbeQ.js";import{u as D}from"./useTabbar-BERGjpB9.js";/* empty css                      */import"./apiLoading-B6Lmv_-i.js";import"./otherFunctions_screenLibrary-BrCZHh-b.js";import"./basicDictionary-CCCdq92K.js";import"./otherFunctions_basicDictionary-C_2rO2j2.js";const F={class:"absolute-container"},L=d({name:"OtherFunctionsScreenLibraryDetail",__name:"detail",setup(M){const c=b(),u=g(),m=D(),o=B(),n=y();function a(){n.value.submit().then(()=>{C.emit("get-data-list"),s()})}function l(){s()}function s(){o.settings.tabbar.enable&&o.settings.tabbar.mergeTabsBy!=="activeMenu"?m.close({name:"screenLibrary"}):u.push({name:"screenLibrary"})}return(T,w)=>{const _=S,r=h("ElButton"),p=f;return k(),v("div",F,[e(_,null,{default:t(()=>[e(R,{id:x(c).params.id,ref_key:"formRef",ref:n,onOnSubmit:a},null,8,["id"])]),_:1}),e(p,null,{default:t(()=>[e(r,{type:"primary",size:"large",onClick:a},{default:t(()=>[i(" 提交 ")]),_:1}),e(r,{size:"large",onClick:l},{default:t(()=>[i(" 取消 ")]),_:1})]),_:1})])}}}),j=E(L,[["__scopeId","data-v-0320553c"]]);export{j as default};
