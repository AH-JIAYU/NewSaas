
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{a as b}from"./user_customer-C8ovrARd.js";import{o as v}from"./apiLoading-m62vV6us.js";import{d as C,r as c,b as o,o as V,f as w,w as n,t as h,g as e,h as m,H as p}from"./index--j4xLQ48.js";const y={class:"m-4"},I=C({__name:"index",setup(L,{expose:u}){const d=c(),l=c(!1),s=c();async function _(r){s.value=r;const t={tenantCustomerOperationId:r.tenantCustomerOperationId},{status:i,data:a}=await v(b.getRecordList(t));d.value=a.getTenantCustomerOperationRecordInfoList,l.value=!0}return u({showEdit:_}),(r,t)=>{const i=o("el-text"),a=o("el-table-column"),f=o("el-table"),x=o("el-dialog");return V(),w(x,{modelValue:l.value,"onUpdate:modelValue":t[0]||(t[0]=g=>l.value=g),title:"详情",width:"800"},{default:n(()=>[h("p",y,[e(i,{class:"mx-1"},{default:n(()=>[m(" 操作人: "+p(s.value.createName),1)]),_:1}),e(i,{class:"mx-1"},{default:n(()=>[m(" 操时间: "+p(s.value.createTime),1)]),_:1})]),e(f,{style:{"margin-top":"10px"},border:"",data:d.value},{default:n(()=>[e(a,{align:"left",type:"index",label:"序号",width:"150"}),e(a,{align:"left",prop:"operationContent",label:"操作内容"})]),_:1},8,["data"])]),_:1},8,["modelValue"])}}});export{I as _};
