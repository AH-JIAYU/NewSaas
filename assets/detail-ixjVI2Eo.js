
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{_ as p}from"./index-BMTl4Itn.js";import{d,s as b,L as g,t as B,r as y,a as C,o as h,b as k,f as e,w as t,i as v,g as r,C as x,q as S,_ as L}from"./index-6BKMpupp.js";import R from"./index-IbWLRZYp.js";import{u as E}from"./useTabbar-Y7F0v9rn.js";const F={class:"absolute-container"},T=d({name:"OtherFunctionsScreenLibraryDetail",__name:"detail",setup(w){const i=b(),c=g(),u=E(),a=B(),n=y();function l(){n.value.submit().then(()=>{x.emit("get-data-list"),o()})}function _(){o()}function o(){a.settings.tabbar.enable&&a.settings.tabbar.mergeTabsBy!=="activeMenu"?u.close({name:"screenLibrary"}):c.push({name:"screenLibrary"})}return(z,D)=>{const m=S,s=C("ElButton"),f=p;return h(),k("div",F,[e(m,null,{default:t(()=>[e(R,{id:v(i).params.id,ref_key:"formRef",ref:n},null,8,["id"])]),_:1}),e(f,null,{default:t(()=>[e(s,{type:"primary",size:"large",onClick:l},{default:t(()=>[r(" 提交 ")]),_:1}),e(s,{size:"large",onClick:_},{default:t(()=>[r(" 取消 ")]),_:1})]),_:1})])}}}),A=L(T,[["__scopeId","data-v-b4007d58"]]);export{A as default};
