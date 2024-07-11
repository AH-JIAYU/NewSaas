
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{d as b,r as u,a as d,o as g,b as x,f as n,w as t,F as r,g as c,G as V}from"./index-CJeDFmVb.js";const y={style:{flex:"auto"}},w=b({name:"InvoicingEdit",__name:"index",setup(C,{expose:f}){const l=u(),o=u(!1);function _(){}async function m(a,e){console.log("row",a,"val",e),l.value=a===1?"开票":"结算",o.value=!0}function p(){o.value=!1}return f({showEdit:m}),(a,e)=>{const s=d("el-button"),v=d("el-dialog");return g(),x("div",null,[n(v,{modelValue:o.value,"onUpdate:modelValue":e[1]||(e[1]=i=>o.value=i),title:l.value,width:"500","before-close":p},{footer:t(()=>[r("div",y,[n(s,{type:"primary",onClick:_},{default:t(()=>[c(" 确定 ")]),_:1}),n(s,{onClick:e[0]||(e[0]=i=>o.value=!1)},{default:t(()=>[c(" 取消 ")]),_:1})])]),default:t(()=>[r("div",null,"确认对项目ID+项目名称进行"+V(l.value)+"操作吗?",1)]),_:1},8,["modelValue","title"])])}}});export{w as _};
