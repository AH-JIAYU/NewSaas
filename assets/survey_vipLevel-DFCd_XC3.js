
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{k as t,ag as a,r as l}from"./index-DFGdtBQB.js";const r={list:e=>t.post("memberLevel/getMemberLevelList",e),create:e=>t.post("memberLevel/addMemberLevel",e),edit:e=>t.post("memberLevel/updateMemberLevel",e),delete:e=>t.post("memberLevel/deleteMemberLevel",e),getLevelNameList:e=>t.post("memberLevel/getMemberLevelNameList",e)},L=a("surveyVipLevel",()=>{const e=l(null);return{LevelNameList:e,getLevelNameList:async()=>{if(!e.value){const{data:s}=await r.getLevelNameList({});e.value=s.getMemberLevelNameInfoList}return e.value}}}),i=L;export{r as a,i as u};
