
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{a as c}from"./department-Dtv_2BGp.js";import{ac as u,r as o}from"./index-mJqsIMw-.js";const p=u("department",()=>{const l=o(null),r=o(null),s=async()=>{const{data:t}=await c.list({name:""});if(t.length>0)return r.value=a(t),l.value=(t==null?void 0:t.data)||[],r.value};function a(t){let n=[];return t.forEach(e=>{n.push({...e,parentId:e.parentId||null}),e.children&&e.children.length>0&&(n=n.concat(a(e.children)))}),n}return{department:l,getDepartment:s,flatten:a,departmentList:r}}),i=p;export{i as u};
