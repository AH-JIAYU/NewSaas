
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{a as p}from"./user_supplier-Cu1jrD6-.js";import{E as u,r as l}from"./index-DvpS3Rvf.js";const i=u("userSupplier",()=>{const t=[{value:1,label:"银行转账"},{value:2,label:"支付宝"},{value:3,label:"paypal"}],a={supplierAccord:"",surveySystem:1,b2bStatus:1,b2cStatus:2,supplierStatus:1},e=l(null);return{payMethod:t,initialTopTabsData:a,TenantSupplierList:e,getTenantSupplierList:async r=>{if(!e.value){const{data:s}=await p.getTenantSupplierProjectList({projectId:r});e.value=s.getTenantSupplierProjectInfoList}return e.value}}}),c=i;export{c as u};
