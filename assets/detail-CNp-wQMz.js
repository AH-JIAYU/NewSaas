
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{_ as p}from"./index-CNAXjV8L.js";import{d,v as b,L as g,t as B,r as v,a as y,o as h,b as k,f as e,w as t,i as x,g as i,D as C,s as S,_ as L}from"./index-JVwiYWif.js";import R from"./index-Bf8C7gt4.js";import{u as D}from"./useTabbar-BWyEDWW7.js";import"./otherFunctions_screenLibrary-Do2wQC2R.js";const E={class:"absolute-container"},F=d({name:"OtherFunctionsScreenLibraryDetail",__name:"detail",setup(T){const c=b(),u=g(),l=D(),n=B(),a=v();function o(){a.value.submit().then(()=>{C.emit("get-data-list"),s()})}function _(){s()}function s(){n.settings.tabbar.enable&&n.settings.tabbar.mergeTabsBy!=="activeMenu"?l.close({name:"screenLibrary"}):u.push({name:"screenLibrary"})}return(w,z)=>{const m=S,r=y("ElButton"),f=p;return h(),k("div",E,[e(m,null,{default:t(()=>[e(R,{id:x(c).params.id,ref_key:"formRef",ref:a,onOnSubmit:o},null,8,["id"])]),_:1}),e(f,null,{default:t(()=>[e(r,{type:"primary",size:"large",onClick:o},{default:t(()=>[i(" 提交 ")]),_:1}),e(r,{size:"large",onClick:_},{default:t(()=>[i(" 取消 ")]),_:1})]),_:1})])}}}),I=L(F,[["__scopeId","data-v-0320553c"]]);export{I as default};
