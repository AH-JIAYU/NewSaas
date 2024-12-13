
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{a as o}from"./configuration_role-DwyQiU2M.js";import{ag as a,r as n}from"./index-Bs6Fzy0n.js";const r=a("tenant_role",()=>{const e=n([]);return{role:e,getRole:async()=>{if(e.value.length)return e.value;const{data:t}=await o.list({id:null,name:""});return e.value=t||[],t}}}),i=r;export{i as u};
