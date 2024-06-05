
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{k as t,ah as s,r as m}from"./index-CX2PmK0L.js";const i={list:e=>t.post("member/getMemberList",e),detail:e=>t.post("member/getMemberInfo",e),create:e=>t.post("member/addMember",e),edit:e=>t.post("member/updateMember",e),changestatus:e=>t.post("member/updateMemberStatus",e),getNickNameList:e=>t.post("member/getMemberLikeNickNameList",e)},r=s("surveyVip",()=>{const e=m(null);return{NickNameList:e,getNickNameList:async()=>{if(!e.value){const{data:a}=await i.getNickNameList({memberNickname:""});e.value=a.getMemberLikeNickNameInfoList}return e.value}}}),u=r;export{i as a,u};
