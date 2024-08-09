
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{q as I,d as w,r as u,a as i,l as C,n as N,i as p,o as V,b,f as t,w as n,D as _,p as m,g as $,E as z,an as P,aH as E,aI as k,N as B}from"./index-BdHtZquS.js";const D={list:a=>I.post("other-ip/getIpInfo",a)},S=a=>(E("data-v-6ac20251"),a=a(),k(),a),q={class:"flex-c"},M=S(()=>m("div",{class:"i-material-symbols-light:not-started-outline-rounded h-1.5em w-1.5em"},null,-1)),U=w({name:"queryIP",__name:"list",setup(a){const f=u(!1),s=u([]),r=u("");async function g(){try{if(s.value&&s.value.length===0)return z.warning({message:"请至少输入一个IP",center:!0});const c=s.value.split(`
`),o=await D.list({ip:c}),l=[];o.data.forEach(e=>{l.push(`${e.continent.names.zhCN}-${e.country.names.zhCN}-${e.city.names.zhCN}, IP注册地:${e.registeredCountry.names.zhCN}-${e==null?void 0:e.subdivisions[0].names.zhCN}`)}),r.value=l.join(`
`)}catch(c){console.log(c)}}return(c,o)=>{const l=i("el-input"),e=i("el-col"),h=i("el-button"),v=i("el-row"),x=P,y=C("loading");return N((V(),b("div",null,[t(x,null,{default:n(()=>[t(v,{style:{margin:"0"},gutter:24},{default:n(()=>[t(e,{style:{padding:"0"},xs:10,sm:10,md:10,lg:10,xl:10},{default:n(()=>[t(l,{modelValue:p(s),"onUpdate:modelValue":o[0]||(o[0]=d=>_(s)?s.value=d:null),placeholder:"请粘贴IP,参考格式： (110.34.56.112)，每行一个,多个请回车换行",type:"textarea",rows:30},null,8,["modelValue"])]),_:1}),t(e,{xs:2,sm:2,md:2,lg:2,xl:2},{default:n(()=>[m("div",q,[t(h,{type:"primary",size:"default",onClick:g},{default:n(()=>[M,$(" 开始 ")]),_:1})])]),_:1}),t(e,{xs:10,sm:10,md:10,lg:10,xl:10},{default:n(()=>[t(l,{modelValue:p(r),"onUpdate:modelValue":o[1]||(o[1]=d=>_(r)?r.value=d:null),type:"textarea",rows:30},null,8,["modelValue"])]),_:1})]),_:1})]),_:1})])),[[y,p(f)]])}}}),H=B(U,[["__scopeId","data-v-6ac20251"]]);export{H as default};
