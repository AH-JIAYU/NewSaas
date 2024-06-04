
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{_ as V,r,a,aj as k,o as d,e as p,w as o,l as B,f as e,g as _,ak as N,i as S,p as D}from"./index-CnQ4xoV5.js";const R={class:"dialog-footer"},j={__name:"index",emits:["fetch-data"],setup(E,{expose:f,emit:m}){const u=m,t=r(!1);r("");async function b(n){t.value=!0}function s(){u("fetch-data"),t.value=!1}const v=()=>{console.log("save")},g=[{a:1,b:2,c:3,id:1},{a:1,b:2,c:3,id:1}];return f({showEdit:b}),(n,c)=>{const l=a("el-table-column"),w=a("el-empty"),h=a("el-table"),i=a("el-button"),y=a("el-dialog"),x=k("loading");return d(),p(y,{modelValue:S(t),"onUpdate:modelValue":c[0]||(c[0]=C=>D(t)?t.value=C:null),title:"承接项目",onClose:s},{footer:o(()=>[B("div",R,[e(i,{onClick:s},{default:o(()=>[_(" 取消 ")]),_:1}),e(i,{type:"primary",onClick:v},{default:o(()=>[_(" 确定 ")]),_:1})])]),default:o(()=>[N((d(),p(h,{border:"",data:g,stripe:"",onSelectionChange:n.setSelectRows},{empty:o(()=>[e(w,{class:"vab-data-empty",description:"暂无数据"})]),default:o(()=>[e(l,{type:"index",align:"center",label:"序号",width:"55"}),e(l,{align:"center",prop:"b","show-overflow-tooltip":"",label:"项目编码"}),e(l,{align:"center",prop:"b","show-overflow-tooltip":"",label:"项目名称"}),e(l,{align:"center",prop:"c","show-overflow-tooltip":"",label:"参与/完成/配额/限量"})]),_:1},8,["onSelectionChange"])),[[x,n.listLoading]])]),_:1},8,["modelValue"])}}},L=V(j,[["__scopeId","data-v-c53019e8"]]);export{L as default};
