
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{k as n}from"./index-rMCvG2s3.js";const a={list:()=>n.post("tenant-web-config/getTenantWebConfig"),edit:e=>n.post("tenant-web-config/updateTenantWebConfig",e),getTenantWebConfigQueryAnalysis:e=>n.post("tenant-web-config/getTenantWebConfigQueryAnalysis",e),uploadSSLCert:e=>n.post("tenant-web-config/uploadSSLCert",e),getTenantWebConfigKeepOnRecord:e=>n.post("tenant-web-config/getTenantWebConfigKeepOnRecord",e),getBackgroundRecordList:e=>n.post("record/getBackgroundRecordList",e),addAnalyzeTenantBackground:e=>n.post("record/addAnalyzeTenantBackground",e),addAnalyzeSupplierBackground:e=>n.post("record/addAnalyzeSupplierBackground",e),addAnalyzeMemberBackground:e=>n.post("record/addAnalyzeMemberBackground",e),checkDomainRecord:e=>n.post("record/checkDomainRecord",e)};export{a};
