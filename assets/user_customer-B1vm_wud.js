
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{a as r}from"./user_customer-FWSe2dvJ.js";import{E as s,r as o}from"./index-BWtuCxpb.js";const a=s("userCustomer",()=>{const t=o(null);return{customer:t,initialTopTabsData:{customerAccord:"",customerShortName:"",companyName:"",customerName:"",customerPhone:"",emailAddress:"",chargeName:"",settlementCycle:null,customerStatus:2,antecedentQuestionnaire:1,riskControl:1,turnover:null,rateAudit:null},getCustomerList:async()=>{if(!t.value){const{data:e}=await r.getCustomerList({});t.value=e.getTenantCustomerAccordInfoList}return t.value}}}),i=a;export{i as u};
