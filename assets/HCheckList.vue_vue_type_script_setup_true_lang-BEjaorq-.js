
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{d as u,m as l,u as m,$ as b,o as s,b as t,F as o,n as p,O as _,e as g,g as f,D as h,K as v}from"./index-BTcEBOVJ.js";const k={class:"inline-flex select-none items-center justify-center of-hidden rounded-md bg-stone-3 dark:bg-stone-7"},y=["disabled","onClick"],V=u({__name:"HCheckList",props:l({options:{},disabled:{type:Boolean,default:!1}},{modelValue:{},modelModifiers:{}}),emits:l(["change"],["update:modelValue"]),setup(i,{emit:d}){const r=d,n=m(i,"modelValue");return b(n,a=>{r("change",a)}),(a,x)=>{const c=v;return s(),t("div",k,[(s(!0),t(o,null,p(a.options,e=>(s(),t("button",{key:e.value,disabled:a.disabled||e.disabled,class:_(["flex cursor-pointer items-center truncate border-size-0 bg-inherit px-2 py-1.5 text-sm disabled:cursor-not-allowed disabled:opacity-50 hover:not-disabled:bg-ui-primary hover:not-disabled:text-ui-text",{"text-ui-text bg-ui-primary":n.value===e.value}]),onClick:C=>n.value=e.value},[e.icon?(s(),g(c,{key:0,name:e.icon},null,8,["name"])):(s(),t(o,{key:1},[f(h(e.label),1)],64))],10,y))),128))])}}});export{V as _};
