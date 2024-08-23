
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{a as t}from"./survey_vipGroup-CRu-RMBn.js";import{af as o,r as a}from"./index-IO_LN-IO.js";const u=o("surveyVipGroup",()=>{const e=a(null);return{GroupNameList:e,getGroupNameList:async()=>{if(!e.value){const{data:r}=await t.getGroupNameList({});e.value=r.getMemberGroupNameInfoList}return e.value}}}),n=u;export{n as u};
