
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{d as f,r as x,a as t,o as g,b as v,f as e,w as l,g as i}from"./index-BgF8AKrH.js";const h=f({name:"LogDetails",__name:"index",setup(w,{expose:d}){const o=x(!1),r=[{a:1,b:"最小时长20更为30",id:1},{a:1,b:"置顶开更为关",id:1}];function _(c){o.value=!0}return d({showEdit:_}),(c,a)=>{const m=t("el-divider"),n=t("el-text"),s=t("el-table-column"),p=t("el-table"),u=t("el-dialog");return g(),v("div",null,[e(u,{modelValue:o.value,"onUpdate:modelValue":a[0]||(a[0]=b=>o.value=b),style:{height:"20.5rem"},title:"详情",width:"800"},{default:l(()=>[e(m,{"content-position":"left"}),e(n,{class:"mx-1"},{default:l(()=>[i(" 操作人: 迪迦 ")]),_:1}),e(n,{class:"mx-1"},{default:l(()=>[i(" 操时间: 2024-05-21 13:14:21 ")]),_:1}),e(p,{style:{"margin-top":"10px"},border:"",data:r},{default:l(()=>[e(s,{align:"center",type:"index",label:"序号",width:"150"}),e(s,{align:"center",property:"b",label:"操作内容"})]),_:1})]),_:1},8,["modelValue"])])}}});export{h as _};
