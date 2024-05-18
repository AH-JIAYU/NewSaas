
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{e as m}from"./index-WikOps_z.js";import{g as y,z as p,a as N}from"./index-DFJLODe7.js";import{d as k,r as v,a as o,o as z,b as B,f as e,w as l,l as H,g as b,i as s,_ as T}from"./index-DQumISPN.js";const F={style:{flex:"auto"}},I=k({name:"Edit",__name:"index",setup(L,{expose:g}){const r=v("# Fantastic-admin"),d=[y({locale:N})];function c(u){r.value=u}const t=v(!1);function C(){}const x=async u=>{t.value=!0};function w(){t.value=!1}return g({showEdit:x}),(u,a)=>{const f=o("el-input"),n=o("el-form-item"),V=o("el-select"),h=o("el-form"),i=o("el-button"),E=o("el-drawer");return z(),B("div",null,[e(E,{modelValue:t.value,"onUpdate:modelValue":a[3]||(a[3]=_=>t.value=_),title:"编辑",size:"60%","before-close":w},{footer:l(()=>[H("div",F,[e(i,{type:"primary",onClick:C},{default:l(()=>[b(" 确定 ")]),_:1}),e(i,{type:"",onClick:a[2]||(a[2]=_=>t.value=!1)},{default:l(()=>[b(" 取消 ")]),_:1})])]),default:l(()=>[e(h,{ref:"form","label-width":"80px",inline:!1},{default:l(()=>[e(n,{label:"标题"},{default:l(()=>[e(f,{placeholder:"",clearable:"",onChange:a[0]||(a[0]=()=>{})})]),_:1}),e(n,{label:"标题(EN)"},{default:l(()=>[e(f,{placeholder:"",clearable:"",onChange:a[1]||(a[1]=()=>{})})]),_:1}),e(n,{label:"类型"},{default:l(()=>[e(V)]),_:1}),e(n,{label:"内容"},{default:l(()=>[e(s(m),{class:"editor",value:r.value,plugins:d,locale:s(p),onChange:c},null,8,["value","locale"])]),_:1}),e(n,{label:"内容(EN)"},{default:l(()=>[e(s(m),{class:"editor",value:r.value,plugins:d,locale:s(p),onChange:c},null,8,["value","locale"])]),_:1})]),_:1},512)]),_:1},8,["modelValue"])])}}}),j=T(I,[["__scopeId","data-v-afe6fa27"]]);export{j as default};
