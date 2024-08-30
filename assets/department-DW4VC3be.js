
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{a as r}from"./department-C3xq9qiG.js";import{af as a,r as n}from"./index-DRUR9hKg.js";const o=a("department",()=>{const t=n(null);return{department:t,getDepartment:async()=>{if(t.value)return t.value;const{data:e}=await r.list({});return t.value=(e==null?void 0:e.data)||[],e==null?void 0:e.data}}}),u=o;export{u};
