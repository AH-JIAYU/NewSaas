
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{k as w,d as y,r as i,a as r,al as b,am as C,i as p,o as V,b as N,f as t,w as a,l as m,F as f,g as $,p as z,aK as k,aL as P,_ as B}from"./index-DtqcPD5G.js";const E={list:o=>w.post("other-ip/get/getIpInfo",o)},S=o=>(k("data-v-c7b91794"),o=o(),P(),o),D={class:"flex-c"},F=S(()=>f("div",{class:"i-material-symbols-light:not-started-outline-rounded h-1.5em w-1.5em"},null,-1)),U=y({name:"OtherFunctionsQueryIpIndex",__name:"list",setup(o){const d=i(!1),l=i([]),c=i("");async function v(){d.value=!0;const _=l.value.split(`
`),s=await E.list({ip:_});d.value=!1;const n=[];s.data.forEach(e=>{n.push(`${e.continent.names.zhCN}-${e.country.names.zhCN}-${e.city.names.zhCN}, IP注册地:${e.registeredCountry.names.zhCN}-${e==null?void 0:e.subdivisions[0].names.zhCN}`)}),c.value=n.join(`
`)}return(_,s)=>{const n=r("el-input"),e=r("el-col"),h=r("el-button"),x=r("el-row"),g=z,I=b("loading");return C((V(),N("div",null,[t(g,null,{default:a(()=>[t(x,{gutter:24},{default:a(()=>[t(e,{xs:10,sm:10,md:10,lg:10,xl:10},{default:a(()=>[t(n,{modelValue:p(l),"onUpdate:modelValue":s[0]||(s[0]=u=>m(l)?l.value=u:null),placeholder:"请粘贴IP,参考格式： (110.34.56.112)，每行一个,多个请回车换行",type:"textarea",rows:"30"},null,8,["modelValue"])]),_:1}),t(e,{xs:2,sm:2,md:2,lg:2,xl:2},{default:a(()=>[f("div",D,[t(h,{type:"primary",size:"default",onClick:v},{default:a(()=>[F,$(" 开始 ")]),_:1})])]),_:1}),t(e,{xs:10,sm:10,md:10,lg:10,xl:10},{default:a(()=>[t(n,{modelValue:p(c),"onUpdate:modelValue":s[1]||(s[1]=u=>m(c)?c.value=u:null),type:"textarea",rows:"30"},null,8,["modelValue"])]),_:1})]),_:1})]),_:1})])),[[I,p(d)]])}}}),K=B(U,[["__scopeId","data-v-c7b91794"]]);export{K as default};
