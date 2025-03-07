
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{k as b,d as N,r as g,a as m,q as h,s as y,i as v,o as I,b as P,f as t,w as n,B as x,v as w,e as $,g as z,E as k,ao as B,aI as E,aJ as q,M}from"./index-fxjDEbzK.js";const S={list:s=>b.post("other-ip/getIpInfo",s)},D=s=>(E("data-v-846f1f2b"),s=s(),q(),s),U={class:"flex-c"},j=D(()=>w("div",{class:"i-material-symbols-light:not-started-outline-rounded h-1.5em w-1.5em"},null,-1)),J=N({name:"queryIP",__name:"list",setup(s){const C=g(!1),o=g([]),r=g("");async function V(){try{if(o.value&&o.value.length===0)return k.warning({message:"请至少输入一个IP",center:!0});const c=o.value.split(`
`),a=await S.list({ip:c}),l=[];a.data.forEach(e=>{var i,u,d,p,_;l.push(`${(i=e.continent)==null?void 0:i.names.zhCN}${e.country?"-"+((u=e.country)==null?void 0:u.names.zhCN):""}${e.city?"-"+((d=e.city)==null?void 0:d.names.zhCN):""}, IP注册地:${(p=e.registeredCountry)==null?void 0:p.names.zhCN}${e.subdivisions?"-"+((_=e.subdivisions[0])==null?void 0:_.names.zhCN):""}`)}),r.value=l.join(`
`)}catch(c){console.log(c)}}return(c,a)=>{const l=m("el-input"),e=m("el-col"),i=m("el-button"),u=m("el-row"),d=B,p=h("auth"),_=h("loading");return y((I(),P("div",null,[t(d,null,{default:n(()=>[t(u,{style:{margin:"0"},gutter:24},{default:n(()=>[t(e,{style:{padding:"0"},xs:10,sm:10,md:10,lg:10,xl:10},{default:n(()=>[t(l,{modelValue:v(o),"onUpdate:modelValue":a[0]||(a[0]=f=>x(o)?o.value=f:null),placeholder:"请粘贴IP,参考格式： (110.34.56.112)，每行一个,多个请回车换行",type:"textarea",rows:30},null,8,["modelValue"])]),_:1}),t(e,{xs:2,sm:2,md:2,lg:2,xl:2},{default:n(()=>[w("div",U,[y((I(),$(i,{type:"primary",size:"default",onClick:V},{default:n(()=>[j,z(" 开始 ")]),_:1})),[[p,"queryIP-get-getIpInfo"]])])]),_:1}),t(e,{xs:10,sm:10,md:10,lg:10,xl:10},{default:n(()=>[t(l,{modelValue:v(r),"onUpdate:modelValue":a[1]||(a[1]=f=>x(r)?r.value=f:null),type:"textarea",rows:30},null,8,["modelValue"])]),_:1})]),_:1})]),_:1})])),[[_,v(C)]])}}}),T=M(J,[["__scopeId","data-v-846f1f2b"]]);export{T as default};
