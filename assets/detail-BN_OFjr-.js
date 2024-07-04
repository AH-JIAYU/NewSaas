
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{_ as f}from"./index-2D72Y-bH.js";import{d,s as b,M as g,q as B,r as y,a as h,o as k,b as v,f as e,w as t,i as x,g as i,E as C,p as S,_ as E}from"./index-C5gylVSa.js";import{D as R}from"./index-B7_OTXxO.js";import{u as D}from"./useTabbar-B-0gWBWX.js";/* empty css                      */import"./apiLoading-B23SXnXZ.js";import"./otherFunctions_screenLibrary-DTZd4fhX.js";import"./basicDictionary-Dc01cZ3t.js";import"./otherFunctions_basicDictionary-D3tLxLQ-.js";const F={class:"absolute-container"},L=d({name:"OtherFunctionsScreenLibraryDetail",__name:"detail",setup(M){const c=b(),u=g(),m=D(),o=B(),n=y();function a(){n.value.submit().then(()=>{C.emit("get-data-list"),s()})}function l(){s()}function s(){o.settings.tabbar.enable&&o.settings.tabbar.mergeTabsBy!=="activeMenu"?m.close({name:"screenLibrary"}):u.push({name:"screenLibrary"})}return(T,w)=>{const _=S,r=h("ElButton"),p=f;return k(),v("div",F,[e(_,null,{default:t(()=>[e(R,{id:x(c).params.id,ref_key:"formRef",ref:n,onOnSubmit:a},null,8,["id"])]),_:1}),e(p,null,{default:t(()=>[e(r,{type:"primary",size:"large",onClick:a},{default:t(()=>[i(" 提交 ")]),_:1}),e(r,{size:"large",onClick:l},{default:t(()=>[i(" 取消 ")]),_:1})]),_:1})])}}}),j=E(L,[["__scopeId","data-v-0320553c"]]);export{j as default};
