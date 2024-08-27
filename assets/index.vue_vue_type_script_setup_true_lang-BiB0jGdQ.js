
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{a as x}from"./projectManagement-dffEy6P5.js";import{d as b,r as d,a,o as w,b as y,f as e,w as l,g as c,H as p}from"./index-Cikis37a.js";const C=b({name:"LogDetails",__name:"index",setup(V,{expose:_}){const n=d(!1),t=d({gridData:[],row:[]});async function m(i){t.value.row=i;const o=await x.getProjectOperationRecordList({id:i.id});t.value.gridData=o.data.projectOperationRecordInfoList,n.value=!0}return _({showEdit:m}),(i,o)=>{const u=a("el-divider"),r=a("el-text"),s=a("el-table-column"),f=a("el-table"),g=a("el-dialog");return w(),y("div",null,[e(g,{modelValue:n.value,"onUpdate:modelValue":o[0]||(o[0]=v=>n.value=v),style:{height:"20.5rem"},title:"详情",width:"800"},{default:l(()=>[e(u,{"content-position":"left"}),e(r,{class:"mx-1"},{default:l(()=>[c(" 操作人: "+p(t.value.row.operationName),1)]),_:1}),e(r,{class:"mx-1"},{default:l(()=>[c(" 操时间: "+p(t.value.row.operationTime),1)]),_:1}),e(f,{style:{"margin-top":"10px"},border:"",data:t.value.gridData},{default:l(()=>[e(s,{align:"center",type:"index",label:"序号",width:"150"}),e(s,{align:"center",property:"operationContent",label:"操作内容"})]),_:1},8,["data"])]),_:1},8,["modelValue"])])}}});export{C as _};
