
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{a as e}from"./position_manage-sXLhTWBD.js";import{ag as n,r as o}from"./index-BHmX7FLT.js";const i=n("PositionManage",()=>{const a=o([]);return{PositionManage:a,getPositionManage:async()=>{if(a.value.length)return a.value;const{data:t}=await e.list({page:1,limit:10,id:null,name:"",active:null});return a.value=t.data||[],t.data}}}),u=i;export{u};
