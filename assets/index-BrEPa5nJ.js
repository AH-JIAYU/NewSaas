
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{s as I,d as b,r as u,a as s,o as v,b as w,f as l,w as o,i as p,G as i,p as V,g as h,bj as C,E as U,aq as $,P as E}from"./index-DntGxMRg.js";const P={list:_=>I.post("callback/getAnalyzeUid",_)},k={class:"flex-c"},D=b({name:"uidParsing",__name:"index",setup(_){u(!1);const n=u([]),r=u("");async function m(){try{if(n.value&&n.value.length===0)return U.warning({message:"请至少输入一个IP",center:!0});const d=n.value.split(`
`),a=await P.list({uidList:d}),t=[];console.log("res",a),a.data.analyzeUidInfoList.forEach(e=>{t.push(`${"UID:"+e.uid}-${e.peopleType===1?"会员名称:"+e.name:"子会员名称:"+e.name}-${e.peopleType===1?"会员ID:"+e.memberChildId:"子会员ID:"+e.memberChildId}-${e.peopleType===1?"会员":"子会员"}`)}),r.value=t.join(`
`)}catch(d){console.log(d)}}return(d,a)=>{const t=s("el-input"),e=s("el-col"),f=s("el-icon"),g=s("el-button"),x=s("el-row"),y=$;return v(),w("div",null,[l(y,null,{default:o(()=>[l(x,{style:{margin:"0"},gutter:24},{default:o(()=>[l(e,{style:{padding:"0"},xs:10,sm:10,md:10,lg:10,xl:10},{default:o(()=>[l(t,{modelValue:p(n),"onUpdate:modelValue":a[0]||(a[0]=c=>i(n)?n.value=c:null),placeholder:"请粘贴UID每行一个,多个请回车换行",type:"textarea",rows:30},null,8,["modelValue"])]),_:1}),l(e,{xs:2,sm:2,md:2,lg:2,xl:2},{default:o(()=>[V("div",k,[l(g,{type:"primary",size:"default",onClick:m},{default:o(()=>[h(" 解析"),l(f,null,{default:o(()=>[l(p(C))]),_:1})]),_:1})])]),_:1}),l(e,{xs:10,sm:10,md:10,lg:10,xl:10},{default:o(()=>[l(t,{modelValue:p(r),"onUpdate:modelValue":a[1]||(a[1]=c=>i(r)?r.value=c:null),type:"textarea",rows:30},null,8,["modelValue"])]),_:1})]),_:1})]),_:1})])}}}),z=E(D,[["__scopeId","data-v-45633f0a"]]);export{z as default};
