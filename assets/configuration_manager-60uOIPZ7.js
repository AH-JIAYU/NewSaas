
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{v as e,r as n,am as f}from"./index-CIFOFIw0.js";const r=e("tenantStaff",()=>{const t=n([]);return{staff:t,getStaff:async()=>{if(t.value.length)return t.value;const{data:a}=await f.list({name:"",role:""});return a}}}),u=r;export{u};
