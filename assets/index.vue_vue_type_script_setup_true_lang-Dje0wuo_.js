
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{d as C,r as m,aj as V,a as i,o as w,e as N,w as r,v as T,f as t,g as _,A as a,i as o,ai as h}from"./index-Bi2SFuNB.js";import{o as y}from"./apiLoading-s2lzwfnW.js";const I={class:"m-4"},k=C({__name:"index",setup(L,{expose:f}){const p=m(),c=m(!1),{t:e}=V(),l=m();async function b(d){l.value=d;const n={tenantCustomerOperationId:d.tenantCustomerOperationId},{status:u,data:s}=await y(h.getRecordList(n));p.value=s.getTenantCustomerOperationRecordInfoList,c.value=!0}return f({showEdit:b}),(d,n)=>{const u=i("el-text"),s=i("el-table-column"),g=i("el-table"),x=i("el-dialog");return w(),N(x,{modelValue:c.value,"onUpdate:modelValue":n[0]||(n[0]=v=>c.value=v),title:o(e)("customer.detail.detail"),width:"800"},{default:r(()=>[T("p",I,[t(u,{class:"mx-1"},{default:r(()=>[_(a(o(e)("customer.detail.operator"))+" "+a(l.value.createName),1)]),_:1}),t(u,{class:"mx-1"},{default:r(()=>[_(a(o(e)("customer.detail.operatingTime"))+" "+a(l.value.createName)+" "+a(l.value.createTime),1)]),_:1})]),t(g,{style:{"margin-top":"10px"},border:"",data:p.value},{default:r(()=>[t(s,{align:"left",type:"index",label:o(e)("customer.detail.serialNumber"),width:"150"},null,8,["label"]),t(s,{align:"left",prop:"operationContent",label:o(e)("customer.detail.operationContent")},null,8,["label"])]),_:1},8,["data"])]),_:1},8,["modelValue","title"])}}});export{k as _};
