
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{_ as p}from"./index-LjRuwZXa.js";import{d,t as b,L as g,s as B,r as y,a as C,o as h,b as k,f as e,w as t,i as v,g as i,C as x,q as S,_ as L}from"./index-AWq_1fCc.js";import R from"./index-BhLHsFeP.js";import{u as E}from"./useTabbar-hvs5CR4H.js";import"./otherFunctions_screenLibrary-DAharo2R.js";const F={class:"absolute-container"},T=d({name:"OtherFunctionsScreenLibraryDetail",__name:"detail",setup(w){const c=b(),u=g(),l=E(),n=B(),a=y();function o(){a.value.submit().then(()=>{x.emit("get-data-list"),s()})}function _(){s()}function s(){n.settings.tabbar.enable&&n.settings.tabbar.mergeTabsBy!=="activeMenu"?l.close({name:"screenLibrary"}):u.push({name:"screenLibrary"})}return(z,D)=>{const m=S,r=C("ElButton"),f=p;return h(),k("div",F,[e(m,null,{default:t(()=>[e(R,{id:v(c).params.id,ref_key:"formRef",ref:a,onOnSubmit:o},null,8,["id"])]),_:1}),e(f,null,{default:t(()=>[e(r,{type:"primary",size:"large",onClick:o},{default:t(()=>[i(" 提交 ")]),_:1}),e(r,{size:"large",onClick:_},{default:t(()=>[i(" 取消 ")]),_:1})]),_:1})])}}}),A=L(T,[["__scopeId","data-v-e35124ac"]]);export{A as default};
