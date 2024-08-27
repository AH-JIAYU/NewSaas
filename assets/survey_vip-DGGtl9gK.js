
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{a}from"./survey_vip-0ZiTX0t9.js";import{af as i,r}from"./index-Cikis37a.js";const m=i("surveyVip",()=>{const e=r(null);return{NickNameList:e,initialTopTabsData:{memberNickname:"",memberLevelId:"",subordinateCountryId:"",memberName:"",memberPhone:"",emailAddress:"",b2bStatus:1,b2cStatus:2,memberStatus:2,exemptionTrial:1,randomStatus:1},getNickNameList:async()=>{if(!e.value){const{data:t}=await a.getNickNameList({memberNickname:""});e.value=t.getMemberLikeNickNameInfoList}return e.value}}}),c=m;export{c as u};
