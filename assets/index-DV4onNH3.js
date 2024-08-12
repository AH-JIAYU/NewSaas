
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{a as k}from"./project_settlement-CmhffEAc.js";import{d as C,r as s,a as n,l as D,n as h,o as E,b as B,f as t,w as l,p as N,g as f,E as R,Q as S}from"./index-BQjh9Koe.js";const T={style:{flex:"auto"}},U=C({name:"AddSettlement",__name:"index",emits:["success"],setup(q,{expose:p,emit:_}){const v=_,r=s(),i=s(!1),o=s(!1),a=s({projectId:null}),g=s({projectId:[{required:!0,trigger:"blur",message:"请输入项目ID"}]});function b(){r.value&&r.value.validate(async c=>{c&&(i.value=!0,await k.omissionProject(a.value),v("success"),i.value=!1,R.success({message:"操作成功",center:!0}),d())})}async function x(){o.value=!0}function d(){r.value.resetFields(),Object.assign(a,{projectId:null}),o.value=!1}return p({showEdit:x}),(c,e)=>{const I=n("el-input"),V=n("el-form-item"),j=n("el-form"),m=n("el-button"),w=n("el-dialog"),y=D("loading");return h((E(),B("div",null,[t(w,{modelValue:o.value,"onUpdate:modelValue":e[2]||(e[2]=u=>o.value=u),title:"遗漏项目新增",width:"700",style:{height:"200px"},"before-close":d},{footer:l(()=>[N("div",T,[t(m,{onClick:e[1]||(e[1]=u=>o.value=!1)},{default:l(()=>[f(" 取消 ")]),_:1}),t(m,{type:"primary",onClick:b},{default:l(()=>[f(" 确定 ")]),_:1})])]),default:l(()=>[t(j,{ref_key:"formRef",ref:r,"label-width":"100px",model:a.value,rules:g.value,inline:!1},{default:l(()=>[t(V,{label:"项目ID",prop:"projectId"},{default:l(()=>[t(I,{modelValue:a.value.projectId,"onUpdate:modelValue":e[0]||(e[0]=u=>a.value.projectId=u),placeholder:"请输入项目ID"},null,8,["modelValue"])]),_:1})]),_:1},8,["model","rules"])]),_:1},8,["modelValue"])])),[[y,i.value]])}}}),H=S(U,[["__scopeId","data-v-59b28378"]]);export{H as default};
