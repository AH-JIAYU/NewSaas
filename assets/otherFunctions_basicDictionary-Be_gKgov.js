
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{a as u}from"./basicDictionary-1lgpd-sP.js";import{B as p,r as f}from"./index-BP3NysZD.js";const B=p("basicDictionary",()=>{const c=f(),l=f([]),n=f([]),d=async()=>{if(!c.value){const e=await u.list();c.value=e.data}return c.value},h=async()=>{if(!l.value.length){const e={page:1,limit:-1,id:"32"},t=await u.itemlist(e);l.value=t.data.records}return l.value},v=async()=>{if(!n.value.length){const e=s(await d(),"34");e.children.forEach(t=>{t.leaf=!1}),n.value=e.children}return n.value},m=async e=>{const t=s(n.value,e);if(t&&"children"in t&&!t.children&&!t.leaf){const a={page:1,limit:-1,id:e},{data:{records:i}}=await u.itemlist(a);return i.forEach(r=>{r.leaf=!0}),n.value=o(n.value,e,"children",i),i.length||(n.value=o(n.value,e,"leaf",!0)),i}return n.value};function s(e,t){for(let a of e){if(a.id===t)return a;if(Array.isArray(a.children)){const i=s(a.children,t);if(i)return i}}return null}function o(e,t,a,i){for(let r=0;r<e.length;r++){if(e[r].id===t)return e[r][a]=i,e;e[r].children&&e[r].children.length>0&&(e[r].children=o(e[r].children,t,a,i))}return e}return{dict:c,country:l,B2BType:n,getDict:d,getCountry:h,getB2BType:v,getB2BTypeItemChildren:m}}),D=B;export{D as u};
