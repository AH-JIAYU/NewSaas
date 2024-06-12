
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{a as e}from"./basicDictionary-CrjET7Gj.js";import{E as o,r as i}from"./index-C29iptdf.js";const s=o("basicDictionary",()=>{const t=i([]);return{country:t,getCountry:async()=>{if(!t.value.length){const r={page:1,limit:-1,id:"32"},a=await e.itemlist(r);t.value=a.data.records}return t.value}}}),m=s;export{m as u};
