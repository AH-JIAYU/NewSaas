
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{k as t}from"./index-xFIogLdu.js";const o={sendCode:e=>t.post("user/sendCode",e),forgetCode:e=>t.post("user/updatePasswordSendCode",e),updatePassword:e=>t.post("user/updatePassword",e),register:e=>t.post("user/register",e),getTenantConfig:e=>t.post("tenant-config/getTenantConfig",e),getTenantPageTemplate:e=>t.post("record/getTenantPageTemplate",e)};export{o as a};
