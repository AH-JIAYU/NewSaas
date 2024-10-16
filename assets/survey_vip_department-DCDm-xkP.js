
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{k as r}from"./index-K6dbp77V.js";const e={list:t=>r.post("member-organizationalStructure/queryOrganizationalStructure",t),itemlist:t=>r.post("supplier-staff/getTenantSupplierStaffListByOrganizationId",t),create:t=>r.post("member-organizationalStructure/insertOrganizationalStructure",t),edit:t=>r.post("member-organizationalStructure/updateOrganizationalStructure",t),delete:t=>r.post("member-organizationalStructure/deleteOrganizationalStructure",t)};export{e as a};
