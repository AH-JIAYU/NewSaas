
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{x as s}from"./index-BZHzFsqK.js";const t={sendCode:e=>s.post("user/sendCode",e),forgetCode:e=>s.post("user/updatePasswordSendCode",e),updatePassword:e=>s.post("user/updatePassword",e),register:e=>s.post("user/register",e),getTenantConfig:e=>s.post("tenant-config/getTenantConfig",e)};export{t as a};
