
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{d as b,r,a as o,o as g,b as v,f as e,w as l,g as a}from"./index-CvJF3YJZ.js";const k=b({name:"checkEdit",__name:"index",setup(w,{expose:_}){const n=r(!1);r();const f=async m=>{n.value=!0};function i(){n.value=!1}return _({showEdit:f}),(m,t)=>{const d=o("el-text"),s=o("el-form-item"),u=o("el-button"),c=o("el-form"),p=o("el-dialog");return g(),v("div",null,[e(p,{modelValue:n.value,"onUpdate:modelValue":t[2]||(t[2]=x=>n.value=x),title:"项目测试",width:"500","before-close":i},{default:l(()=>[e(c,{ref:"form","label-width":"80px",inline:!1},{default:l(()=>[e(s,{label:"PID"},{default:l(()=>[e(d,{class:"mx-1",type:"success"},{default:l(()=>[a("3241479")]),_:1})]),_:1}),e(s,{label:"项目名称"},{default:l(()=>[e(d,{class:"mx-1",type:"danger"},{default:l(()=>[a("PO2303171004W101050 NZ")]),_:1})]),_:1}),e(s,null,{default:l(()=>[e(u,{type:"success",round:"",plain:"",size:"default",onClick:t[0]||(t[0]=()=>{})},{default:l(()=>[a("直接进入")]),_:1}),e(u,{type:"danger",round:"",plain:"",size:"default",onClick:t[1]||(t[1]=()=>{})},{default:l(()=>[a("复制链接")]),_:1})]),_:1})]),_:1},512)]),_:1},8,["modelValue"])])}}});export{k as _};
