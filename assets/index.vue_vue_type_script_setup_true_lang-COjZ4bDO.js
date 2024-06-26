
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{d as v,r as x,a as n,o as C,b as g,f as l,w as o,l as V,g as i}from"./index-BXtd_hK_.js";const w={style:{flex:"auto"}},B=v({name:"Edit",__name:"index",setup(y,{expose:u}){const t=x(!1);function f(){}async function m(_){t.value=!0}function p(){t.value=!1}return u({showEdit:m}),(_,e)=>{const a=n("el-input"),s=n("el-form-item"),c=n("el-form"),r=n("el-button"),b=n("el-dialog");return C(),g("div",null,[l(b,{modelValue:t.value,"onUpdate:modelValue":e[4]||(e[4]=d=>t.value=d),title:"编辑",width:"700","before-close":p},{footer:o(()=>[V("div",w,[l(r,{type:"primary",onClick:f},{default:o(()=>[i(" 确定 ")]),_:1}),l(r,{type:"",onClick:e[3]||(e[3]=d=>t.value=!1)},{default:o(()=>[i(" 取消 ")]),_:1})])]),default:o(()=>[l(c,{"label-width":"80px",inline:!1},{default:o(()=>[l(s,{label:""},{default:o(()=>[l(a,{placeholder:"项目ID",clearable:"",onChange:e[0]||(e[0]=()=>{})})]),_:1}),l(s,{label:""},{default:o(()=>[l(a,{placeholder:"",clearable:"",onChange:e[1]||(e[1]=()=>{})})]),_:1}),l(s,{label:"请粘贴GUID,每行一个"},{default:o(()=>[l(a,{placeholder:"",clearable:"",onChange:e[2]||(e[2]=()=>{})})]),_:1})]),_:1})]),_:1},8,["modelValue"])])}}});export{B as _};
