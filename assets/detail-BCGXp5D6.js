
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{_ as p}from"./index-Lf1p5aVu.js";import{d,H as b,I as g,v as B,r as v,a as x,o as y,b as h,f as e,w as t,i as k,g as i,x as C,an as S,L}from"./index-DBquyRqD.js";import{D as R}from"./index-DIMLEm83.js";import{u as D}from"./useTabbar-Bdd3-B7c.js";/* empty css                      */import"./apiLoading-DYbTnkTt.js";import"./otherFunctions_screenLibrary-BIN6kZ2A.js";const E={class:"absolute-container"},F=d({name:"OtherFunctionsScreenLibraryDetail",__name:"detail",setup(T){const c=b(),u=g(),l=D(),a=B(),n=v();function o(){n.value.submit().then(()=>{C.emit("get-data-list"),s()})}function m(){s()}function s(){a.settings.tabbar.enable&&a.settings.tabbar.mergeTabsBy!=="activeMenu"?l.close({name:"screenLibrary"}):u.push({name:"screenLibrary"})}return(w,z)=>{const _=S,r=x("ElButton"),f=p;return y(),h("div",E,[e(_,null,{default:t(()=>[e(R,{id:k(c).params.id,ref_key:"formRef",ref:n,onOnSubmit:o},null,8,["id"])]),_:1}),e(f,null,{default:t(()=>[e(r,{type:"primary",size:"large",onClick:o},{default:t(()=>[i(" 提交 ")]),_:1}),e(r,{size:"large",onClick:m},{default:t(()=>[i(" 取消 ")]),_:1})]),_:1})])}}}),P=L(F,[["__scopeId","data-v-73d4aaff"]]);export{P as default};
