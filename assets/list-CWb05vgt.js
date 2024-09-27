
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{a as I,d as w,r as f,b as m,q as C,s as V,j as g,o as N,e as $,g as t,w as l,I as h,t as v,h as b,E as z,ap as P,aI as E,aJ as k,R as B}from"./index-BE-pxncy.js";const S={list:s=>I.post("other-ip/getIpInfo",s)},j=s=>(E("data-v-0911c69f"),s=s(),k(),s),q={class:"flex-c"},D=j(()=>v("div",{class:"i-material-symbols-light:not-started-outline-rounded h-1.5em w-1.5em"},null,-1)),M=w({name:"queryIP",__name:"list",setup(s){const y=f(!1),o=f([]),c=f("");async function x(){try{if(o.value&&o.value.length===0)return z.warning({message:"请至少输入一个IP",center:!0});const i=o.value.split(`
`),a=await S.list({ip:i}),r=[];a.data.forEach(e=>{var d,u,p,_,n;r.push(`${(d=e.continent)==null?void 0:d.names.zhCN}${e.country?"-"+((u=e.country)==null?void 0:u.names.zhCN):""}${e.city?"-"+((p=e.city)==null?void 0:p.names.zhCN):""}, IP注册地:${(_=e.registeredCountry)==null?void 0:_.names.zhCN}${e.subdivisions?"-"+((n=e.subdivisions[0])==null?void 0:n.names.zhCN):""}`)}),c.value=r.join(`
`)}catch(i){console.log(i)}}return(i,a)=>{const r=m("el-input"),e=m("el-col"),d=m("el-button"),u=m("el-row"),p=P,_=C("loading");return V((N(),$("div",null,[t(p,null,{default:l(()=>[t(u,{style:{margin:"0"},gutter:24},{default:l(()=>[t(e,{style:{padding:"0"},xs:10,sm:10,md:10,lg:10,xl:10},{default:l(()=>[t(r,{modelValue:g(o),"onUpdate:modelValue":a[0]||(a[0]=n=>h(o)?o.value=n:null),placeholder:"请粘贴IP,参考格式： (110.34.56.112)，每行一个,多个请回车换行",type:"textarea",rows:30},null,8,["modelValue"])]),_:1}),t(e,{xs:2,sm:2,md:2,lg:2,xl:2},{default:l(()=>[v("div",q,[t(d,{type:"primary",size:"default",onClick:x},{default:l(()=>[D,b(" 开始 ")]),_:1})])]),_:1}),t(e,{xs:10,sm:10,md:10,lg:10,xl:10},{default:l(()=>[t(r,{modelValue:g(c),"onUpdate:modelValue":a[1]||(a[1]=n=>h(c)?c.value=n:null),type:"textarea",rows:30},null,8,["modelValue"])]),_:1})]),_:1})]),_:1})])),[[_,g(y)]])}}}),U=B(M,[["__scopeId","data-v-0911c69f"]]);export{U as default};
