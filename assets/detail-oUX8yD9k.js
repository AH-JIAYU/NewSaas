
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{_ as p}from"./index-DbSANWJS.js";import{d,s as b,v as g,u as B,r as h,a3 as v,b as y,j as k,g as e,w as t,i as x,h as i,e as C,ao as S,z as R}from"./index-D3JQ81m5.js";import{D as z}from"./index-0wjhiJd1.js";import{u as D}from"./useTabbar-CLwFmbzW.js";/* empty css                      */import"./apiLoading-CgIj6Hz1.js";import"./otherFunctions_screenLibrary-DuDfOW9S.js";const E={class:"absolute-container"},F=d({name:"OtherFunctionsScreenLibraryDetail",__name:"detail",setup(L){const c=b(),u=g(),l=D(),a=B(),n=h();function o(){n.value.submit().then(()=>{C.emit("get-data-list"),s()})}function m(){s()}function s(){a.settings.tabbar.enable&&a.settings.tabbar.mergeTabsBy!=="activeMenu"?l.close({name:"screenLibrary"}):u.push({name:"screenLibrary"})}return(T,w)=>{const _=S,r=v("ElButton"),f=p;return y(),k("div",E,[e(_,null,{default:t(()=>[e(z,{id:x(c).params.id,ref_key:"formRef",ref:n,onOnSubmit:o},null,8,["id"])]),_:1}),e(f,null,{default:t(()=>[e(r,{type:"primary",size:"large",onClick:o},{default:t(()=>[i(" 提交 ")]),_:1}),e(r,{size:"large",onClick:m},{default:t(()=>[i(" 取消 ")]),_:1})]),_:1})])}}}),P=R(F,[["__scopeId","data-v-73d4aaff"]]);export{P as default};
