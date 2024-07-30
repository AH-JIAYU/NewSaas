
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{D as _}from"./index-BcbqajFm.js";import{d as w,m as k,u as B,r as D,c as x,a as u,o as c,b as z,e as y,w as e,f as o,g as r,h as V,i as g,j as M}from"./index-BV7R4jFg.js";const O=w({__name:"index",props:k({mode:{},title:{},details:{},id:{}},{modelValue:{type:Boolean,default:!1},modelModifiers:{}}),emits:k(["success"],["update:modelValue"]),setup(f,{emit:v}){const l=f,C=v,t=B(f,"modelValue"),i=D(),p=x(()=>l.id===""?"新增前置问卷库":"编辑前置问卷库");function a(){i.value.submit().then(()=>{C("success"),d()})}function d(){t.value=!1}return(N,s)=>{const n=u("ElButton"),b=u("ElDialog"),E=u("ElDrawer");return c(),z("div",null,[l.mode==="dialog"?(c(),y(b,{key:0,modelValue:t.value,"onUpdate:modelValue":s[0]||(s[0]=m=>t.value=m),title:g(p),width:"80%","close-on-click-modal":!1,"append-to-body":"","destroy-on-close":""},{footer:e(()=>[o(n,{size:"large",onClick:d},{default:e(()=>[r(" 取消 ")]),_:1}),o(n,{type:"primary",size:"large",onClick:a},{default:e(()=>[r(" 确定 ")]),_:1})]),default:e(()=>[o(_,V({ref_key:"formRef",ref:i},l,{onOnSubmit:a}),null,16)]),_:1},8,["modelValue","title"])):l.mode==="drawer"?(c(),y(E,{key:1,modelValue:t.value,"onUpdate:modelValue":s[1]||(s[1]=m=>t.value=m),title:g(p),size:"80%","close-on-click-modal":!1,"destroy-on-close":""},{footer:e(()=>[o(n,{size:"large",onClick:d},{default:e(()=>[r(" 取消 ")]),_:1}),o(n,{type:"primary",size:"large",onClick:a},{default:e(()=>[r(" 确定 ")]),_:1})]),default:e(()=>[o(_,V({ref_key:"formRef",ref:i},l,{onOnSubmit:a}),null,16)]),_:1},8,["modelValue","title"])):M("",!0)])}}});export{O as _};
