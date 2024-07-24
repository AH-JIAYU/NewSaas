
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{k as I,d as w,r as u,a as d,al as C,am as V,i as p,o as b,b as N,f as t,w as n,G as _,C as m,g as $,E as z,ak as P,aK as k,aL as E,P as B}from"./index-TPKc4hfg.js";const S={list:s=>I.post("other-ip/get/getIpInfo",s)},D=s=>(k("data-v-e3ccc4d1"),s=s(),E(),s),M={class:"flex-c"},U=D(()=>m("div",{class:"i-material-symbols-light:not-started-outline-rounded h-1.5em w-1.5em"},null,-1)),j=w({name:"OtherFunctionsQueryIpIndex",__name:"list",setup(s){const f=u(!1),a=u([]),c=u("");async function g(){try{if(a.value&&a.value.length===0)return z.warning({message:"请至少输入一个IP",center:!0});const r=a.value.split(`
`),o=await S.list({ip:r}),l=[];o.data.forEach(e=>{l.push(`${e.continent.names.zhCN}-${e.country.names.zhCN}-${e.city.names.zhCN}, IP注册地:${e.registeredCountry.names.zhCN}-${e==null?void 0:e.subdivisions[0].names.zhCN}`)}),c.value=l.join(`
`)}catch(r){console.log(r)}}return(r,o)=>{const l=d("el-input"),e=d("el-col"),h=d("el-button"),v=d("el-row"),x=P,y=C("loading");return V((b(),N("div",null,[t(x,null,{default:n(()=>[t(v,{style:{margin:"0"},gutter:24},{default:n(()=>[t(e,{style:{padding:"0"},xs:10,sm:10,md:10,lg:10,xl:10},{default:n(()=>[t(l,{modelValue:p(a),"onUpdate:modelValue":o[0]||(o[0]=i=>_(a)?a.value=i:null),placeholder:"请粘贴IP,参考格式： (110.34.56.112)，每行一个,多个请回车换行",type:"textarea",rows:"30"},null,8,["modelValue"])]),_:1}),t(e,{xs:2,sm:2,md:2,lg:2,xl:2},{default:n(()=>[m("div",M,[t(h,{type:"primary",size:"default",onClick:g},{default:n(()=>[U,$(" 开始 ")]),_:1})])]),_:1}),t(e,{xs:10,sm:10,md:10,lg:10,xl:10},{default:n(()=>[t(l,{modelValue:p(c),"onUpdate:modelValue":o[1]||(o[1]=i=>_(c)?c.value=i:null),type:"textarea",rows:"30"},null,8,["modelValue"])]),_:1})]),_:1})]),_:1})])),[[y,p(f)]])}}}),G=B(j,[["__scopeId","data-v-e3ccc4d1"]]);export{G as default};
