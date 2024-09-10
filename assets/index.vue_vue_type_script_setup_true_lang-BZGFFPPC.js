
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import k from"./index-BU7euAvt.js";import{u as D}from"./department-B0c7nVjo.js";import{d as b,m as y,u as z,r as M,c as N,a as i,o as n,b as R,e as c,w as e,f as t,g as r,h as V,i as g,j as v}from"./index-oDag-wCq.js";const F=b({__name:"index",props:y(["id","row","mode"],{modelValue:{type:Boolean,default:!1},modelModifiers:{}}),emits:y(["success"],["update:modelValue"]),setup(f,{emit:C}){const l=f,w=D(),E=C,o=z(f,"modelValue"),m=M(),p=N(()=>l.id===""?"新增部门":"编辑部门");function _(){m.value.submit().then(()=>{w.department=null,E("success"),d()})}function d(){o.value=!1}return(S,a)=>{const s=i("ElButton"),x=i("ElDialog"),B=i("ElDrawer");return n(),R("div",null,[l.mode==="dialog"?(n(),c(x,{key:0,modelValue:o.value,"onUpdate:modelValue":a[0]||(a[0]=u=>o.value=u),title:g(p),width:"600px","close-on-click-modal":!1,"append-to-body":"","destroy-on-close":""},{footer:e(()=>[t(s,{size:"large",onClick:d},{default:e(()=>[r(" 取消 ")]),_:1}),t(s,{type:"primary",size:"large",onClick:_},{default:e(()=>[r(" 确定 ")]),_:1})]),default:e(()=>[t(k,V({ref_key:"formRef",ref:m},l),null,16)]),_:1},8,["modelValue","title"])):l.mode==="drawer"?(n(),c(B,{key:1,modelValue:o.value,"onUpdate:modelValue":a[1]||(a[1]=u=>o.value=u),title:g(p),size:"40%","close-on-click-modal":!1,"destroy-on-close":""},{footer:e(()=>[t(s,{size:"large",onClick:d},{default:e(()=>[r(" 取消 ")]),_:1}),t(s,{type:"primary",size:"large",onClick:_},{default:e(()=>[r(" 确定 ")]),_:1})]),default:e(()=>[o.value?(n(),c(k,V({key:0,ref_key:"formRef",ref:m},l),null,16)):v("",!0)]),_:1},8,["modelValue","title"])):v("",!0)])}}});export{F as _};
