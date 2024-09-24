
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{D as g}from"./index-DJ3NGY_k.js";import{d as v,m as i,u as k,r as x,b as r,o as y,e as C,g as e,w as o,h as u,i as b}from"./index-CgyKQh9o.js";const B="新增结算",w=v({__name:"index",props:i({mode:{},id:{}},{modelValue:{type:Boolean,default:!1},modelModifiers:{}}),emits:i(["success"],["update:modelValue"]),setup(t,{emit:d}){const c=t,f=d,l=k(t,"modelValue"),s=x();function p(){s.value.submit().then(()=>{f("success"),a()})}function a(){l.value=!1}return(E,n)=>{const m=r("ElButton"),_=r("ElDialog");return y(),C("div",null,[e(_,{modelValue:l.value,"onUpdate:modelValue":n[0]||(n[0]=V=>l.value=V),title:B,width:"600px","close-on-click-modal":!1,"append-to-body":"","destroy-on-close":""},{footer:o(()=>[e(m,{size:"large",onClick:a},{default:o(()=>[u(" 取消 ")]),_:1}),e(m,{type:"primary",size:"large",onClick:p},{default:o(()=>[u(" 确定 ")]),_:1})]),default:o(()=>[e(g,b({ref_key:"formRef",ref:s},c),null,16)]),_:1},8,["modelValue"])])}}});export{w as _};
