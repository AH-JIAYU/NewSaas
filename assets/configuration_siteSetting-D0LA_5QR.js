
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{a as i}from"./configuration_site_setting-CTlprmpi.js";import{ag as n,r as o}from"./index-BE-pxncy.js";const a=n("configurationSiteSetting",()=>{const t=o();return{siteConfig:t,getSiteConfig:async()=>{if(t.value)return t.value;{const e=await i.list();return t.value=e.data,e.data}},setSiteConfig:e=>{t.value=e}}}),u=a;export{u};
