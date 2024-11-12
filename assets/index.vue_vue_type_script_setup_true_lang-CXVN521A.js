
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{D as g}from"./index-VAv_0gDg.js";import{d as v,m as r,u as k,r as x,a as i,o as y,b as C,f as e,w as o,g as u,h as b}from"./index-Ci7w1hVZ.js";const B="新增结算",w=v({__name:"index",props:r({mode:{},id:{}},{modelValue:{type:Boolean,default:!1},modelModifiers:{}}),emits:r(["success"],["update:modelValue"]),setup(t,{emit:d}){const c=t,f=d,l=k(t,"modelValue"),a=x();function p(){a.value.submit().then(()=>{f("success"),s()})}function s(){l.value=!1}return(E,n)=>{const m=i("ElButton"),_=i("ElDialog");return y(),C("div",null,[e(_,{modelValue:l.value,"onUpdate:modelValue":n[0]||(n[0]=V=>l.value=V),title:B,width:"600px","close-on-click-modal":!1,"append-to-body":"","destroy-on-close":""},{footer:o(()=>[e(m,{size:"large",onClick:s},{default:o(()=>[u(" 取消 ")]),_:1}),e(m,{type:"primary",size:"large",onClick:p},{default:o(()=>[u(" 确定 ")]),_:1})]),default:o(()=>[e(g,b({ref_key:"formRef",ref:a},c),null,16)]),_:1},8,["modelValue"])])}}});export{w as _};
