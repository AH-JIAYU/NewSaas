
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{a as i}from"./configuration_site_setting-B2_oADFZ.js";import{ab as n,r as o}from"./index-C9fHoe7f.js";const a=n("configurationSiteSetting",()=>{const t=o();return{siteConfig:t,getSiteConfig:async()=>{if(t.value)return t.value;{const e=await i.list();return t.value=e.data,e.data}},setSiteConfig:e=>{t.value=e}}}),g=a;export{g as u};
