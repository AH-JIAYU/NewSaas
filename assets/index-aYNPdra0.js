
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{k as b,d as h,r as d,a as i,q as k,o as f,b as U,f as e,w as a,i as p,B as _,v as B,s as E,e as z,g as C,bq as D,E as g,ao as P,M as j}from"./index-C_u2Pe4I.js";const M={list:m=>b.post("callback/getAnalyzeUid",m)},N={class:"flex-c"},q=h({name:"uidParsing",__name:"index",setup(m){d(!1);const o=d(""),l=d([]),u=d("");async function v(){try{if(l.value&&l.value.length===0)return g.warning({message:"请至少输入一clickId",center:!0});if(!o.value)return g.warning({message:"请输入项目ID",center:!0});const c=l.value.split(`
`),t=await M.list({projectId:o.value,uidList:c}),n=[];t.data.analyzeUidInfoList.forEach(s=>{n.push(s.uid)}),u.value=n.join(`
`)}catch(c){console.log(c)}}return(c,t)=>{const n=i("el-input"),s=i("el-col"),x=i("el-icon"),y=i("el-button"),w=i("el-row"),V=P,I=k("auth");return f(),U("div",null,[e(V,null,{default:a(()=>[e(w,{style:{margin:"0"},gutter:24},{default:a(()=>[e(s,{style:{padding:"0"},xs:10,sm:10,md:10,lg:10,xl:10},{default:a(()=>[e(n,{modelValue:p(o),"onUpdate:modelValue":t[0]||(t[0]=r=>_(o)?o.value=r:null),placeholder:"请输入项目ID",style:{"margin-bottom":"10px"}},null,8,["modelValue"]),e(n,{modelValue:p(l),"onUpdate:modelValue":t[1]||(t[1]=r=>_(l)?l.value=r:null),placeholder:"请粘贴clickId每行一个,多个请回车换行",type:"textarea",rows:30},null,8,["modelValue"])]),_:1}),e(s,{xs:2,sm:2,md:2,lg:2,xl:2},{default:a(()=>[B("div",N,[E((f(),z(y,{type:"primary",size:"default",onClick:v},{default:a(()=>[C(" 解析"),e(x,null,{default:a(()=>[e(p(D))]),_:1})]),_:1})),[[I,"uidParsing-get-getAnalyzeUid"]])])]),_:1}),e(s,{xs:10,sm:10,md:10,lg:10,xl:10},{default:a(()=>[e(n,{modelValue:p(u),"onUpdate:modelValue":t[2]||(t[2]=r=>_(u)?u.value=r:null),type:"textarea",rows:30},null,8,["modelValue"])]),_:1})]),_:1})]),_:1})])}}}),L=j(q,[["__scopeId","data-v-aad6a2c6"]]);export{L as default};
