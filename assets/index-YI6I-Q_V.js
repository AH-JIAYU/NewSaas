
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{d as k,r as s,a1 as w,a as r,o as R,e as U,w as e,f as l,i as t,g as f,E as h,_ as q}from"./index-DQumISPN.js";const B=k({name:"ConfigurationSupplierLevelIndex",__name:"index",setup(E,{expose:g}){const a=s(!1),m=s(""),o=s(),p=s(),v=w({name:[{required:!0,message:"请输入名称",trigger:"blur"}],number:[{required:!0,message:"请输入比例",trigger:"blur"}]});async function V(d){d?(m.value="编辑",o.value=d):(m.value="添加",o.value={}),a.value=!0}function _(){p.value.resetFields(),a.value=!1}function x(){_()}return g({showEdit:V}),(d,n)=>{const c=r("el-input"),i=r("el-form-item"),b=r("el-button"),y=r("el-form"),C=r("el-dialog");return R(),U(C,{modelValue:t(a),"onUpdate:modelValue":n[2]||(n[2]=u=>h(a)?a.value=u:null),style:{height:"20.5rem"},title:t(m),width:"600"},{default:e(()=>[l(y,{model:t(o),ref_key:"formRef",ref:p,rules:t(v),"label-width":"80px",inline:!1},{default:e(()=>[l(i,{label:"等级名称",prop:"name"},{default:e(()=>[l(c,{maxlength:"100",modelValue:t(o).name,"onUpdate:modelValue":n[0]||(n[0]=u=>t(o).name=u)},null,8,["modelValue"])]),_:1}),l(i,{label:"加成比例",prop:"number"},{default:e(()=>[l(c,{modelValue:t(o).number,"onUpdate:modelValue":n[1]||(n[1]=u=>t(o).number=u),type:"number"},{append:e(()=>[f("%")]),_:1},8,["modelValue"])]),_:1}),l(i,null,{default:e(()=>[l(b,{type:"primary",onClick:x},{default:e(()=>[f("确定")]),_:1}),l(b,{onClick:_},{default:e(()=>[f("取消")]),_:1})]),_:1})]),_:1},8,["model","rules"])]),_:1},8,["modelValue","title"])}}}),N=q(B,[["__scopeId","data-v-7fd606d3"]]);export{N as default};
