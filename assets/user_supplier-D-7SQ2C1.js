
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{a as s}from"./user_supplier-CaJjNO-Z.js";import{E as p,r as u}from"./index-C29iptdf.js";const l=p("userSupplier",()=>{const t=[{value:1,label:"银行转账"},{value:2,label:"支付宝"},{value:3,label:"paypal"}],a={supplierAccord:"",surveySystem:1,b2bStatus:1,b2cStatus:2,supplierStatus:1},e=u(null);return{payMethod:t,initialTopTabsData:a,TenantSupplierList:e,getTenantSupplierList:async()=>{if(!e.value){const{data:r}=await s.getTenantSupplierProjectList({projectId:""});e.value=r.getTenantSupplierProjectInfoList}return e.value}}}),S=l;export{S as u};
