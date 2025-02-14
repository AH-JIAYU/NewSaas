
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{D as g}from"./index-CLAE6TsK.js";import{d as v,B as m,C,r as k,a2 as r,a as x,i as y,f as e,w as o,g as d,G as B}from"./index-Co_cyy70.js";const E="新增结算",M=v({__name:"index",props:m({mode:{},id:{}},{modelValue:{type:Boolean,default:!1},modelModifiers:{}}),emits:m(["success"],["update:modelValue"]),setup(t,{emit:u}){const c=t,f=u,l=C(t,"modelValue"),a=k();function p(){a.value.submit().then(()=>{f("success"),s()})}function s(){l.value=!1}return(b,n)=>{const i=r("ElButton"),_=r("ElDialog");return x(),y("div",null,[e(_,{modelValue:l.value,"onUpdate:modelValue":n[0]||(n[0]=V=>l.value=V),title:E,width:"600px","close-on-click-modal":!1,"append-to-body":"","destroy-on-close":""},{footer:o(()=>[e(i,{size:"large",onClick:s},{default:o(()=>[d(" 取消 ")]),_:1}),e(i,{type:"primary",size:"large",onClick:p},{default:o(()=>[d(" 确定 ")]),_:1})]),default:o(()=>[e(g,B({ref_key:"formRef",ref:a},c),null,16)]),_:1},8,["modelValue"])])}}});export{M as _};
