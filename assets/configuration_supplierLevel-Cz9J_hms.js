
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{k as t,ag as l,r as n}from"./index-fk2hhPE5.js";const p={list:e=>t.post("tenantSupplierLevel/getTenantSupplierLevelList  ",e),create:e=>t.post("tenantSupplierLevel/addTenantSupplierLevel",e),edit:e=>t.post("tenantSupplierLevel/updateTenantSupplierLevel",e),delete:e=>t.post("tenantSupplierLevel/deleteTenantSupplierLevel",e),getLevelNameList:e=>t.post("tenantSupplierLevel/getTenantSupplierLevelName",e)},i=l("ConfigurationSupplierLevel",()=>{const e=n(null);return{LevelNameList:e,getLevelNameList:async()=>{if(!e.value){const{data:a}=await p.getLevelNameList({});e.value=a.getTenantSupplierLevelNameInfoList}return e.value}}}),u=i;export{p as a,u};
