
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{a as C}from"./user_customer-C3jW8ogj.js";import{o as V}from"./apiLoading-C6H-iULa.js";import{d as w,r as u,ae as N,a2 as r,a as h,c as T,w as i,b as y,f as t,g as _,t as a,h as o}from"./index-B2fAK_OG.js";const I={class:"m-4"},O=w({__name:"index",setup(L,{expose:f}){const p=u(),c=u(!1),{t:e}=N(),l=u();async function b(d){l.value=d;const n={tenantCustomerOperationId:d.tenantCustomerOperationId},{status:m,data:s}=await V(C.getRecordList(n));p.value=s.getTenantCustomerOperationRecordInfoList,c.value=!0}return f({showEdit:b}),(d,n)=>{const m=r("el-text"),s=r("el-table-column"),g=r("el-table"),x=r("el-dialog");return h(),T(x,{modelValue:c.value,"onUpdate:modelValue":n[0]||(n[0]=v=>c.value=v),title:o(e)("customer.detail.detail"),width:"800"},{default:i(()=>[y("p",I,[t(m,{class:"mx-1"},{default:i(()=>[_(a(o(e)("customer.detail.operator"))+" "+a(l.value.createName),1)]),_:1}),t(m,{class:"mx-1"},{default:i(()=>[_(a(o(e)("customer.detail.operatingTime"))+" "+a(l.value.createName)+" "+a(l.value.createTime),1)]),_:1})]),t(g,{style:{"margin-top":"10px"},border:"",data:p.value},{default:i(()=>[t(s,{align:"left",type:"index",label:o(e)("customer.detail.serialNumber"),width:"150"},null,8,["label"]),t(s,{align:"left",prop:"operationContent",label:o(e)("customer.detail.operationContent")},null,8,["label"])]),_:1},8,["data"])]),_:1},8,["modelValue","title"])}}});export{O as _};
