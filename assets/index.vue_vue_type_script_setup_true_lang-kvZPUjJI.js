
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{o as v}from"./apiLoading-DRKsIy8c.js";import{d as b,r,a as o,o as C,e as V,w as n,v as w,f as e,g as m,A as p,ai as h}from"./index-BZvN0JzH.js";const y={class:"m-4"},B=b({__name:"index",setup(L,{expose:u}){const c=r(),l=r(!1),s=r();async function _(i){s.value=i;const t={tenantCustomerOperationId:i.tenantCustomerOperationId},{data:a}=await v(h.getRecordList(t));c.value=a.getTenantCustomerOperationRecordInfoList,l.value=!0}return u({showEdit:_}),(i,t)=>{const a=o("el-text"),d=o("el-table-column"),f=o("el-table"),x=o("el-dialog");return C(),V(x,{modelValue:l.value,"onUpdate:modelValue":t[0]||(t[0]=g=>l.value=g),title:"详情",width:"800"},{default:n(()=>[w("p",y,[e(a,{class:"mx-1"},{default:n(()=>[m(" 操作人: "+p(s.value.createName),1)]),_:1}),e(a,{class:"mx-1"},{default:n(()=>[m(" 操时间: "+p(s.value.createTime),1)]),_:1})]),e(f,{style:{"margin-top":"10px"},border:"",data:c.value},{default:n(()=>[e(d,{align:"left",type:"index",label:"序号",width:"150"}),e(d,{align:"left",prop:"operationContent",label:"操作内容"})]),_:1},8,["data"])]),_:1},8,["modelValue"])}}});export{B as _};
