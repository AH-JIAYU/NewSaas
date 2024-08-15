
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{ae as e,r as n,an as r}from"./index-DntGxMRg.js";const f=e("tenantStaff",()=>{const t=n([]);return{staff:t,getStaff:async()=>{if(t.value.length)return t.value;const{data:a}=await r.list({id:"",userName:"",active:"",departmentId:""});return t.value=a.data,a.data}}}),u=f;export{u};
