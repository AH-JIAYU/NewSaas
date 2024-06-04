
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{_ as p}from"./index-DHZAL8pa.js";import{d,v as b,L as g,t as B,r as v,a as y,o as h,b as k,f as e,w as t,i as x,g as i,D as C,s as S,_ as L}from"./index-CnQ4xoV5.js";import R from"./index-ht2m0an5.js";import{u as D}from"./useTabbar-CjdFB2jy.js";import"./otherFunctions_screenLibrary-nVUTFMwo.js";import"./apiLoading-Bi9sUNe-.js";const E={class:"absolute-container"},F=d({name:"OtherFunctionsScreenLibraryDetail",__name:"detail",setup(T){const c=b(),u=g(),l=D(),n=B(),a=v();function o(){a.value.submit().then(()=>{C.emit("get-data-list"),s()})}function m(){s()}function s(){n.settings.tabbar.enable&&n.settings.tabbar.mergeTabsBy!=="activeMenu"?l.close({name:"screenLibrary"}):u.push({name:"screenLibrary"})}return(w,z)=>{const _=S,r=y("ElButton"),f=p;return h(),k("div",E,[e(_,null,{default:t(()=>[e(R,{id:x(c).params.id,ref_key:"formRef",ref:a,onOnSubmit:o},null,8,["id"])]),_:1}),e(f,null,{default:t(()=>[e(r,{type:"primary",size:"large",onClick:o},{default:t(()=>[i(" 提交 ")]),_:1}),e(r,{size:"large",onClick:m},{default:t(()=>[i(" 取消 ")]),_:1})]),_:1})])}}}),P=L(F,[["__scopeId","data-v-0320553c"]]);export{P as default};
