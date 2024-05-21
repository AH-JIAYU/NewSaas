
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{D as _}from"./index-BBM5ul9n.js";import{d as B,m as k,u as D,r as b,c as x,a as m,o as u,b as z,e as y,w as e,f as o,g as n,h as V,i as g,j as M}from"./index-C32xF_ni.js";const h=B({__name:"index",props:k({mode:{},id:{}},{modelValue:{type:Boolean,default:!1},modelModifiers:{}}),emits:k(["success"],["update:modelValue"]),setup(c,{emit:v}){const l=c,C=v,t=D(c,"modelValue"),r=b(),f=x(()=>l.id===""?"新增问题库":"编辑问题库");function p(){r.value.submit().then(()=>{C("success"),d()})}function d(){t.value=!1}return(N,a)=>{const s=m("ElButton"),E=m("ElDialog"),w=m("ElDrawer");return u(),z("div",null,[l.mode==="dialog"?(u(),y(E,{key:0,modelValue:t.value,"onUpdate:modelValue":a[0]||(a[0]=i=>t.value=i),title:g(f),width:"60%","close-on-click-modal":!1,"append-to-body":"","destroy-on-close":""},{footer:e(()=>[o(s,{size:"large",onClick:d},{default:e(()=>[n(" 取消 ")]),_:1}),o(s,{type:"primary",size:"large",onClick:p},{default:e(()=>[n(" 确定 ")]),_:1})]),default:e(()=>[o(_,V({ref_key:"formRef",ref:r},l),null,16)]),_:1},8,["modelValue","title"])):l.mode==="drawer"?(u(),y(w,{key:1,modelValue:t.value,"onUpdate:modelValue":a[1]||(a[1]=i=>t.value=i),title:g(f),size:"60%","close-on-click-modal":!1,"destroy-on-close":""},{footer:e(()=>[o(s,{size:"large",onClick:d},{default:e(()=>[n(" 取消 ")]),_:1}),o(s,{type:"primary",size:"large",onClick:p},{default:e(()=>[n(" 确定 ")]),_:1})]),default:e(()=>[o(_,V({ref_key:"formRef",ref:r},l),null,16)]),_:1},8,["modelValue","title"])):M("",!0)])}}});export{h as _};
