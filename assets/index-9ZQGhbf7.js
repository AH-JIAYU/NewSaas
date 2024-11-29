
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{a as k}from"./project_settlement-BdmcFAiw.js";import{d as C,r as s,a as n,q as D,s as E,o as h,b as B,f as t,w as l,y as N,g as f,E as R,L as S}from"./index-D_Rj23yr.js";const q={style:{flex:"auto"}},T=C({name:"AddSettlement",__name:"index",emits:["success"],setup(U,{expose:p,emit:_}){const v=_,r=s(),u=s(!1),o=s(!1),a=s({projectId:null}),g=s({projectId:[{required:!0,trigger:"blur",message:"请输入项目ID"}]});function b(){r.value&&r.value.validate(async c=>{if(c)try{u.value=!0,await k.omissionProject(a.value),v("success"),u.value=!1,R.success({message:"操作成功",center:!0}),d()}catch{}finally{u.value=!1}})}async function I(){o.value=!0}function d(){r.value.resetFields(),Object.assign(a,{projectId:null}),o.value=!1}return p({showEdit:I}),(c,e)=>{const V=n("el-input"),y=n("el-form-item"),j=n("el-form"),m=n("el-button"),x=n("el-dialog"),w=D("loading");return E((h(),B("div",null,[t(x,{modelValue:o.value,"onUpdate:modelValue":e[2]||(e[2]=i=>o.value=i),title:"遗漏项目新增",width:"700","before-close":d},{footer:l(()=>[N("div",q,[t(m,{onClick:e[1]||(e[1]=i=>o.value=!1)},{default:l(()=>[f(" 取消 ")]),_:1}),t(m,{type:"primary",onClick:b},{default:l(()=>[f(" 确定 ")]),_:1})])]),default:l(()=>[t(j,{ref_key:"formRef",ref:r,"label-width":"6.375rem",model:a.value,rules:g.value,inline:!1},{default:l(()=>[t(y,{label:"项目ID",prop:"projectId"},{default:l(()=>[t(V,{modelValue:a.value.projectId,"onUpdate:modelValue":e[0]||(e[0]=i=>a.value.projectId=i),placeholder:"请输入项目ID"},null,8,["modelValue"])]),_:1})]),_:1},8,["model","rules"])]),_:1},8,["modelValue"])])),[[w,u.value]])}}}),H=S(T,[["__scopeId","data-v-1d4102e7"]]);export{H as default};
