
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{a as t}from"./survey_vip-CtzCXcWO.js";import{aa as i,r}from"./index-CHE_Y-qx.js";const m=i("surveyVip",()=>{const e=r(null);return{NickNameList:e,initialTopTabsData:{memberNickname:"",memberLevelId:"",subordinateCountryId:"",memberName:"",memberPhone:"",emailAddress:"",b2bStatus:1,b2cStatus:2,memberStatus:2,exemptionTrial:1,randomStatus:1},getNickNameList:async()=>{if(!e.value){const{data:a}=await t.getNickNameList({memberNickname:""});e.value=a.getMemberLikeNickNameInfoList}return e.value}}}),c=m;export{c as u};
