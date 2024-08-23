
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{_ as p}from"./index-DSfh8HJt.js";import{d,z as b,O as g,y,r as B,a as h,o as k,b as v,f as e,w as t,i as x,g as i,G as C,an as S,R}from"./index-DXIwLSJH.js";import{D as z}from"./index-ClQdB6r2.js";import{u as D}from"./useTabbar-Bue8p077.js";/* empty css                      */import"./apiLoading-C1j3k8U2.js";import"./otherFunctions_screenLibrary-TQmOQBPJ.js";const E={class:"absolute-container"},F=d({name:"OtherFunctionsScreenLibraryDetail",__name:"detail",setup(L){const c=b(),u=g(),l=D(),n=y(),a=B();function o(){a.value.submit().then(()=>{C.emit("get-data-list"),s()})}function m(){s()}function s(){n.settings.tabbar.enable&&n.settings.tabbar.mergeTabsBy!=="activeMenu"?l.close({name:"screenLibrary"}):u.push({name:"screenLibrary"})}return(O,T)=>{const _=S,r=h("ElButton"),f=p;return k(),v("div",E,[e(_,null,{default:t(()=>[e(z,{id:x(c).params.id,ref_key:"formRef",ref:a,onOnSubmit:o},null,8,["id"])]),_:1}),e(f,null,{default:t(()=>[e(r,{type:"primary",size:"large",onClick:o},{default:t(()=>[i(" 提交 ")]),_:1}),e(r,{size:"large",onClick:m},{default:t(()=>[i(" 取消 ")]),_:1})]),_:1})])}}}),P=R(F,[["__scopeId","data-v-4c645875"]]);export{P as default};
