
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{D as _}from"./index-Bw611rcu.js";import{d as D,m as y,u as B,r as E,c as N,a as u,o as c,b as h,e as k,w as e,y as V,f as o,g as d,h as v,i as b,j as M}from"./index-DvH_mzfZ.js";const R={style:{flex:"auto"}},S={style:{flex:"auto"}},z=D({__name:"index",props:y({mode:{},title:{},details:{},id:{}},{modelValue:{type:Boolean,default:!1},modelModifiers:{}}),emits:y(["success"],["update:modelValue"]),setup(f,{emit:C}){const t=f,x=C,l=B(f,"modelValue"),i=E(),p=N(()=>t.id===""?"新增前置问卷库":"编辑前置问卷库");function a(){i.value.submit().then(()=>{x("success"),r()})}function r(){l.value=!1}return(O,s)=>{const n=u("el-button"),g=u("ElDialog"),w=u("ElDrawer");return c(),h("div",null,[t.mode==="dialog"?(c(),k(g,{key:0,modelValue:l.value,"onUpdate:modelValue":s[0]||(s[0]=m=>l.value=m),title:b(p),width:"80%","close-on-click-modal":!1,"append-to-body":"","destroy-on-close":""},{footer:e(()=>[V("div",R,[o(n,{onClick:r},{default:e(()=>[d(" 取消 ")]),_:1}),o(n,{type:"primary",onClick:a},{default:e(()=>[d(" 确定 ")]),_:1})])]),default:e(()=>[o(_,v({ref_key:"formRef",ref:i},t,{onOnSubmit:a}),null,16)]),_:1},8,["modelValue","title"])):t.mode==="drawer"?(c(),k(w,{key:1,modelValue:l.value,"onUpdate:modelValue":s[1]||(s[1]=m=>l.value=m),title:b(p),size:"80%","close-on-click-modal":!1,"destroy-on-close":""},{footer:e(()=>[V("div",S,[o(n,{onClick:r},{default:e(()=>[d(" 取消 ")]),_:1}),o(n,{type:"primary",onClick:a},{default:e(()=>[d(" 确定 ")]),_:1})])]),default:e(()=>[o(_,v({ref_key:"formRef",ref:i},t,{onOnSubmit:a}),null,16)]),_:1},8,["modelValue","title"])):M("",!0)])}}});export{z as _};
