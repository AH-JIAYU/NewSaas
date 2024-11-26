
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{a}from"./configuration_role-C30eQfsf.js";import{ag as n,r as o}from"./index-X2GS4PsQ.js";const r=n("tenant_role",()=>{const e=o([]);return{role:e,getRole:async()=>{if(e.value.length)return e.value;const{data:t}=await a.list({id:null,name:""});return e.value=t||[],t}}}),i=r;export{i as u};
