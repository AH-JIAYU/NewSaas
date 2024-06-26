
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{d as u,m as l,u as m,a2 as b,o as a,b as t,F as o,n as p,R as _,e as g,g as f,I as h,N as v}from"./index-C9-fbFy3.js";const k={class:"inline-flex select-none items-center justify-center of-hidden rounded-md bg-stone-3 dark:bg-stone-7"},y=["disabled","onClick"],V=u({__name:"HCheckList",props:l({options:{},disabled:{type:Boolean,default:!1}},{modelValue:{},modelModifiers:{}}),emits:l(["change"],["update:modelValue"]),setup(i,{emit:d}){const r=d,n=m(i,"modelValue");return b(n,s=>{r("change",s)}),(s,x)=>{const c=v;return a(),t("div",k,[(a(!0),t(o,null,p(s.options,e=>(a(),t("button",{key:e.value,disabled:s.disabled||e.disabled,class:_(["flex cursor-pointer items-center truncate border-size-0 bg-inherit px-2 py-1.5 text-sm disabled:cursor-not-allowed disabled:opacity-50 hover:not-disabled:bg-ui-primary hover:not-disabled:text-ui-text",{"text-ui-text bg-ui-primary":n.value===e.value}]),onClick:C=>n.value=e.value},[e.icon?(a(),g(c,{key:0,name:e.icon},null,8,["name"])):(a(),t(o,{key:1},[f(h(e.label),1)],64))],10,y))),128))])}}});export{V as _};
