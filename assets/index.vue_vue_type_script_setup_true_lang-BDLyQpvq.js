
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import y from"./index-_V5jbBN1.js";import{d as x,m as V,r as v,u as z,c as D,a as m,o as c,b as M,e as g,w as e,f as o,g as n,i as f,h as C,j as N}from"./index-4-pQw2v5.js";const j=x({__name:"index",props:V(["id","row","mode"],{modelValue:{type:Boolean,default:!1},modelModifiers:{}}),emits:V(["success"],["update:modelValue"]),setup(p,{emit:b}){const l=p,w=b,r=v(!1),t=z(p,"modelValue"),d=v(),_=D(()=>l.id===""?"新增角色":"编辑角色");function k(){r.value=!0,d.value.submit().then(()=>{w("success"),r.value=!1,i()})}function i(){t.value=!1}return(R,a)=>{const s=m("ElButton"),E=m("ElDialog"),B=m("ElDrawer");return c(),M("div",null,[l.mode==="dialog"?(c(),g(E,{key:0,modelValue:t.value,"onUpdate:modelValue":a[0]||(a[0]=u=>t.value=u),title:f(_),width:"60%","close-on-click-modal":!1,"append-to-body":"","destroy-on-close":""},{footer:e(()=>[o(s,{size:"large",onClick:i},{default:e(()=>[n(" 取消 ")]),_:1}),o(s,{type:"primary",size:"large",disabled:f(r),onClick:k},{default:e(()=>[n(" 确定 ")]),_:1},8,["disabled"])]),default:e(()=>[o(y,C({ref_key:"formRef",ref:d},l),null,16)]),_:1},8,["modelValue","title"])):l.mode==="drawer"?(c(),g(B,{key:1,modelValue:t.value,"onUpdate:modelValue":a[1]||(a[1]=u=>t.value=u),title:f(_),size:"60%","close-on-click-modal":!1,"destroy-on-close":""},{footer:e(()=>[o(s,{size:"large",onClick:i},{default:e(()=>[n(" 取消 ")]),_:1}),o(s,{type:"primary",size:"large",onClick:k},{default:e(()=>[n(" 确定 ")]),_:1})]),default:e(()=>[o(y,C({ref_key:"formRef",ref:d},l),null,16)]),_:1},8,["modelValue","title"])):N("",!0)])}}});export{j as _};
