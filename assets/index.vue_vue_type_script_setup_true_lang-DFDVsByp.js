
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{d as b,r as i,b as u,o as x,e as V,g as l,w as o,t as r,h as d}from"./index-CSh8ixW9.js";const g=r("div",null,"确认删除这条项目素材吗?",-1),C={style:{flex:"auto"}},w=b({name:"Delete",__name:"index",setup(h,{expose:c}){const e=i(!1),_=i();function f(){}async function m(n){_.value=n.length,e.value=!0}function p(){e.value=!1}return c({showEdit:m}),(n,t)=>{const a=u("el-button"),v=u("el-dialog");return x(),V("div",null,[l(v,{modelValue:e.value,"onUpdate:modelValue":t[1]||(t[1]=s=>e.value=s),title:"删除",width:"500","before-close":p},{footer:o(()=>[r("div",C,[l(a,{type:"primary",onClick:f},{default:o(()=>[d(" 确定 ")]),_:1}),l(a,{onClick:t[0]||(t[0]=s=>e.value=!1)},{default:o(()=>[d(" 取消 ")]),_:1})])]),default:o(()=>[g]),_:1},8,["modelValue"])])}}});export{w as _};
