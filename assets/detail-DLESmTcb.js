
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{_ as p}from"./index-CFH5Kfjv.js";import{d,v as b,O as g,t as B,r as v,a as y,o as h,b as k,f as e,w as t,i as x,g as i,H as C,s as S,_ as R}from"./index-C29iptdf.js";import E from"./index--mOPA3qi.js";import{u as F}from"./useTabbar-Dl6d9eDS.js";import"./otherFunctions_screenLibrary-BrB0TeuI.js";import"./apiLoading-DqtAc4mt.js";const L={class:"absolute-container"},O=d({name:"OtherFunctionsScreenLibraryDetail",__name:"detail",setup(T){const c=b(),u=g(),l=F(),n=B(),a=v();function o(){a.value.submit().then(()=>{C.emit("get-data-list"),s()})}function m(){s()}function s(){n.settings.tabbar.enable&&n.settings.tabbar.mergeTabsBy!=="activeMenu"?l.close({name:"screenLibrary"}):u.push({name:"screenLibrary"})}return(w,z)=>{const _=S,r=y("ElButton"),f=p;return h(),k("div",L,[e(_,null,{default:t(()=>[e(E,{id:x(c).params.id,ref_key:"formRef",ref:a,onOnSubmit:o},null,8,["id"])]),_:1}),e(f,null,{default:t(()=>[e(r,{type:"primary",size:"large",onClick:o},{default:t(()=>[i(" 提交 ")]),_:1}),e(r,{size:"large",onClick:m},{default:t(()=>[i(" 取消 ")]),_:1})]),_:1})])}}}),I=R(O,[["__scopeId","data-v-0320553c"]]);export{I as default};
