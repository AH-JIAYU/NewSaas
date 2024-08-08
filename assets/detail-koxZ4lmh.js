
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{_ as p}from"./index-pbv2Dwiw.js";import{d,n as b,G as g,l as B,r as x,a as y,o as h,b as k,f as e,w as t,i as v,g as i,x as C,aj as S,J as R}from"./index-CHE_Y-qx.js";import{D}from"./index-BLcS79qf.js";import{u as E}from"./useTabbar-BP1Pwett.js";/* empty css                      */import"./apiLoading-XnHxHQXo.js";import"./otherFunctions_screenLibrary-BPWelfJJ.js";const F={class:"absolute-container"},L=d({name:"OtherFunctionsScreenLibraryDetail",__name:"detail",setup(T){const c=b(),u=g(),l=E(),n=B(),a=x();function o(){a.value.submit().then(()=>{C.emit("get-data-list"),s()})}function m(){s()}function s(){n.settings.tabbar.enable&&n.settings.tabbar.mergeTabsBy!=="activeMenu"?l.close({name:"screenLibrary"}):u.push({name:"screenLibrary"})}return(w,z)=>{const _=S,r=y("ElButton"),f=p;return h(),k("div",F,[e(_,null,{default:t(()=>[e(D,{id:v(c).params.id,ref_key:"formRef",ref:a,onOnSubmit:o},null,8,["id"])]),_:1}),e(f,null,{default:t(()=>[e(r,{type:"primary",size:"large",onClick:o},{default:t(()=>[i(" 提交 ")]),_:1}),e(r,{size:"large",onClick:m},{default:t(()=>[i(" 取消 ")]),_:1})]),_:1})])}}}),I=R(L,[["__scopeId","data-v-4c645875"]]);export{I as default};
