
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{a as k}from"./dictionary-BPztKyRl.js";import{ac as D,r,d as S,D as b,a3 as s,b as i,c as p,w as u,g as f,h as x,j as w,P as B,i as d,O as C,l as N,f as O,t as A}from"./index-D3JQ81m5.js";const L=D("dictionary",()=>{const a=r({});async function l(t){if(!a.value[t]){const n=await k.get(t);a.value[t]=n.data.list}return a.value[t]}return{get:l}}),M=L,h=S({__name:"index",props:{modelValue:{type:Boolean,default:!1},modelModifiers:{}},emits:["update:modelValue"],setup(a){const l=b(a,"modelValue"),t=r([{name:"证件",code:"user_card"},{name:"学历",code:"user_education"}]),n=r(""),y=M(),c=r([]);function _(m){y.get(m).then(e=>{c.value=e})}return(m,e)=>{const v=s("ElAlert"),V=s("ElOption"),g=s("ElSelect"),E=s("ElDialog");return i(),p(E,{modelValue:l.value,"onUpdate:modelValue":e[1]||(e[1]=o=>l.value=o),title:"使用示例",width:"400px","close-on-click-modal":!1,"append-to-body":"","destroy-on-close":"",onClosed:e[2]||(e[2]=o=>l.value=!1)},{default:u(()=>[f(v,{closable:!1},{default:u(()=>[x(" 如果全局状态中没有该字典，则会请求接口获取并存储在全局状态中。 ")]),_:1}),f(g,{modelValue:d(n),"onUpdate:modelValue":e[0]||(e[0]=o=>N(n)?n.value=o:null),style:{width:"100%"},onChange:_},{default:u(()=>[(i(!0),w(C,null,B(d(t),o=>(i(),p(V,{key:o.code,label:o.name,value:o.code},null,8,["label","value"]))),128))]),_:1},8,["modelValue"]),O("p",null,A(d(c)),1)]),_:1},8,["modelValue"])}}});export{h as _};
