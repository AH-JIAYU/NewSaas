
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{k as t,C as m,r as s}from"./index-fm4O04o6.js";const i={list:e=>t.post("member/getMemberList",e),detail:e=>t.post("member/getMemberInfo",e),create:e=>t.post("member/addMember",e),edit:e=>t.post("member/updateMember",e),changestatus:e=>t.post("member/updateMemberStatus",e),getNickNameList:e=>t.post("member/getMemberLikeNickNameList",e)},r=m("surveyVip",()=>{const e=s(null);return{NickNameList:e,initialTopTabsData:{memberNickname:"",memberLevelId:"",subordinateCountryId:"",memberName:"",memberPhone:"",emailAddress:"",b2bStatus:1,b2cStatus:2,memberStatus:2,exemptionTrial:1},getNickNameList:async()=>{if(!e.value){const{data:a}=await i.getNickNameList({memberNickname:""});e.value=a.getMemberLikeNickNameInfoList}return e.value}}}),u=r;export{i as a,u};
