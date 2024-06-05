
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{_ as V,r,a as l,al as k,o as d,e as p,w as o,l as B,f as e,g as _,am as N,i as S,p as D}from"./index-CX2PmK0L.js";const R={class:"dialog-footer"},E={__name:"index",emits:["fetch-data"],setup(I,{expose:m,emit:f}){const u=f,t=r(!1);r("");async function b(n){t.value=!0}function s(){u("fetch-data"),t.value=!1}const v=()=>{console.log("save")},g=[{a:1,b:2,c:3,id:1},{a:1,b:2,c:3,id:1}];return m({showEdit:b}),(n,c)=>{const a=l("el-table-column"),w=l("el-empty"),h=l("el-table"),i=l("el-button"),y=l("el-dialog"),x=k("loading");return d(),p(y,{modelValue:S(t),"onUpdate:modelValue":c[0]||(c[0]=C=>D(t)?t.value=C:null),title:"承接项目",onClose:s},{footer:o(()=>[B("div",R,[e(i,{onClick:s},{default:o(()=>[_(" 取消 ")]),_:1}),e(i,{type:"primary",onClick:v},{default:o(()=>[_(" 确定 ")]),_:1})])]),default:o(()=>[N((d(),p(h,{border:"",data:g,stripe:"",onSelectionChange:n.setSelectRows},{empty:o(()=>[e(w,{class:"vab-data-empty",description:"暂无数据"})]),default:o(()=>[e(a,{type:"index",align:"center",label:"序号",width:"55"}),e(a,{align:"center",prop:"b","show-overflow-tooltip":"",label:"项目编码"}),e(a,{align:"center",prop:"b","show-overflow-tooltip":"",label:"项目名称"}),e(a,{align:"center",prop:"c","show-overflow-tooltip":"",label:"参与/完成/配额/限量"})]),_:1},8,["onSelectionChange"])),[[x,n.listLoading]])]),_:1},8,["modelValue"])}}},T=V(E,[["__scopeId","data-v-c53019e8"]]);export{T as default};
