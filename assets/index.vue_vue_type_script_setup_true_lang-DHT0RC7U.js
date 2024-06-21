
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{d as b,r as u,a as d,o as x,b as V,f as a,w as o,l as r,g as c,I as g}from"./index-QzTLBS9C.js";const y={style:{flex:"auto"}},w=b({name:"InvoicingEdit",__name:"index",setup(C,{expose:f}){const l=u(),e=u(!1);function _(){}async function m(n){l.value=n.id===1?"开票":"结算",e.value=!0}function p(){e.value=!1}return f({showEdit:m}),(n,t)=>{const s=d("el-button"),v=d("el-dialog");return x(),V("div",null,[a(v,{modelValue:e.value,"onUpdate:modelValue":t[1]||(t[1]=i=>e.value=i),title:l.value,width:"500","before-close":p},{footer:o(()=>[r("div",y,[a(s,{type:"primary",onClick:_},{default:o(()=>[c(" 确定 ")]),_:1}),a(s,{onClick:t[0]||(t[0]=i=>e.value=!1)},{default:o(()=>[c(" 取消 ")]),_:1})])]),default:o(()=>[r("div",null,"确认对项目ID+项目名称进行"+g(l.value)+"操作吗?",1)]),_:1},8,["modelValue","title"])])}}});export{w as _};
