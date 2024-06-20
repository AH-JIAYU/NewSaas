
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{_ as p}from"./index-DKKVc15b.js";import{d,v as b,O as g,t as B,r as v,a as y,o as h,b as k,f as e,w as t,i as x,g as i,H as C,s as S,_ as R}from"./index-u3leq2Mb.js";import{D}from"./index-BO3KM-jX.js";import{u as E}from"./useTabbar-BbCDTydQ.js";import"./apiLoading-D4yZJkLY.js";import"./otherFunctions_screenLibrary-l3qYnveK.js";import"./basicDictionary-BEnqjp5y.js";import"./otherFunctions_basicDictionary-p0u9MpRZ.js";const F={class:"absolute-container"},L=d({name:"OtherFunctionsScreenLibraryDetail",__name:"detail",setup(O){const c=b(),u=g(),m=E(),n=B(),o=v();function a(){o.value.submit().then(()=>{C.emit("get-data-list"),s()})}function l(){s()}function s(){n.settings.tabbar.enable&&n.settings.tabbar.mergeTabsBy!=="activeMenu"?m.close({name:"screenLibrary"}):u.push({name:"screenLibrary"})}return(T,w)=>{const _=S,r=y("ElButton"),f=p;return h(),k("div",F,[e(_,null,{default:t(()=>[e(D,{id:x(c).params.id,ref_key:"formRef",ref:o,onOnSubmit:a},null,8,["id"])]),_:1}),e(f,null,{default:t(()=>[e(r,{type:"primary",size:"large",onClick:a},{default:t(()=>[i(" 提交 ")]),_:1}),e(r,{size:"large",onClick:l},{default:t(()=>[i(" 取消 ")]),_:1})]),_:1})])}}}),$=R(L,[["__scopeId","data-v-0320553c"]]);export{$ as default};
