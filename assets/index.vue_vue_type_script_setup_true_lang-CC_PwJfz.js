
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{d as C,r as m,aj as V,a as r,o as w,e as N,w as i,v as T,f as t,g as _,A as a,i as o,ai as h}from"./index-DZ7Gqds7.js";import{o as y}from"./apiLoading-Dp6FDPP4.js";const I={class:"m-4"},k=C({__name:"index",setup(L,{expose:f}){const p=m(),c=m(!1),{t:e}=V(),l=m();async function b(d){l.value=d;const n={tenantCustomerOperationId:d.tenantCustomerOperationId},{status:u,data:s}=await y(h.getRecordList(n));p.value=s.getTenantCustomerOperationRecordInfoList,c.value=!0}return f({showEdit:b}),(d,n)=>{const u=r("el-text"),s=r("el-table-column"),g=r("el-table"),x=r("el-dialog");return w(),N(x,{modelValue:c.value,"onUpdate:modelValue":n[0]||(n[0]=v=>c.value=v),title:o(e)("customer.detail.detail"),width:"800"},{default:i(()=>[T("p",I,[t(u,{class:"mx-1"},{default:i(()=>[_(a(o(e)("customer.detail.operator"))+" "+a(l.value.createName),1)]),_:1}),t(u,{class:"mx-1"},{default:i(()=>[_(a(o(e)("customer.detail.operatingTime"))+" "+a(l.value.createName)+" "+a(l.value.createTime),1)]),_:1})]),t(g,{style:{"margin-top":"10px"},border:"",data:p.value},{default:i(()=>[t(s,{align:"left",type:"index",label:o(e)("customer.detail.serialNumber"),width:"150"},null,8,["label"]),t(s,{align:"left",prop:"operationContent",label:o(e)("customer.detail.operationContent")},null,8,["label"])]),_:1},8,["data"])]),_:1},8,["modelValue","title"])}}});export{k as _};
