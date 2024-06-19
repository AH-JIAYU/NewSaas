
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{_ as p}from"./index-BuUI7nDa.js";import{d,v as b,O as g,t as B,r as v,a as y,o as h,b as k,f as e,w as t,i as x,g as i,H as C,s as S,_ as R}from"./index-CWM9ShDd.js";import{D}from"./index-DGsT33Vl.js";import{u as E}from"./useTabbar-oIS996EA.js";import"./apiLoading-CJUK7f2q.js";import"./otherFunctions_screenLibrary-6cPkv98_.js";import"./basicDictionary-KnSmd_4Z.js";import"./otherFunctions_basicDictionary-CyX90oCl.js";const F={class:"absolute-container"},L=d({name:"OtherFunctionsScreenLibraryDetail",__name:"detail",setup(O){const c=b(),u=g(),m=E(),n=B(),o=v();function a(){o.value.submit().then(()=>{C.emit("get-data-list"),s()})}function l(){s()}function s(){n.settings.tabbar.enable&&n.settings.tabbar.mergeTabsBy!=="activeMenu"?m.close({name:"screenLibrary"}):u.push({name:"screenLibrary"})}return(T,w)=>{const _=S,r=y("ElButton"),f=p;return h(),k("div",F,[e(_,null,{default:t(()=>[e(D,{id:x(c).params.id,ref_key:"formRef",ref:o,onOnSubmit:a},null,8,["id"])]),_:1}),e(f,null,{default:t(()=>[e(r,{type:"primary",size:"large",onClick:a},{default:t(()=>[i(" 提交 ")]),_:1}),e(r,{size:"large",onClick:l},{default:t(()=>[i(" 取消 ")]),_:1})]),_:1})])}}}),$=R(L,[["__scopeId","data-v-0320553c"]]);export{$ as default};
