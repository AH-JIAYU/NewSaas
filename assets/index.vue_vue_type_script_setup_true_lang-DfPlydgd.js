
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{d as b,r as i,a as u,o as x,b as V,f as l,w as t,C as r,g as d}from"./index-CAB4bd2D.js";const C=r("div",null,"确认删除这条项目素材吗?",-1),g={style:{flex:"auto"}},y=b({name:"Delete",__name:"index",setup(k,{expose:c}){const e=i(!1),_=i();function f(){}async function m(n){_.value=n.length,e.value=!0}function p(){e.value=!1}return c({showEdit:m}),(n,o)=>{const a=u("el-button"),v=u("el-dialog");return x(),V("div",null,[l(v,{modelValue:e.value,"onUpdate:modelValue":o[1]||(o[1]=s=>e.value=s),title:"删除",width:"500","before-close":p},{footer:t(()=>[r("div",g,[l(a,{type:"primary",onClick:f},{default:t(()=>[d(" 确定 ")]),_:1}),l(a,{onClick:o[0]||(o[0]=s=>e.value=!1)},{default:t(()=>[d(" 取消 ")]),_:1})])]),default:t(()=>[C]),_:1},8,["modelValue"])])}}});export{y as _};
