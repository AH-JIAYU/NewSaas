
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{s as I,d as w,r as u,a as i,l as C,n as V,i as p,o as b,b as N,f as t,w as n,H as _,p as m,g as $,E as z,an as P,aH as E,aI as k,Q as B}from"./index-D5mKHCpP.js";const S={list:s=>I.post("other-ip/getIpInfo",s)},D=s=>(E("data-v-6ac20251"),s=s(),k(),s),H={class:"flex-c"},M=D(()=>m("div",{class:"i-material-symbols-light:not-started-outline-rounded h-1.5em w-1.5em"},null,-1)),U=w({name:"queryIP",__name:"list",setup(s){const f=u(!1),a=u([]),r=u("");async function g(){try{if(a.value&&a.value.length===0)return z.warning({message:"请至少输入一个IP",center:!0});const c=a.value.split(`
`),o=await S.list({ip:c}),l=[];o.data.forEach(e=>{l.push(`${e.continent.names.zhCN}-${e.country.names.zhCN}-${e.city.names.zhCN}, IP注册地:${e.registeredCountry.names.zhCN}-${e==null?void 0:e.subdivisions[0].names.zhCN}`)}),r.value=l.join(`
`)}catch(c){console.log(c)}}return(c,o)=>{const l=i("el-input"),e=i("el-col"),h=i("el-button"),v=i("el-row"),x=P,y=C("loading");return V((b(),N("div",null,[t(x,null,{default:n(()=>[t(v,{style:{margin:"0"},gutter:24},{default:n(()=>[t(e,{style:{padding:"0"},xs:10,sm:10,md:10,lg:10,xl:10},{default:n(()=>[t(l,{modelValue:p(a),"onUpdate:modelValue":o[0]||(o[0]=d=>_(a)?a.value=d:null),placeholder:"请粘贴IP,参考格式： (110.34.56.112)，每行一个,多个请回车换行",type:"textarea",rows:30},null,8,["modelValue"])]),_:1}),t(e,{xs:2,sm:2,md:2,lg:2,xl:2},{default:n(()=>[m("div",H,[t(h,{type:"primary",size:"default",onClick:g},{default:n(()=>[M,$(" 开始 ")]),_:1})])]),_:1}),t(e,{xs:10,sm:10,md:10,lg:10,xl:10},{default:n(()=>[t(l,{modelValue:p(r),"onUpdate:modelValue":o[1]||(o[1]=d=>_(r)?r.value=d:null),type:"textarea",rows:30},null,8,["modelValue"])]),_:1})]),_:1})]),_:1})])),[[y,p(f)]])}}}),q=B(U,[["__scopeId","data-v-6ac20251"]]);export{q as default};
