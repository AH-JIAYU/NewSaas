
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import _ from"./index-CUZeI3u1.js";import{d as x,B as k,C as B,r as z,E as D,a2 as m,a as u,i as b,c as y,w as e,f as o,g as n,G as V,h as g,j as M}from"./index-BBQ0m3JZ.js";const h=x({__name:"index",props:k({mode:{},row:{},id:{}},{modelValue:{type:Boolean,default:!1},modelModifiers:{}}),emits:k(["success"],["update:modelValue"]),setup(c,{emit:C}){const l=c,v=C,t=B(c,"modelValue"),r=z(),f=D(()=>l.id===""?"新增首页设置":"编辑标题");function p(){r.value.submit().then(()=>{d(),v("success")})}function d(){t.value=!1}return(N,a)=>{const s=m("ElButton"),E=m("ElDialog"),w=m("ElDrawer");return u(),b("div",null,[l.mode==="dialog"?(u(),y(E,{key:0,modelValue:t.value,"onUpdate:modelValue":a[0]||(a[0]=i=>t.value=i),title:g(f),width:"600px","close-on-click-modal":!1,"append-to-body":"","destroy-on-close":""},{footer:e(()=>[o(s,{size:"large",onClick:d},{default:e(()=>[n(" 取消 ")]),_:1}),o(s,{type:"primary",size:"large",onClick:p},{default:e(()=>[n(" 确定 ")]),_:1})]),default:e(()=>[o(_,V({ref_key:"formRef",ref:r},l),null,16)]),_:1},8,["modelValue","title"])):l.mode==="drawer"?(u(),y(w,{key:1,modelValue:t.value,"onUpdate:modelValue":a[1]||(a[1]=i=>t.value=i),title:g(f),size:"600px","close-on-click-modal":!1,"destroy-on-close":""},{footer:e(()=>[o(s,{size:"large",onClick:d},{default:e(()=>[n(" 取消 ")]),_:1}),o(s,{type:"primary",size:"large",onClick:p},{default:e(()=>[n(" 确定 ")]),_:1})]),default:e(()=>[o(_,V({ref_key:"formRef",ref:r},l),null,16)]),_:1},8,["modelValue","title"])):M("",!0)])}}});export{h as _};
