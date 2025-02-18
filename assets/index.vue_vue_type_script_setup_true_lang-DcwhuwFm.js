
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import _ from"./index-Bb_IOpx9.js";import{d as E,C as k,D as B,r as D,F as b,a3 as m,b as u,j as z,c as y,w as e,g as o,h as n,H as V,i as g,k as M}from"./index-CZbucr5m.js";const U=E({__name:"index",props:k({mode:{},row:{},id:{}},{modelValue:{type:Boolean,default:!1},modelModifiers:{}}),emits:k(["success"],["update:modelValue"]),setup(c,{emit:C}){const l=c,v=C,t=B(c,"modelValue"),r=D(),f=b(()=>l.id===""?"新增首页设置":"编辑标题");function p(){r.value.submit().then(()=>{d(),v("success")})}function d(){t.value=!1}return(N,a)=>{const s=m("ElButton"),w=m("ElDialog"),x=m("ElDrawer");return u(),z("div",null,[l.mode==="dialog"?(u(),y(w,{key:0,modelValue:t.value,"onUpdate:modelValue":a[0]||(a[0]=i=>t.value=i),title:g(f),width:"600px","close-on-click-modal":!1,"append-to-body":"","destroy-on-close":""},{footer:e(()=>[o(s,{size:"large",onClick:d},{default:e(()=>[n(" 取消 ")]),_:1}),o(s,{type:"primary",size:"large",onClick:p},{default:e(()=>[n(" 确定 ")]),_:1})]),default:e(()=>[o(_,V({ref_key:"formRef",ref:r},l),null,16)]),_:1},8,["modelValue","title"])):l.mode==="drawer"?(u(),y(x,{key:1,modelValue:t.value,"onUpdate:modelValue":a[1]||(a[1]=i=>t.value=i),title:g(f),size:"600px","close-on-click-modal":!1,"destroy-on-close":""},{footer:e(()=>[o(s,{size:"large",onClick:d},{default:e(()=>[n(" 取消 ")]),_:1}),o(s,{type:"primary",size:"large",onClick:p},{default:e(()=>[n(" 确定 ")]),_:1})]),default:e(()=>[o(_,V({ref_key:"formRef",ref:r},l),null,16)]),_:1},8,["modelValue","title"])):M("",!0)])}}});export{U as _};
