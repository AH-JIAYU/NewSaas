
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{k as I,d as w,r as u,a as d,an as C,ak as N,i as p,o as V,b,f as a,w as n,C as _,A as m,g as $,E as z,aj as P,aH as k,aI as E,N as B}from"./index-JhMSEHdj.js";const S={list:t=>I.post("other-ip/getIpInfo",t)},j=t=>(k("data-v-2c4afd24"),t=t(),E(),t),D={class:"flex-c"},M=j(()=>m("div",{class:"i-material-symbols-light:not-started-outline-rounded h-1.5em w-1.5em"},null,-1)),U=w({name:"queryIP",__name:"list",setup(t){const f=u(!1),s=u([]),r=u("");async function g(){try{if(s.value&&s.value.length===0)return z.warning({message:"请至少输入一个IP",center:!0});const c=s.value.split(`
`),o=await S.list({ip:c}),l=[];o.data.forEach(e=>{l.push(`${e.continent.names.zhCN}-${e.country.names.zhCN}-${e.city.names.zhCN}, IP注册地:${e.registeredCountry.names.zhCN}-${e==null?void 0:e.subdivisions[0].names.zhCN}`)}),r.value=l.join(`
`)}catch(c){console.log(c)}}return(c,o)=>{const l=d("el-input"),e=d("el-col"),h=d("el-button"),v=d("el-row"),x=P,y=C("loading");return N((V(),b("div",null,[a(x,null,{default:n(()=>[a(v,{style:{margin:"0"},gutter:24},{default:n(()=>[a(e,{style:{padding:"0"},xs:10,sm:10,md:10,lg:10,xl:10},{default:n(()=>[a(l,{modelValue:p(s),"onUpdate:modelValue":o[0]||(o[0]=i=>_(s)?s.value=i:null),placeholder:"请粘贴IP,参考格式： (110.34.56.112)，每行一个,多个请回车换行",type:"textarea",rows:"30"},null,8,["modelValue"])]),_:1}),a(e,{xs:2,sm:2,md:2,lg:2,xl:2},{default:n(()=>[m("div",D,[a(h,{type:"primary",size:"default",onClick:g},{default:n(()=>[M,$(" 开始 ")]),_:1})])]),_:1}),a(e,{xs:10,sm:10,md:10,lg:10,xl:10},{default:n(()=>[a(l,{modelValue:p(r),"onUpdate:modelValue":o[1]||(o[1]=i=>_(r)?r.value=i:null),type:"textarea",rows:"30"},null,8,["modelValue"])]),_:1})]),_:1})]),_:1})])),[[y,p(f)]])}}}),A=B(U,[["__scopeId","data-v-2c4afd24"]]);export{A as default};
