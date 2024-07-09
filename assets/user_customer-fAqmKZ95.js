
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{k as e}from"./index-BVN4Z1ED.js";const s={list:t=>e.post("tenantCustomer/getTenantCustomerList",t),detail:t=>e.post("tenantCustomer/getTenantCustomerInfo",t),create:t=>e.post("tenantCustomer/addTenantCustomer",t),edit:t=>e.post("tenantCustomer/updateTenantCustomer",t),changestatus:t=>e.post("tenantCustomer/updateTenantCustomerStatus",t),delete:t=>e.post("tenantCustomer/deleteTenantCustomer",t),getRecordList:t=>e.post("tenantCustomer/getTenantCustomerOperationRecordList",t),getCustomerList:t=>e.post("tenantCustomer/getTenantCustomerAccordList",t),getTenantSecretKeyConfigList:()=>e.post("secret/get/getTenantSecretKeyConfigList"),generateKey:t=>e.post("secret/get/generateKey",t)};export{s as a};
