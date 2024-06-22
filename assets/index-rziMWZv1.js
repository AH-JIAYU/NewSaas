
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{d as y,r as s,a4 as w,a as r,o as R,e as U,w as e,f as t,g as d,i as l,p as q,_ as B}from"./index-BWtuCxpb.js";const I=y({name:"ConfigurationSupplierLevelIndex",__name:"index",setup(N,{expose:g}){const a=s(!1),m=s(""),o=s(),f=s(),v=w({name:[{required:!0,message:"请输入名称",trigger:"blur"}],number:[{required:!0,message:"请输入比例",trigger:"blur"}]});async function V(i){i?(m.value="编辑",o.value=i):(m.value="添加",o.value={}),a.value=!0}function p(){f.value.resetFields(),a.value=!1}function x(){p()}return g({showEdit:V}),(i,n)=>{const _=r("el-input"),c=r("el-form-item"),C=r("el-form"),b=r("el-button"),k=r("el-dialog");return R(),U(k,{modelValue:l(a),"onUpdate:modelValue":n[2]||(n[2]=u=>q(a)?a.value=u:null),title:l(m),width:"600"},{footer:e(()=>[t(b,{type:"primary",onClick:x},{default:e(()=>[d(" 确定 ")]),_:1}),t(b,{onClick:p},{default:e(()=>[d(" 取消 ")]),_:1})]),default:e(()=>[t(C,{ref_key:"formRef",ref:f,model:l(o),rules:l(v),"label-width":"80px",inline:!1},{default:e(()=>[t(c,{label:"等级名称",prop:"name"},{default:e(()=>[t(_,{modelValue:l(o).name,"onUpdate:modelValue":n[0]||(n[0]=u=>l(o).name=u),maxlength:"100"},null,8,["modelValue"])]),_:1}),t(c,{label:"加成比例",prop:"number"},{default:e(()=>[t(_,{modelValue:l(o).number,"onUpdate:modelValue":n[1]||(n[1]=u=>l(o).number=u),type:"number"},{append:e(()=>[d(" % ")]),_:1},8,["modelValue"])]),_:1})]),_:1},8,["model","rules"])]),_:1},8,["modelValue","title"])}}}),T=B(I,[["__scopeId","data-v-960620ee"]]);export{T as default};
