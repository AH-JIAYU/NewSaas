
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{D as g}from"./index-Cw8i_fR7.js";import{d as v,C as r,D as C,r as k,a3 as i,b as x,j as y,g as e,w as o,h as d,H as b}from"./index-BnVk3aZr.js";const B="新增结算",w=v({__name:"index",props:r({mode:{},id:{}},{modelValue:{type:Boolean,default:!1},modelModifiers:{}}),emits:r(["success"],["update:modelValue"]),setup(t,{emit:u}){const c=t,f=u,l=C(t,"modelValue"),a=k();function p(){a.value.submit().then(()=>{f("success"),s()})}function s(){l.value=!1}return(D,n)=>{const m=i("ElButton"),_=i("ElDialog");return x(),y("div",null,[e(_,{modelValue:l.value,"onUpdate:modelValue":n[0]||(n[0]=V=>l.value=V),title:B,width:"600px","close-on-click-modal":!1,"append-to-body":"","destroy-on-close":""},{footer:o(()=>[e(m,{size:"large",onClick:s},{default:o(()=>[d(" 取消 ")]),_:1}),e(m,{type:"primary",size:"large",onClick:p},{default:o(()=>[d(" 确定 ")]),_:1})]),default:o(()=>[e(g,b({ref_key:"formRef",ref:a},c),null,16)]),_:1},8,["modelValue"])])}}});export{w as _};
