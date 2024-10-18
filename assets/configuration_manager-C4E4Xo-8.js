
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{af as e,r as f,p as n}from"./index-DaCw3jny.js";const r=e("tenantStaff",()=>{const t=f([]);return{staff:t,getStaff:async()=>{if(t.value.length)return t.value;const{data:a}=await n.getTenantStaffList();return t.value=a,a}}}),u=r;export{u};
