
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{a as o}from"./configuration_role-C5-I6Cf_.js";import{af as a,r}from"./index-D4axY0XK.js";const n=a("tenant_role",()=>{const e=r([]);return{role:e,getRole:async()=>{if(e.value.length)return e.value;const{data:t}=await o.list();return e.value=t,t}}}),i=n;export{i as u};
