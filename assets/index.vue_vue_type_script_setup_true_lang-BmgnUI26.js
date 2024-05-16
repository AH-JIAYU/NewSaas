
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{d as b,r as x,a as t,o as f,b as g,f as e,w as l,g as d}from"./index-BgZmKZlu.js";const V=b({name:"LogDetails",__name:"index",setup(v,{expose:i}){const o=x(!1),r=[{a:1,b:"最小时长20更为30",id:1},{a:1,b:"置顶开更为关",id:1}];return i({showEdit:_=>{o.value=!0}}),(_,a)=>{const c=t("el-divider"),n=t("el-text"),s=t("el-table-column"),m=t("el-table"),p=t("el-dialog");return f(),g("div",null,[e(p,{modelValue:o.value,"onUpdate:modelValue":a[0]||(a[0]=u=>o.value=u),style:{height:"20.5rem"},title:"详情",width:"800"},{default:l(()=>[e(c,{"content-position":"left"}),e(n,{class:"mx-1"},{default:l(()=>[d(" 操作人: 迪迦 ")]),_:1}),e(n,{class:"mx-1"},{default:l(()=>[d(" 操时间: 2024-05-21 13:14:21 ")]),_:1}),e(m,{style:{"margin-top":"10px"},border:"",data:r},{default:l(()=>[e(s,{align:"center",type:"index",label:"序号",width:"150"}),e(s,{align:"center",property:"b",label:"操作内容"})]),_:1})]),_:1},8,["modelValue"])])}}});export{V as _};
