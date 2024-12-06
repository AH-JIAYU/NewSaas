
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{a as p}from"./user_supplier-CURFE4RQ.js";import{ag as l,r as u}from"./index-DeLZGArN.js";const n=l("userSupplier",()=>{const t=[{value:1,label:"银行转账"},{value:2,label:"支付宝"},{value:3,label:"paypal"}],a={supplierAccord:"",countryType:"",surveySystem:1,b2bStatus:1,b2cStatus:2,supplierStatus:2},e=u(null);return{payMethod:t,initialTopTabsData:a,TenantSupplierList:e,getTenantSupplierList:async r=>{if(!e.value){const{data:s}=await p.getTenantSupplierProjectList({projectId:r});e.value=s.getTenantSupplierProjectInfoList}return e.value}}}),S=n;export{S as U};
