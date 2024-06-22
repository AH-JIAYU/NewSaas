
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{k as b,d as w,r as u,a as r,al as y,am as C,i as p,o as V,b as N,f as t,w as s,p as m,l as f,g as $,s as z,aG as k,aH as P,_ as B}from"./index-CxgaPvOC.js";const E={list:o=>b.post("other-ip/get/getIpInfo",o)},S=o=>(k("data-v-963afbeb"),o=o(),P(),o),D={class:"flex-c"},U=S(()=>f("div",{class:"i-material-symbols-light:not-started-outline-rounded h-1.5em w-1.5em"},null,-1)),j=w({name:"OtherFunctionsQueryIpIndex",__name:"list",setup(o){const i=u(!1),n=u([]),c=u("");async function v(){i.value=!0;const _=n.value.split(`
`),a=await E.list({ip:_});i.value=!1;const l=[];a.data.forEach(e=>{l.push(`${e.continent.names.zhCN}-${e.country.names.zhCN}-${e.city.names.zhCN},IP注册地:${e.registeredCountry.names.zhCN}`)}),c.value=l.join(`
`)}return(_,a)=>{const l=r("el-input"),e=r("el-col"),h=r("el-button"),x=r("el-row"),g=z,I=y("loading");return C((V(),N("div",null,[t(g,null,{default:s(()=>[t(x,{gutter:24},{default:s(()=>[t(e,{xs:10,sm:10,md:10,lg:10,xl:10},{default:s(()=>[t(l,{modelValue:p(n),"onUpdate:modelValue":a[0]||(a[0]=d=>m(n)?n.value=d:null),placeholder:"请粘贴IP,参考格式： (110.34.56.112)，每行一个,多个请回车换行",type:"textarea",rows:"30"},null,8,["modelValue"])]),_:1}),t(e,{xs:2,sm:2,md:2,lg:2,xl:2},{default:s(()=>[f("div",D,[t(h,{type:"primary",size:"default",onClick:v},{default:s(()=>[U,$(" 开始 ")]),_:1})])]),_:1}),t(e,{xs:10,sm:10,md:10,lg:10,xl:10},{default:s(()=>[t(l,{modelValue:p(c),"onUpdate:modelValue":a[1]||(a[1]=d=>m(c)?c.value=d:null),type:"textarea",rows:"30"},null,8,["modelValue"])]),_:1})]),_:1})]),_:1})])),[[I,p(i)]])}}}),G=B(j,[["__scopeId","data-v-963afbeb"]]);export{G as default};
