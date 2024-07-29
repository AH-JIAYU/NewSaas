
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{k as t,A as l,r}from"./index-DU62AkNh.js";const L={list:e=>t.post("memberLevel/getMemberLevelList",e),create:e=>t.post("memberLevel/addMemberLevel",e),edit:e=>t.post("memberLevel/updateMemberLevel",e),delete:e=>t.post("memberLevel/deleteMemberLevel",e),getLevelNameList:e=>t.post("memberLevel/getMemberLevelNameList",e)},a=l("surveyVipLevel",()=>{const e=r(null);return{LevelNameList:e,getLevelNameList:async()=>{if(!e.value){const{data:s}=await L.getLevelNameList({});e.value=s.getMemberLevelNameInfoList}return e.value}}}),i=a;export{L as a,i as u};
