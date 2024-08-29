
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{x as I,d as w,r as u,a as d,p as C,q as V,i as p,o as N,b as $,f as t,w as n,I as _,s as m,g as z,E as P,ao as b,aJ as E,aK as k,R as B}from"./index-CzARc10T.js";const S={list:s=>I.post("other-ip/getIpInfo",s)},q=s=>(E("data-v-7e681962"),s=s(),k(),s),D={class:"flex-c"},M=q(()=>m("div",{class:"i-material-symbols-light:not-started-outline-rounded h-1.5em w-1.5em"},null,-1)),R=w({name:"queryIP",__name:"list",setup(s){const f=u(!1),a=u([]),r=u("");async function g(){try{if(a.value&&a.value.length===0)return P.warning({message:"请至少输入一个IP",center:!0});const c=a.value.split(`
`),o=await S.list({ip:c}),l=[];o.data.forEach(e=>{l.push(`${e.continent.names.zhCN}-${e.country.names.zhCN}-${e.city.names.zhCN}, IP注册地:${e.registeredCountry.names.zhCN}-${e==null?void 0:e.subdivisions[0].names.zhCN}`)}),r.value=l.join(`
`)}catch(c){console.log(c)}}return(c,o)=>{const l=d("el-input"),e=d("el-col"),h=d("el-button"),v=d("el-row"),x=b,y=C("loading");return V((N(),$("div",null,[t(x,null,{default:n(()=>[t(v,{style:{margin:"0"},gutter:24},{default:n(()=>[t(e,{style:{padding:"0"},xs:10,sm:10,md:10,lg:10,xl:10},{default:n(()=>[t(l,{modelValue:p(a),"onUpdate:modelValue":o[0]||(o[0]=i=>_(a)?a.value=i:null),placeholder:"请粘贴IP,参考格式： (110.34.56.112)，每行一个,多个请回车换行",type:"textarea",rows:30},null,8,["modelValue"])]),_:1}),t(e,{xs:2,sm:2,md:2,lg:2,xl:2},{default:n(()=>[m("div",D,[t(h,{type:"primary",size:"default",onClick:g},{default:n(()=>[M,z(" 开始 ")]),_:1})])]),_:1}),t(e,{xs:10,sm:10,md:10,lg:10,xl:10},{default:n(()=>[t(l,{modelValue:p(r),"onUpdate:modelValue":o[1]||(o[1]=i=>_(r)?r.value=i:null),type:"textarea",rows:30},null,8,["modelValue"])]),_:1})]),_:1})]),_:1})])),[[y,p(f)]])}}}),j=B(R,[["__scopeId","data-v-7e681962"]]);export{j as default};
