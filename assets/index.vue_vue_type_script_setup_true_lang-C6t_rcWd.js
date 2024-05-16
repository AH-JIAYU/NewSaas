
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{_}from"./index.vue_vue_type_script_setup_true_lang-Bpt-PUFX.js";import{d as E,m as k,u as b,r as w,c as z,a as m,o as u,b as D,e as V,w as e,f as o,g as n,h as y,i as g,j as N,k as M}from"./index-CvJF3YJZ.js";const R={class:"buttons"},P=E({__name:"index",props:k({mode:{},id:{}},{modelValue:{type:Boolean,default:!1},modelModifiers:{}}),emits:k(["success"],["update:modelValue"]),setup(c,{emit:v}){const l=c,C=v,t=b(c,"modelValue"),r=w(),f=z(()=>l.id===""?"新增用户":"编辑用户");function p(){r.value.submit().then(()=>{C("success"),d()})}function d(){t.value=!1}return(h,a)=>{const s=m("ElButton"),x=m("ElDialog"),B=m("ElDrawer");return u(),D("div",null,[l.mode==="dialog"?(u(),V(x,{key:0,modelValue:t.value,"onUpdate:modelValue":a[0]||(a[0]=i=>t.value=i),title:g(f),width:"600px","close-on-click-modal":!1,"append-to-body":"","destroy-on-close":""},{footer:e(()=>[o(s,{size:"large",onClick:d},{default:e(()=>[n(" 取 消 ")]),_:1}),o(s,{type:"primary",size:"large",onClick:p},{default:e(()=>[n(" 确 定 ")]),_:1})]),default:e(()=>[o(_,y({ref_key:"formRef",ref:r},l),null,16)]),_:1},8,["modelValue","title"])):l.mode==="drawer"?(u(),V(B,{key:1,modelValue:t.value,"onUpdate:modelValue":a[1]||(a[1]=i=>t.value=i),title:g(f),size:"600px","close-on-click-modal":!1,"destroy-on-close":""},{default:e(()=>[o(_,y({ref_key:"formRef",ref:r},l),null,16),N("div",R,[o(s,{size:"large",onClick:d},{default:e(()=>[n(" 取 消 ")]),_:1}),o(s,{type:"primary",size:"large",onClick:p},{default:e(()=>[n(" 确 定 ")]),_:1})])]),_:1},8,["modelValue","title"])):M("",!0)])}}});export{P as _};
