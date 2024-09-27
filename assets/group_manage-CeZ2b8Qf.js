
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{g as t}from"./group_manage-Bp6BZDqB.js";import{af as r,r as n}from"./index-D10CXOrd.js";const o=r("groupManage",()=>{const a=n([]);return{groupManage:a,getGroupManage:async()=>{if(a.value.length)return a.value;const{data:e}=await t.list({page:1,limit:10,id:null,name:"",active:null});return a.value=e.data||[],e.data}}}),p=o;export{p as u};
