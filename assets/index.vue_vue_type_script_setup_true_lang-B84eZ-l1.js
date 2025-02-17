
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{_}from"./index.vue_vue_type_script_setup_true_lang-DwC99Bc-.js";import{d as E,C as k,D as B,r as b,F as z,a3 as m,b as u,j as D,c as y,w as e,g as o,h as r,H as V,i as C,k as M}from"./index-D3JQ81m5.js";const h=E({__name:"index",props:k(["id","mode","row"],{modelValue:{type:Boolean,default:!1},modelModifiers:{}}),emits:k(["success"],["update:modelValue"]),setup(c,{emit:g}){const l=c,v=g,t=B(c,"modelValue"),a=b(),f=z(()=>l.id===""?"新增用户":"编辑用户");function p(){a.value.submit().then(()=>{v("success"),d()})}function d(){t.value=!1,a.value.onCancel()}return(N,s)=>{const n=m("ElButton"),w=m("ElDialog"),x=m("ElDrawer");return u(),D("div",null,[l.mode==="dialog"?(u(),y(w,{key:0,modelValue:t.value,"onUpdate:modelValue":s[0]||(s[0]=i=>t.value=i),title:C(f),width:"600px","close-on-click-modal":!1,"append-to-body":"","destroy-on-close":""},{footer:e(()=>[o(n,{size:"large",onClick:d},{default:e(()=>[r(" 取 消 ")]),_:1}),o(n,{type:"primary",size:"large",onClick:p},{default:e(()=>[r(" 确 定 ")]),_:1})]),default:e(()=>[o(_,V({ref_key:"formRef",ref:a},l),null,16)]),_:1},8,["modelValue","title"])):l.mode==="drawer"?(u(),y(x,{key:1,modelValue:t.value,"onUpdate:modelValue":s[1]||(s[1]=i=>t.value=i),title:C(f),size:"600px","close-on-click-modal":!1,"destroy-on-close":""},{footer:e(()=>[o(n,{size:"large",onClick:d},{default:e(()=>[r(" 取 消 ")]),_:1}),o(n,{type:"primary",size:"large",onClick:p},{default:e(()=>[r(" 确 定 ")]),_:1})]),default:e(()=>[o(_,V({ref_key:"formRef",ref:a},l),null,16)]),_:1},8,["modelValue","title"])):M("",!0)])}}});export{h as _};
