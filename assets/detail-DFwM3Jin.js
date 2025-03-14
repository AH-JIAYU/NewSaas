
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{_ as p}from"./index-Bab3TGTg.js";import{d,I as b,J as g,y,r as B,a as h,o as k,b as v,f as e,w as t,i as x,g as i,z as C,ao as S,M as R}from"./index-KFsg0x_i.js";import{D as z}from"./index-C2vByBBb.js";import{u as D}from"./useTabbar-D9uOhXbL.js";/* empty css                      */import"./apiLoading-DdJoCZEu.js";import"./otherFunctions_screenLibrary-B2O1Cy_J.js";const E={class:"absolute-container"},F=d({name:"OtherFunctionsScreenLibraryDetail",__name:"detail",setup(L){const c=b(),u=g(),l=D(),a=y(),n=B();function o(){n.value.submit().then(()=>{C.emit("get-data-list"),s()})}function m(){s()}function s(){a.settings.tabbar.enable&&a.settings.tabbar.mergeTabsBy!=="activeMenu"?l.close({name:"screenLibrary"}):u.push({name:"screenLibrary"})}return(M,T)=>{const _=S,r=h("ElButton"),f=p;return k(),v("div",E,[e(_,null,{default:t(()=>[e(z,{id:x(c).params.id,ref_key:"formRef",ref:n,onOnSubmit:o},null,8,["id"])]),_:1}),e(f,null,{default:t(()=>[e(r,{type:"primary",size:"large",onClick:o},{default:t(()=>[i(" 提交 ")]),_:1}),e(r,{size:"large",onClick:m},{default:t(()=>[i(" 取消 ")]),_:1})]),_:1})])}}}),P=R(F,[["__scopeId","data-v-73d4aaff"]]);export{P as default};
