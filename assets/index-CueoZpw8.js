
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{_ as V,r,a,aj as k,o as d,e as p,w as o,l as B,f as e,g as _,ak as D,i as N,E as S}from"./index-C_N3Tfx9.js";const E={class:"dialog-footer"},R={__name:"index",emits:["fetch-data"],setup(j,{expose:u,emit:f}){const m=f,t=r(!1);r("");async function b(n){t.value=!0}function s(){m("fetch-data"),t.value=!1}const v=()=>{console.log("save")},g=[{a:1,b:2,c:3,id:1},{a:1,b:2,c:3,id:1}];return u({showEdit:b}),(n,i)=>{const l=a("el-table-column"),w=a("el-empty"),h=a("el-table"),c=a("el-button"),y=a("el-dialog"),C=k("loading");return d(),p(y,{modelValue:N(t),"onUpdate:modelValue":i[0]||(i[0]=x=>S(t)?t.value=x:null),title:"承接项目",onClose:s},{footer:o(()=>[B("div",E,[e(c,{onClick:s},{default:o(()=>[_(" 取消 ")]),_:1}),e(c,{type:"primary",onClick:v},{default:o(()=>[_(" 确定 ")]),_:1})])]),default:o(()=>[D((d(),p(h,{border:"",data:g,stripe:"",onSelectionChange:n.setSelectRows},{empty:o(()=>[e(w,{class:"vab-data-empty",description:"暂无数据"})]),default:o(()=>[e(l,{type:"index",align:"center",label:"序号",width:"55"}),e(l,{align:"center",prop:"b","show-overflow-tooltip":"",label:"项目编码"}),e(l,{align:"center",prop:"b","show-overflow-tooltip":"",label:"项目名称"}),e(l,{align:"center",prop:"c","show-overflow-tooltip":"",label:"参与/完成/配额/限量"})]),_:1},8,["onSelectionChange"])),[[C,n.listLoading]])]),_:1},8,["modelValue"])}}},I=V(R,[["__scopeId","data-v-1b63e74b"]]);export{I as default};
