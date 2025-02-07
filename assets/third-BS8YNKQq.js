
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{ad as t}from"./index-yv3hHHZ6.js";const i={enableConfig:n=>t.post("tenantStorageConfig/enableConfig",n),getConfigList:()=>t.post("tenantStorageConfig/getConfigList"),updateAliConfig:n=>t.post("tenantStorageConfig/updateAliConfig",n),updateQiniuConfig:n=>t.post("tenantStorageConfig/updateQiniuConfig",n),smsEnableConfig:n=>t.post("tenantSmsConfig/enableConfig",n),smsGetConfigList:()=>t.post("tenantSmsConfig/getConfigList"),smsUpdateAliConfig:n=>t.post("tenantSmsConfig/updateAliConfig",n),smsUpdateTencentConfig:n=>t.post("tenantSmsConfig/updateTencentConfig",n)};export{i as a};
