
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{d as b,r as f,a as o,o as g,b as v,f as e,w as l,g as a}from"./index-C3YtDUn5.js";const V=b({name:"CheckEdit",__name:"index",setup(w,{expose:i}){const n=f(!1);f();async function r(m){n.value=!0}function _(){n.value=!1}return i({showEdit:r}),(m,t)=>{const d=o("el-text"),s=o("el-form-item"),u=o("el-button"),c=o("el-form"),p=o("el-dialog");return g(),v("div",null,[e(p,{modelValue:n.value,"onUpdate:modelValue":t[2]||(t[2]=x=>n.value=x),title:"项目测试",width:"500","before-close":_},{default:l(()=>[e(c,{ref:"form","label-width":"80px",inline:!1},{default:l(()=>[e(s,{label:"PID"},{default:l(()=>[e(d,{class:"mx-1",type:"success"},{default:l(()=>[a(" 3241479 ")]),_:1})]),_:1}),e(s,{label:"项目名称"},{default:l(()=>[e(d,{class:"mx-1",type:"danger"},{default:l(()=>[a(" PO2303171004W101050 NZ ")]),_:1})]),_:1}),e(s,null,{default:l(()=>[e(u,{type:"success",round:"",plain:"",size:"default",onClick:t[0]||(t[0]=()=>{})},{default:l(()=>[a(" 直接进入 ")]),_:1}),e(u,{type:"danger",round:"",plain:"",size:"default",onClick:t[1]||(t[1]=()=>{})},{default:l(()=>[a(" 复制链接 ")]),_:1})]),_:1})]),_:1},512)]),_:1},8,["modelValue"])])}}});export{V as _};
