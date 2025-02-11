
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{d as b,r as i,a2 as u,a as x,i as V,f as l,w as o,b as r,g as d}from"./index-4wQrOBBW.js";const g=r("div",null,"确认删除这条项目素材吗?",-1),C={style:{flex:"auto"}},y=b({name:"Delete",__name:"index",setup(k,{expose:c}){const e=i(!1),_=i();function f(){}async function m(a){_.value=a.length,e.value=!0}function p(){e.value=!1}return c({showEdit:m}),(a,t)=>{const n=u("el-button"),v=u("el-dialog");return x(),V("div",null,[l(v,{modelValue:e.value,"onUpdate:modelValue":t[1]||(t[1]=s=>e.value=s),title:"删除",width:"500","before-close":p},{footer:o(()=>[r("div",C,[l(n,{type:"primary",onClick:f},{default:o(()=>[d(" 确定 ")]),_:1}),l(n,{onClick:t[0]||(t[0]=s=>e.value=!1)},{default:o(()=>[d(" 取消 ")]),_:1})])]),default:o(()=>[g]),_:1},8,["modelValue"])])}}});export{y as _};
