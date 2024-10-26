
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import v from"./index-BGje5YfZ.js";import{d as x,m as y,r as V,u as z,c as D,a as m,o as c,b as M,e as g,w as e,f as o,g as r,i as f,h as C,j as N}from"./index-BPxxK-md.js";const j=x({__name:"index",props:y(["id","row","mode"],{modelValue:{type:Boolean,default:!1},modelModifiers:{}}),emits:y(["success"],["update:modelValue"]),setup(p,{emit:b}){const l=p,w=b,a=V(!1),t=z(p,"modelValue"),d=V(),_=D(()=>l.id===""?"新增角色":"编辑角色");function k(){a.value||(a.value=!0,d.value.submit().then(()=>{w("success"),a.value=!1,i()}))}function i(){t.value=!1}return(R,s)=>{const n=m("ElButton"),E=m("ElDialog"),B=m("ElDrawer");return c(),M("div",null,[l.mode==="dialog"?(c(),g(E,{key:0,modelValue:t.value,"onUpdate:modelValue":s[0]||(s[0]=u=>t.value=u),title:f(_),width:"60%","close-on-click-modal":!1,"append-to-body":"","destroy-on-close":""},{footer:e(()=>[o(n,{size:"large",onClick:i},{default:e(()=>[r(" 取消 ")]),_:1}),o(n,{type:"primary",size:"large",disabled:f(a),onClick:k},{default:e(()=>[r(" 确定 ")]),_:1},8,["disabled"])]),default:e(()=>[o(v,C({ref_key:"formRef",ref:d},l),null,16)]),_:1},8,["modelValue","title"])):l.mode==="drawer"?(c(),g(B,{key:1,modelValue:t.value,"onUpdate:modelValue":s[1]||(s[1]=u=>t.value=u),title:f(_),size:"60%","close-on-click-modal":!1,"destroy-on-close":""},{footer:e(()=>[o(n,{size:"large",onClick:i},{default:e(()=>[r(" 取消 ")]),_:1}),o(n,{type:"primary",size:"large",onClick:k},{default:e(()=>[r(" 确定 ")]),_:1})]),default:e(()=>[o(v,C({ref_key:"formRef",ref:d},l),null,16)]),_:1},8,["modelValue","title"])):N("",!0)])}}});export{j as _};
