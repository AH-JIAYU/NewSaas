
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{k as I,d as b,r as u,a as s,o as v,b as w,f as l,w as n,i as p,G as i,C as V,g as h,bf as U,E as C,ak as k,P as $}from"./index-BgZOffyT.js";const E={list:_=>I.post("callback/getAnalyzeUid",_)},P={class:"flex-c"},D=b({name:"UserUidParsingIndex",__name:"index",setup(_){u(!1);const o=u([]),r=u("");async function m(){try{if(o.value&&o.value.length===0)return C.warning({message:"请至少输入一个IP",center:!0});const d=o.value.split(`
`),a=await E.list({uidList:d}),t=[];console.log("res",a),a.data.analyzeUidInfoList.forEach(e=>{t.push(`${"UID:"+e.uid}-${e.peopleType===1?"会员名称:"+e.name:"子会员名称:"+e.name}-${e.peopleType===1?"会员ID:"+e.memberChildId:"子会员ID:"+e.memberChildId}-${e.peopleType===1?"会员":"子会员"}`)}),r.value=t.join(`
`)}catch(d){console.log(d)}}return(d,a)=>{const t=s("el-input"),e=s("el-col"),f=s("el-icon"),g=s("el-button"),x=s("el-row"),y=k;return v(),w("div",null,[l(y,null,{default:n(()=>[l(x,{style:{margin:"0"},gutter:24},{default:n(()=>[l(e,{style:{padding:"0"},xs:10,sm:10,md:10,lg:10,xl:10},{default:n(()=>[l(t,{modelValue:p(o),"onUpdate:modelValue":a[0]||(a[0]=c=>i(o)?o.value=c:null),placeholder:"请粘贴UID每行一个,多个请回车换行",type:"textarea",rows:"30"},null,8,["modelValue"])]),_:1}),l(e,{xs:2,sm:2,md:2,lg:2,xl:2},{default:n(()=>[V("div",P,[l(g,{type:"primary",size:"default",onClick:m},{default:n(()=>[h(" 解析"),l(f,null,{default:n(()=>[l(p(U))]),_:1})]),_:1})])]),_:1}),l(e,{xs:10,sm:10,md:10,lg:10,xl:10},{default:n(()=>[l(t,{modelValue:p(r),"onUpdate:modelValue":a[1]||(a[1]=c=>i(r)?r.value=c:null),type:"textarea",rows:"30"},null,8,["modelValue"])]),_:1})]),_:1})]),_:1})])}}}),z=$(D,[["__scopeId","data-v-33c0beaa"]]);export{z as default};
