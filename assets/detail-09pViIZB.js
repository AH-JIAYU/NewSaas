
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{_ as p}from"./index-CvDZSNXH.js";import{d,z as b,O as g,y,r as B,b as h,o as k,e as v,g as e,w as t,j as x,h as i,G as C,ap as S,R}from"./index-I0CHLqnn.js";import{D as z}from"./index-CtvSGKhw.js";import{u as D}from"./useTabbar-B6NZNnT7.js";/* empty css                      */import"./apiLoading-CwKaN39q.js";import"./otherFunctions_screenLibrary-B-D7rQIm.js";const E={class:"absolute-container"},F=d({name:"OtherFunctionsScreenLibraryDetail",__name:"detail",setup(L){const c=b(),u=g(),l=D(),a=y(),n=B();function o(){n.value.submit().then(()=>{C.emit("get-data-list"),s()})}function m(){s()}function s(){a.settings.tabbar.enable&&a.settings.tabbar.mergeTabsBy!=="activeMenu"?l.close({name:"screenLibrary"}):u.push({name:"screenLibrary"})}return(O,T)=>{const _=S,r=h("ElButton"),f=p;return k(),v("div",E,[e(_,null,{default:t(()=>[e(z,{id:x(c).params.id,ref_key:"formRef",ref:n,onOnSubmit:o},null,8,["id"])]),_:1}),e(f,null,{default:t(()=>[e(r,{type:"primary",size:"large",onClick:o},{default:t(()=>[i(" 提交 ")]),_:1}),e(r,{size:"large",onClick:m},{default:t(()=>[i(" 取消 ")]),_:1})]),_:1})])}}}),I=R(F,[["__scopeId","data-v-73d4aaff"]]);export{I as default};
