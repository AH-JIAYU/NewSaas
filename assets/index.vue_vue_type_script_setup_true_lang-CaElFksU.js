
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{D as _}from"./index-C9NM-AJ5.js";import{d as B,B as y,C as D,r as E,E as N,a2 as u,a as c,i as h,c as k,w as e,b as V,f as o,g as d,G as v,h as C,j as M}from"./index-Dfh_jK84.js";const R={style:{flex:"auto"}},S={style:{flex:"auto"}},z=B({__name:"index",props:y({mode:{},title:{},details:{},id:{}},{modelValue:{type:Boolean,default:!1},modelModifiers:{}}),emits:y(["success"],["update:modelValue"]),setup(f,{emit:b}){const t=f,x=b,l=D(f,"modelValue"),i=E(),p=N(()=>t.id===""?"新增前置问卷库":"编辑前置问卷库");function a(){i.value.submit().then(()=>{x("success"),r()})}function r(){l.value=!1}return(O,s)=>{const n=u("el-button"),g=u("ElDialog"),w=u("ElDrawer");return c(),h("div",null,[t.mode==="dialog"?(c(),k(g,{key:0,modelValue:l.value,"onUpdate:modelValue":s[0]||(s[0]=m=>l.value=m),title:C(p),width:"80%","close-on-click-modal":!1,"append-to-body":"","destroy-on-close":""},{footer:e(()=>[V("div",R,[o(n,{onClick:r},{default:e(()=>[d(" 取消 ")]),_:1}),o(n,{type:"primary",onClick:a},{default:e(()=>[d(" 确定 ")]),_:1})])]),default:e(()=>[o(_,v({ref_key:"formRef",ref:i},t,{onOnSubmit:a}),null,16)]),_:1},8,["modelValue","title"])):t.mode==="drawer"?(c(),k(w,{key:1,modelValue:l.value,"onUpdate:modelValue":s[1]||(s[1]=m=>l.value=m),title:C(p),size:"80%","close-on-click-modal":!1,"destroy-on-close":""},{footer:e(()=>[V("div",S,[o(n,{onClick:r},{default:e(()=>[d(" 取消 ")]),_:1}),o(n,{type:"primary",onClick:a},{default:e(()=>[d(" 确定 ")]),_:1})])]),default:e(()=>[o(_,v({ref_key:"formRef",ref:i},t,{onOnSubmit:a}),null,16)]),_:1},8,["modelValue","title"])):M("",!0)])}}});export{z as _};
