
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{a as o}from"./user_customer-BUGUBMku.js";import{ag as s,r}from"./index-DSaDGYUV.js";const a=s("userCustomer",()=>{const t=r(null);return{customer:t,initialTopTabsData:{customerAccord:"",customerShortName:"",companyName:"",customerName:"",customerPhone:"",emailAddress:"",chargeName:"",settlementCycle:null,customerStatus:2,antecedentQuestionnaire:1,riskControl:1,turnover:null,rateAudit:null,tenantCustomerConfigInfoList:[{callbackWay:2,isEncryption:2,encryptionId:"",secretKey:""}]},getCustomerList:async()=>{if(console.log("获取list"),!t.value){const{data:e}=await o.getCustomerList({});t.value=e.getTenantCustomerAccordInfoList}return t.value}}}),m=a;export{m as u};
