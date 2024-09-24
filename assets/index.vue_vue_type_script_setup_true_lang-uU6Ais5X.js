
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{a as k}from"./dictionary-CjXgO-Vv.js";import{ag as S,r,d as b,u as x,b as s,o as u,f as p,w as i,g as f,h as D,e as w,v as B,j as d,F as C,I as N,t as A,H as F}from"./index-DyjnimEA.js";const L=S("dictionary",()=>{const a=r({});async function l(t){if(!a.value[t]){const n=await k.get(t);a.value[t]=n.data.list}return a.value[t]}return{get:l}}),M=L,$=b({__name:"index",props:{modelValue:{type:Boolean,default:!1},modelModifiers:{}},emits:["update:modelValue"],setup(a){const l=x(a,"modelValue"),t=r([{name:"证件",code:"user_card"},{name:"学历",code:"user_education"}]),n=r(""),y=M(),c=r([]);function v(m){y.get(m).then(e=>{c.value=e})}return(m,e)=>{const _=s("ElAlert"),V=s("ElOption"),g=s("ElSelect"),E=s("ElDialog");return u(),p(E,{modelValue:l.value,"onUpdate:modelValue":e[1]||(e[1]=o=>l.value=o),title:"使用示例",width:"400px","close-on-click-modal":!1,"append-to-body":"","destroy-on-close":"",onClosed:e[2]||(e[2]=o=>l.value=!1)},{default:i(()=>[f(_,{closable:!1},{default:i(()=>[D(" 如果全局状态中没有该字典，则会请求接口获取并存储在全局状态中。 ")]),_:1}),f(g,{modelValue:d(n),"onUpdate:modelValue":e[0]||(e[0]=o=>N(n)?n.value=o:null),style:{width:"100%"},onChange:v},{default:i(()=>[(u(!0),w(C,null,B(d(t),o=>(u(),p(V,{key:o.code,label:o.name,value:o.code},null,8,["label","value"]))),128))]),_:1},8,["modelValue"]),A("p",null,F(d(c)),1)]),_:1},8,["modelValue"])}}});export{$ as _};
