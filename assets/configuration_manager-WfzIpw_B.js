
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{ag as e,r as n,p as f}from"./index-Bbqw4ZE_.js";const r=e("tenantStaff",()=>{const t=n([]);return{staff:t,getStaff:async()=>{if(t.value.length)return t.value;const{data:a}=await f.getTenantStaffList();return t.value=a,a}}}),u=r;export{u};
