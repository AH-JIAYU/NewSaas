
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{a as o}from"./basicDictionary-C7Qa_4YJ.js";import{E as m,r as u}from"./index-DnPHdPWF.js";const p=m("basicDictionary",()=>{const a=u([]),i=u([]),f=async()=>{if(!a.value.length){const e={page:1,limit:-1,id:"32"},t=await o.itemlist(e);a.value=t.data.records}return a.value},d=async()=>{if(!i.value.length){const e=await o.list(),t=c(e.data,"34");t.children.forEach(n=>{n.leaf=!1}),i.value=t.children}return i.value},h=async e=>{const t=c(i.value,e);if("children"in t&&!t.children&&!t.leaf){const n={page:1,limit:-1,id:e},{data:{records:r}}=await o.itemlist(n);return r.forEach(l=>{l.leaf=!0}),i.value=s(i.value,e,"children",r),r.length||(i.value=s(i.value,e,"leaf",!0)),r}return i.value};function c(e,t){for(let n of e){if(n.id===t)return n;if(Array.isArray(n.children)){const r=c(n.children,t);if(r)return r}}return null}function s(e,t,n,r){for(let l=0;l<e.length;l++){if(e[l].id===t)return e[l][n]=r,e;e[l].children&&e[l].children.length>0&&(e[l].children=s(e[l].children,t,n,r))}return e}return{country:a,B2BType:i,getCountry:f,getB2BType:d,getB2BTypeItemChildren:h}}),g=p;export{g as u};
