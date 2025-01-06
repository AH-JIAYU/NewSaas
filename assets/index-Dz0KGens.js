
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{k as h,d as w,r as i,a as s,q as I,o as _,b as V,f as a,w as l,i as u,A as m,y as U,s as k,e as C,g as D,bo as $,E,an as P,L as z}from"./index-mjjdyD2u.js";const B={list:p=>h.post("callback/getAnalyzeUid",p)},T={class:"flex-c"},A=w({name:"uidParsing",__name:"index",setup(p){i(!1);const t=i([]),r=i("");async function f(){try{if(t.value&&t.value.length===0)return E.warning({message:"请至少输入一个IP",center:!0});const c=t.value.split(`
`),n=await B.list({uidList:c}),o=[];n.data.analyzeUidInfoList.forEach(e=>{o.push(`${"UID:"+e.uid}-${e.peopleType===1?"会员名称:"+e.name:"子会员名称:"+e.name}-${e.peopleType===1?"会员ID:"+e.memberChildId:"子会员ID:"+e.memberChildId}-${e.peopleType===1?"会员":"子会员"}`)}),r.value=o.join(`
`)}catch(c){console.log(c)}}return(c,n)=>{const o=s("el-input"),e=s("el-col"),g=s("el-icon"),x=s("el-button"),y=s("el-row"),v=P,b=I("auth");return _(),V("div",null,[a(v,null,{default:l(()=>[a(y,{style:{margin:"0"},gutter:24},{default:l(()=>[a(e,{style:{padding:"0"},xs:10,sm:10,md:10,lg:10,xl:10},{default:l(()=>[a(o,{modelValue:u(t),"onUpdate:modelValue":n[0]||(n[0]=d=>m(t)?t.value=d:null),placeholder:"请粘贴UID每行一个,多个请回车换行",type:"textarea",rows:30},null,8,["modelValue"])]),_:1}),a(e,{xs:2,sm:2,md:2,lg:2,xl:2},{default:l(()=>[U("div",T,[k((_(),C(x,{type:"primary",size:"default",onClick:f},{default:l(()=>[D(" 解析"),a(g,null,{default:l(()=>[a(u($))]),_:1})]),_:1})),[[b,"uidParsing-get-getAnalyzeUid"]])])]),_:1}),a(e,{xs:10,sm:10,md:10,lg:10,xl:10},{default:l(()=>[a(o,{modelValue:u(r),"onUpdate:modelValue":n[1]||(n[1]=d=>m(r)?r.value=d:null),type:"textarea",rows:30},null,8,["modelValue"])]),_:1})]),_:1})]),_:1})])}}}),N=z(A,[["__scopeId","data-v-b0cbe395"]]);export{N as default};
