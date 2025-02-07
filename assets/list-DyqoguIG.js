
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{ad as b,d as N,r as g,a2 as m,al as v,a3 as y,h,a as I,i as P,f as t,w as n,k as x,b as w,c as $,g as z,ai as k,ao as B,aH as E,aI as S,y as q}from"./index-yv3hHHZ6.js";const D={list:a=>b.post("other-ip/getIpInfo",a)},M=a=>(E("data-v-846f1f2b"),a=a(),S(),a),U={class:"flex-c"},j=M(()=>w("div",{class:"i-material-symbols-light:not-started-outline-rounded h-1.5em w-1.5em"},null,-1)),H=N({name:"queryIP",__name:"list",setup(a){const C=g(!1),s=g([]),r=g("");async function V(){try{if(s.value&&s.value.length===0)return k.warning({message:"请至少输入一个IP",center:!0});const c=s.value.split(`
`),o=await D.list({ip:c}),l=[];o.data.forEach(e=>{var i,d,u,p,_;l.push(`${(i=e.continent)==null?void 0:i.names.zhCN}${e.country?"-"+((d=e.country)==null?void 0:d.names.zhCN):""}${e.city?"-"+((u=e.city)==null?void 0:u.names.zhCN):""}, IP注册地:${(p=e.registeredCountry)==null?void 0:p.names.zhCN}${e.subdivisions?"-"+((_=e.subdivisions[0])==null?void 0:_.names.zhCN):""}`)}),r.value=l.join(`
`)}catch(c){console.log(c)}}return(c,o)=>{const l=m("el-input"),e=m("el-col"),i=m("el-button"),d=m("el-row"),u=B,p=v("auth"),_=v("loading");return y((I(),P("div",null,[t(u,null,{default:n(()=>[t(d,{style:{margin:"0"},gutter:24},{default:n(()=>[t(e,{style:{padding:"0"},xs:10,sm:10,md:10,lg:10,xl:10},{default:n(()=>[t(l,{modelValue:h(s),"onUpdate:modelValue":o[0]||(o[0]=f=>x(s)?s.value=f:null),placeholder:"请粘贴IP,参考格式： (110.34.56.112)，每行一个,多个请回车换行",type:"textarea",rows:30},null,8,["modelValue"])]),_:1}),t(e,{xs:2,sm:2,md:2,lg:2,xl:2},{default:n(()=>[w("div",U,[y((I(),$(i,{type:"primary",size:"default",onClick:V},{default:n(()=>[j,z(" 开始 ")]),_:1})),[[p,"queryIP-get-getIpInfo"]])])]),_:1}),t(e,{xs:10,sm:10,md:10,lg:10,xl:10},{default:n(()=>[t(l,{modelValue:h(r),"onUpdate:modelValue":o[1]||(o[1]=f=>x(r)?r.value=f:null),type:"textarea",rows:30},null,8,["modelValue"])]),_:1})]),_:1})]),_:1})])),[[_,h(C)]])}}}),T=q(H,[["__scopeId","data-v-846f1f2b"]]);export{T as default};
