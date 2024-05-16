
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{d as b,r as d,a as i,o as x,b as V,f as l,w as t,l as r,g as u}from"./index-Z5NrEJuN.js";const g=r("div",null,"确认删除这条项目调度吗?",-1),C={style:{flex:"auto"}},y=b({name:"Delete",__name:"index",setup(k,{expose:c}){const e=d(!1),_=d();function f(){}const m=async a=>{_.value=a.length,e.value=!0};function p(){e.value=!1}return c({showEdit:m}),(a,o)=>{const n=i("el-button"),v=i("el-dialog");return x(),V("div",null,[l(v,{modelValue:e.value,"onUpdate:modelValue":o[1]||(o[1]=s=>e.value=s),title:"删除",width:"500","before-close":p},{footer:t(()=>[r("div",C,[l(n,{type:"primary",onClick:f},{default:t(()=>[u(" 确定 ")]),_:1}),l(n,{onClick:o[0]||(o[0]=s=>e.value=!1)},{default:t(()=>[u(" 取消 ")]),_:1})])]),default:t(()=>[g]),_:1},8,["modelValue"])])}}});export{y as _};
