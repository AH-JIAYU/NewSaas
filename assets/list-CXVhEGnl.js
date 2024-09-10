
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{x as I,d as w,r as f,a as m,p as C,q as V,i as g,o as N,b as $,f as t,w as l,I as v,s as h,g as b,E as z,ap as P,aG as E,aH as k,R as B}from"./index-DcVBZRhf.js";const S={list:s=>I.post("other-ip/getIpInfo",s)},q=s=>(E("data-v-0911c69f"),s=s(),k(),s),D={class:"flex-c"},M=q(()=>h("div",{class:"i-material-symbols-light:not-started-outline-rounded h-1.5em w-1.5em"},null,-1)),R=w({name:"queryIP",__name:"list",setup(s){const y=f(!1),o=f([]),c=f("");async function x(){try{if(o.value&&o.value.length===0)return z.warning({message:"请至少输入一个IP",center:!0});const i=o.value.split(`
`),a=await S.list({ip:i}),r=[];a.data.forEach(e=>{var d,u,p,_,n;r.push(`${(d=e.continent)==null?void 0:d.names.zhCN}${e.country?"-"+((u=e.country)==null?void 0:u.names.zhCN):""}${e.city?"-"+((p=e.city)==null?void 0:p.names.zhCN):""}, IP注册地:${(_=e.registeredCountry)==null?void 0:_.names.zhCN}${e.subdivisions?"-"+((n=e.subdivisions[0])==null?void 0:n.names.zhCN):""}`)}),c.value=r.join(`
`)}catch(i){console.log(i)}}return(i,a)=>{const r=m("el-input"),e=m("el-col"),d=m("el-button"),u=m("el-row"),p=P,_=C("loading");return V((N(),$("div",null,[t(p,null,{default:l(()=>[t(u,{style:{margin:"0"},gutter:24},{default:l(()=>[t(e,{style:{padding:"0"},xs:10,sm:10,md:10,lg:10,xl:10},{default:l(()=>[t(r,{modelValue:g(o),"onUpdate:modelValue":a[0]||(a[0]=n=>v(o)?o.value=n:null),placeholder:"请粘贴IP,参考格式： (110.34.56.112)，每行一个,多个请回车换行",type:"textarea",rows:30},null,8,["modelValue"])]),_:1}),t(e,{xs:2,sm:2,md:2,lg:2,xl:2},{default:l(()=>[h("div",D,[t(d,{type:"primary",size:"default",onClick:x},{default:l(()=>[M,b(" 开始 ")]),_:1})])]),_:1}),t(e,{xs:10,sm:10,md:10,lg:10,xl:10},{default:l(()=>[t(r,{modelValue:g(c),"onUpdate:modelValue":a[1]||(a[1]=n=>v(c)?c.value=n:null),type:"textarea",rows:30},null,8,["modelValue"])]),_:1})]),_:1})]),_:1})])),[[_,g(y)]])}}}),j=B(R,[["__scopeId","data-v-0911c69f"]]);export{j as default};
