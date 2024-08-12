
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{a as t}from"./survey_vipGroup-BoF7FonL.js";import{v as o,r as u}from"./index-BQjh9Koe.js";const a=o("surveyVipGroup",()=>{const e=u(null);return{GroupNameList:e,getGroupNameList:async()=>{if(!e.value){const{data:r}=await t.getGroupNameList({});e.value=r.getMemberGroupNameInfoList}return e.value}}}),n=a;export{n as u};
