
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{_ as p}from"./index-DQx2uJnu.js";import{d,y as b,N as g,x as y,r as B,a as x,o as h,b as k,f as e,w as t,i as v,g as i,D as C,ap as S,Q as D}from"./index-WdaD7n5-.js";import{D as R}from"./index-DJzaH1Hj.js";import{u as E}from"./useTabbar-CHPTihcQ.js";/* empty css                      */import"./apiLoading-DFWiWH5l.js";import"./otherFunctions_screenLibrary-B4Uh4duN.js";const F={class:"absolute-container"},L=d({name:"OtherFunctionsScreenLibraryDetail",__name:"detail",setup(N){const c=b(),u=g(),l=E(),a=y(),n=B();function o(){n.value.submit().then(()=>{C.emit("get-data-list"),s()})}function m(){s()}function s(){a.settings.tabbar.enable&&a.settings.tabbar.mergeTabsBy!=="activeMenu"?l.close({name:"screenLibrary"}):u.push({name:"screenLibrary"})}return(T,w)=>{const _=S,r=x("ElButton"),f=p;return h(),k("div",F,[e(_,null,{default:t(()=>[e(R,{id:v(c).params.id,ref_key:"formRef",ref:n,onOnSubmit:o},null,8,["id"])]),_:1}),e(f,null,{default:t(()=>[e(r,{type:"primary",size:"large",onClick:o},{default:t(()=>[i(" 提交 ")]),_:1}),e(r,{size:"large",onClick:m},{default:t(()=>[i(" 取消 ")]),_:1})]),_:1})])}}}),Q=D(L,[["__scopeId","data-v-4c645875"]]);export{Q as default};
