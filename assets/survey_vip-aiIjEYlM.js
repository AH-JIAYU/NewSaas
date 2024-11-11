
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{k as t}from"./index-BjkRYaBU.js";const s={list:e=>t.post("member/getMemberList",e),detail:e=>t.post("member/getMemberInfo",e),create:e=>t.post("member/addMember",e),edit:e=>t.post("member/updateMember",e),changestatus:e=>t.post("member/updateMemberStatus",e),getNickNameList:e=>t.post("member/getMemberLikeNickNameList",e),getMemberPlusMinusPaymentsList:e=>t.post("member/additionSubtractionMember",e)};export{s as a};
