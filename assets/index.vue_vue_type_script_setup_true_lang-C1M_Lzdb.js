
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{a as v}from"./user_customer-0ChSzHWC.js";import{d as b,r as i,a as s,o as C,e as V,w as n,l as w,f as e,g as m,D as p,ai as h}from"./index-C_N3Tfx9.js";const y={class:"m-4"},I=b({__name:"index",setup(N,{expose:u}){const d=i(),l=i(!1),r=i();async function _(c){r.value=c;const t={tenantCustomerOperationId:c.tenantCustomerOperationId},{status:a,data:o}=await v.getRecordList(t);a===1&&h.success({message:"获取成功",center:!0}),d.value=o.getTenantCustomerOperationRecordInfoList,l.value=!0}return u({showEdit:_}),(c,t)=>{const a=s("el-text"),o=s("el-table-column"),f=s("el-table"),g=s("el-dialog");return C(),V(g,{modelValue:l.value,"onUpdate:modelValue":t[0]||(t[0]=x=>l.value=x),title:"详情",width:"800"},{default:n(()=>[w("p",y,[e(a,{class:"mx-1"},{default:n(()=>[m(" 操作人: "+p(r.value.createName),1)]),_:1}),e(a,{class:"mx-1"},{default:n(()=>[m(" 操时间: "+p(r.value.createTime),1)]),_:1})]),e(f,{style:{"margin-top":"10px"},border:"",data:d.value},{default:n(()=>[e(o,{align:"center",type:"index",label:"序号",width:"150"}),e(o,{align:"center",prop:"operationContent",label:"操作内容"})]),_:1},8,["data"])]),_:1},8,["modelValue"])}}});export{I as _};
