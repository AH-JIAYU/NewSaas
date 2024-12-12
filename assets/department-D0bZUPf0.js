
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{k as a}from"./index-DRY8n3bv.js";const e={list:t=>a.post("organizationalStructure/queryOrganizationalStructure",t),itemlist:t=>a.post("staff/queryStaffListByStructureId",t),create:t=>a.post("organizationalStructure/insertOrganizationalStructure",t),edit:t=>a.post("organizationalStructure/updateOrganizationalStructure",t),delete:t=>a.post("organizationalStructure/deleteOrganizationalStructure",t)};export{e as a};
