
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{u as k}from"./dictionary-BAELCLPG.js";import{d as b,u as x,r as n,a as l,o as s,e as i,w as d,f as m,g as B,b as C,n as D,i as u,F as S,E as w,l as N,D as A}from"./index-QfOrM8xp.js";const M=b({__name:"index",props:{modelValue:{type:Boolean,default:!1},modelModifiers:{}},emits:["update:modelValue"],setup(p){const t=x(p,"modelValue"),f=n([{name:"证件",code:"user_card"},{name:"学历",code:"user_education"}]),a=n(""),_=k(),r=n([]);function V(c){_.get(c).then(e=>{r.value=e})}return(c,e)=>{const y=l("ElAlert"),v=l("ElOption"),E=l("ElSelect"),g=l("ElDialog");return s(),i(g,{modelValue:t.value,"onUpdate:modelValue":e[1]||(e[1]=o=>t.value=o),title:"使用示例",width:"400px","close-on-click-modal":!1,"append-to-body":"","destroy-on-close":"",onClosed:e[2]||(e[2]=o=>t.value=!1)},{default:d(()=>[m(y,{closable:!1},{default:d(()=>[B(" 如果全局状态中没有该字典，则会请求接口获取并存储在全局状态中。 ")]),_:1}),m(E,{modelValue:u(a),"onUpdate:modelValue":e[0]||(e[0]=o=>w(a)?a.value=o:null),style:{width:"100%"},onChange:V},{default:d(()=>[(s(!0),C(S,null,D(u(f),o=>(s(),i(v,{key:o.code,label:o.name,value:o.code},null,8,["label","value"]))),128))]),_:1},8,["modelValue"]),N("p",null,A(u(r)),1)]),_:1},8,["modelValue"])}}});export{M as _};
