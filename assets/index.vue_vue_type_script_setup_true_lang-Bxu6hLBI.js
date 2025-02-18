
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{D as _}from"./index-BVOW83ud.js";import{d as w,C as k,D as B,r as E,F as N,a3 as u,b as c,j as h,c as y,w as e,f as V,g as o,h as d,H as v,i as C,k as M}from"./index-CZbucr5m.js";const R={style:{flex:"auto"}},S={style:{flex:"auto"}},j=w({__name:"index",props:k({mode:{},title:{},details:{},id:{}},{modelValue:{type:Boolean,default:!1},modelModifiers:{}}),emits:k(["success"],["update:modelValue"]),setup(f,{emit:b}){const t=f,x=b,l=B(f,"modelValue"),i=E(),p=N(()=>t.id===""?"新增前置问卷库":"编辑前置问卷库");function a(){i.value.submit().then(()=>{x("success"),r()})}function r(){l.value=!1}return(F,s)=>{const n=u("el-button"),D=u("ElDialog"),g=u("ElDrawer");return c(),h("div",null,[t.mode==="dialog"?(c(),y(D,{key:0,modelValue:l.value,"onUpdate:modelValue":s[0]||(s[0]=m=>l.value=m),title:C(p),width:"80%","close-on-click-modal":!1,"append-to-body":"","destroy-on-close":""},{footer:e(()=>[V("div",R,[o(n,{onClick:r},{default:e(()=>[d(" 取消 ")]),_:1}),o(n,{type:"primary",onClick:a},{default:e(()=>[d(" 确定 ")]),_:1})])]),default:e(()=>[o(_,v({ref_key:"formRef",ref:i},t,{onOnSubmit:a}),null,16)]),_:1},8,["modelValue","title"])):t.mode==="drawer"?(c(),y(g,{key:1,modelValue:l.value,"onUpdate:modelValue":s[1]||(s[1]=m=>l.value=m),title:C(p),size:"80%","close-on-click-modal":!1,"destroy-on-close":""},{footer:e(()=>[V("div",S,[o(n,{onClick:r},{default:e(()=>[d(" 取消 ")]),_:1}),o(n,{type:"primary",onClick:a},{default:e(()=>[d(" 确定 ")]),_:1})])]),default:e(()=>[o(_,v({ref_key:"formRef",ref:i},t,{onOnSubmit:a}),null,16)]),_:1},8,["modelValue","title"])):M("",!0)])}}});export{j as _};
