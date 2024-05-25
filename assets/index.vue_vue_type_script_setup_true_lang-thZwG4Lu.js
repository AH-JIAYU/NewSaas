
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{d as C,r as u,a as t,o as V,b as y,f as e,w as l,l as k,g as f}from"./index-QfOrM8xp.js";const B={style:{flex:"auto"}},D=C({name:"Details",__name:"index",setup(N,{expose:p}){const n=u(!1),c=u();async function m(d){c.value=d.length,n.value=!0}function b(){n.value=!1}return p({showEdit:m}),(d,o)=>{const v=t("el-divider"),a=t("el-input"),s=t("el-form-item"),r=t("el-col"),w=t("el-row"),_=t("el-button"),x=t("el-form"),g=t("el-drawer");return V(),y("div",null,[e(g,{modelValue:n.value,"onUpdate:modelValue":o[4]||(o[4]=i=>n.value=i),title:"详情",direction:"rtl","before-close":b,size:"40%"},{footer:l(()=>[k("div",B,[e(_,{onClick:o[3]||(o[3]=i=>n.value=!1)},{default:l(()=>[f(" 关闭 ")]),_:1})])]),default:l(()=>[e(v,{"content-position":"left"}),e(x,{"label-width":"80px",inline:!1},{default:l(()=>[e(w,{gutter:20},{default:l(()=>[e(r,{span:8},{default:l(()=>[e(s,{label:"项目ID"},{default:l(()=>[e(a,{placeholder:"",clearable:"",onChange:o[0]||(o[0]=()=>{})})]),_:1})]),_:1}),e(r,{span:8},{default:l(()=>[e(s,{label:"项目名称"},{default:l(()=>[e(a,{placeholder:"",clearable:"",onChange:o[1]||(o[1]=()=>{})})]),_:1})]),_:1}),e(r,{span:8},{default:l(()=>[e(s,{label:"创建人"},{default:l(()=>[e(a,{placeholder:"",clearable:"",onChange:o[2]||(o[2]=()=>{})})]),_:1})]),_:1})]),_:1}),e(_,{type:"primary"},{default:l(()=>[f(" 下载 ")]),_:1})]),_:1})]),_:1},8,["modelValue"])])}}});export{D as _};
