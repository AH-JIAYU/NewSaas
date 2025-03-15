
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{k as e}from"./index-CaoSRXoh.js";const n={list:t=>e.post("tenantSupplier/getTenantSupplierList",t),detail:t=>e.post("tenantSupplier/getTenantSupplierInfo",t),create:t=>e.post("tenantSupplier/addTenantSupplier",t),edit:t=>e.post("tenantSupplier/updateTenantSupplier",t),changestatus:t=>e.post("tenantSupplier/updateTenantSupplierStatus",t),getTenantSupplierProjectList:t=>e.post("tenantSupplier/getTenantSupplierProjectList",t),getSupplierPlusMinusPaymentsList:t=>e.post("tenantSupplier/additionSubtractionSupplier",t),getCustomerCooperation:t=>e.post("tenantSupplier/getCustomerCooperation",t),getTenantSupplierInfo:t=>e.post("tenantSupplier/getTenantSupplierInfo",t),getOperationList:t=>e.post("tenantSupplier/getOperationList",t),supplierResetPassword:t=>e.post("tenantSupplier/supplierResetPassword",t)};export{n as a};
