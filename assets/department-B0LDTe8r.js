
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{a as r}from"./department-DNz9uYTC.js";import{ag as a,r as n}from"./index-Je2rJzER.js";const o=a("department",()=>{const t=n(null);return{department:t,getDepartment:async()=>{if(t.value)return t.value;const{data:e}=await r.list({name:""});return t.value=(e==null?void 0:e.data)||[],e==null?void 0:e.data}}}),u=o;export{u};
