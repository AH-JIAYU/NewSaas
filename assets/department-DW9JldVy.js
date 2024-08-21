
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{a}from"./department-CaIjgMtb.js";import{af as r,r as n}from"./index-D7ktWcYH.js";const o=r("department",()=>{const t=n([]);return{department:t,getDepartment:async()=>{if(t.value.length)return t.value;const{data:e}=await a.list({});return t.value=e.data||[],e.data}}}),u=o;export{u};
