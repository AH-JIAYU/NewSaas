
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{_ as V,r,a,aj as k,o as p,e as d,w as o,l as B,f as e,g as _,ak as D,i as N,p as S}from"./index-JVwiYWif.js";const R={class:"dialog-footer"},j={__name:"index",emits:["fetch-data"],setup(E,{expose:u,emit:f}){const m=f,t=r(!1);r("");async function b(n){t.value=!0}function s(){m("fetch-data"),t.value=!1}const v=()=>{console.log("save")},g=[{a:1,b:2,c:3,id:1},{a:1,b:2,c:3,id:1}];return u({showEdit:b}),(n,i)=>{const l=a("el-table-column"),w=a("el-empty"),h=a("el-table"),c=a("el-button"),y=a("el-dialog"),C=k("loading");return p(),d(y,{modelValue:N(t),"onUpdate:modelValue":i[0]||(i[0]=x=>S(t)?t.value=x:null),title:"承接项目",onClose:s},{footer:o(()=>[B("div",R,[e(c,{onClick:s},{default:o(()=>[_(" 取消 ")]),_:1}),e(c,{type:"primary",onClick:v},{default:o(()=>[_(" 确定 ")]),_:1})])]),default:o(()=>[D((p(),d(h,{border:"",data:g,stripe:"",onSelectionChange:n.setSelectRows},{empty:o(()=>[e(w,{class:"vab-data-empty",description:"暂无数据"})]),default:o(()=>[e(l,{type:"index",align:"center",label:"序号",width:"55"}),e(l,{align:"center",prop:"b","show-overflow-tooltip":"",label:"项目编码"}),e(l,{align:"center",prop:"b","show-overflow-tooltip":"",label:"项目名称"}),e(l,{align:"center",prop:"c","show-overflow-tooltip":"",label:"参与/完成/配额/限量"})]),_:1},8,["onSelectionChange"])),[[C,n.listLoading]])]),_:1},8,["modelValue"])}}},I=V(j,[["__scopeId","data-v-1b63e74b"]]);export{I as default};
