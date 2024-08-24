
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import k from"./index-CkhaLKaF.js";import{d as B,m as y,u as b,r as z,c as D,a as u,o as n,b as M,e as c,w as e,f as t,g as r,h as V,i as g,j as v}from"./index-C6aesvjM.js";const h=B({__name:"index",props:y(["id","row","mode"],{modelValue:{type:Boolean,default:!1},modelModifiers:{}}),emits:y(["success"],["update:modelValue"]),setup(f,{emit:C}){const l=f,w=C,o=b(f,"modelValue"),d=z(),p=D(()=>l.id===""?"新增部门":"编辑部门");function _(){d.value.submit().then(()=>{w("success"),i()})}function i(){o.value=!1}return(N,a)=>{const s=u("ElButton"),E=u("ElDialog"),x=u("ElDrawer");return n(),M("div",null,[l.mode==="dialog"?(n(),c(E,{key:0,modelValue:o.value,"onUpdate:modelValue":a[0]||(a[0]=m=>o.value=m),title:g(p),width:"600px","close-on-click-modal":!1,"append-to-body":"","destroy-on-close":""},{footer:e(()=>[t(s,{size:"large",onClick:i},{default:e(()=>[r(" 取消 ")]),_:1}),t(s,{type:"primary",size:"large",onClick:_},{default:e(()=>[r(" 确定 ")]),_:1})]),default:e(()=>[t(k,V({ref_key:"formRef",ref:d},l),null,16)]),_:1},8,["modelValue","title"])):l.mode==="drawer"?(n(),c(x,{key:1,modelValue:o.value,"onUpdate:modelValue":a[1]||(a[1]=m=>o.value=m),title:g(p),size:"40%","close-on-click-modal":!1,"destroy-on-close":""},{footer:e(()=>[t(s,{size:"large",onClick:i},{default:e(()=>[r(" 取消 ")]),_:1}),t(s,{type:"primary",size:"large",onClick:_},{default:e(()=>[r(" 确定 ")]),_:1})]),default:e(()=>[o.value?(n(),c(k,V({key:0,ref_key:"formRef",ref:d},l),null,16)):v("",!0)]),_:1},8,["modelValue","title"])):v("",!0)])}}});export{h as _};
