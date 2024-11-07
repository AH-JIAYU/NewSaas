
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{o as b}from"./apiLoading-BrxkeqqD.js";import{c as v}from"./user_customer-BQrpciRb.js";import{d as C,r as i,a as o,o as V,e as w,w as n,y,f as e,g as m,z as p}from"./index-BDWalcy-.js";const h={class:"m-4"},I=C({__name:"index",setup(L,{expose:u}){const c=i(),l=i(!1),s=i();async function _(r){s.value=r;const t={tenantCustomerOperationId:r.tenantCustomerOperationId},{data:a}=await b(v.getRecordList(t));c.value=a.getTenantCustomerOperationRecordInfoList,l.value=!0}return u({showEdit:_}),(r,t)=>{const a=o("el-text"),d=o("el-table-column"),f=o("el-table"),x=o("el-dialog");return V(),w(x,{modelValue:l.value,"onUpdate:modelValue":t[0]||(t[0]=g=>l.value=g),title:"详情",width:"800"},{default:n(()=>[y("p",h,[e(a,{class:"mx-1"},{default:n(()=>[m(" 操作人: "+p(s.value.createName),1)]),_:1}),e(a,{class:"mx-1"},{default:n(()=>[m(" 操时间: "+p(s.value.createTime),1)]),_:1})]),e(f,{style:{"margin-top":"10px"},border:"",data:c.value},{default:n(()=>[e(d,{align:"left",type:"index",label:"序号",width:"150"}),e(d,{align:"left",prop:"operationContent",label:"操作内容"})]),_:1},8,["data"])]),_:1},8,["modelValue"])}}});export{I as _};
