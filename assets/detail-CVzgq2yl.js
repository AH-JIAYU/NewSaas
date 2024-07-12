
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{_ as f}from"./index-B2VSdy2S.js";import{d,v as b,P as g,t as B,r as v,a as y,o as h,b as k,f as e,w as t,i as x,g as i,H as C,s as S,_ as R}from"./index-Bh_VDJMf.js";import{D}from"./index-LvvMmyof.js";import{u as E}from"./useTabbar-iIF_3ksk.js";/* empty css                      */import"./apiLoading-BAxzax6u.js";import"./otherFunctions_screenLibrary-CrgXytvv.js";import"./basicDictionary-D-JQSrfT.js";import"./otherFunctions_basicDictionary-BAhY34-3.js";const F={class:"absolute-container"},L=d({name:"OtherFunctionsScreenLibraryDetail",__name:"detail",setup(T){const c=b(),u=g(),m=E(),o=B(),n=v();function a(){n.value.submit().then(()=>{C.emit("get-data-list"),s()})}function l(){s()}function s(){o.settings.tabbar.enable&&o.settings.tabbar.mergeTabsBy!=="activeMenu"?m.close({name:"screenLibrary"}):u.push({name:"screenLibrary"})}return(w,z)=>{const _=S,r=y("ElButton"),p=f;return h(),k("div",F,[e(_,null,{default:t(()=>[e(D,{id:x(c).params.id,ref_key:"formRef",ref:n,onOnSubmit:a},null,8,["id"])]),_:1}),e(p,null,{default:t(()=>[e(r,{type:"primary",size:"large",onClick:a},{default:t(()=>[i(" 提交 ")]),_:1}),e(r,{size:"large",onClick:l},{default:t(()=>[i(" 取消 ")]),_:1})]),_:1})])}}}),j=R(L,[["__scopeId","data-v-4c645875"]]);export{j as default};
