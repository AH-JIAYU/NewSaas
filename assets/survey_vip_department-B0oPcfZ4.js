
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{k as t}from"./index-7bVKZbtb.js";const a={list:e=>t.post("member-organizationalStructure/queryOrganizationalStructure",e),itemlist:e=>t.post("member/queryMemberListByOrganizationId",e),create:e=>t.post("member-organizationalStructure/insertOrganizationalStructure",e),edit:e=>t.post("member-organizationalStructure/updateOrganizationalStructure",e),delete:e=>t.post("member-organizationalStructure/deleteOrganizationalStructure",e),queryMemberList:()=>t.post("member/queryMemberList"),queryMemberListByOrganizationIdToUpdate:e=>t.post("member/queryMemberListByOrganizationIdToUpdate",e)};export{a};
