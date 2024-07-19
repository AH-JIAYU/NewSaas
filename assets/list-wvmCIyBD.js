
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{k as w,d as y,r as i,a as r,al as C,am as b,i as p,o as V,b as N,f as o,w as s,G as m,C as f,g as $,ak as z,aK as k,aL as P,P as B}from"./index-Dm70kv03.js";const E={list:t=>w.post("other-ip/get/getIpInfo",t)},S=t=>(k("data-v-75ba2ea3"),t=t(),P(),t),D={class:"flex-c"},U=S(()=>f("div",{class:"i-material-symbols-light:not-started-outline-rounded h-1.5em w-1.5em"},null,-1)),j=y({name:"OtherFunctionsQueryIpIndex",__name:"list",setup(t){const d=i(!1),l=i([]),c=i("");async function v(){d.value=!0;const _=l.value.split(`
`),a=await E.list({ip:_});console.log("res",a),d.value=!1;const n=[];a.data.forEach(e=>{n.push(`${e.continent.names.zhCN}-${e.country.names.zhCN}-${e.city.names.zhCN}, IP注册地:${e.registeredCountry.names.zhCN}-${e==null?void 0:e.subdivisions[0].names.zhCN}`)}),c.value=n.join(`
`)}return(_,a)=>{const n=r("el-input"),e=r("el-col"),h=r("el-button"),g=r("el-row"),x=z,I=C("loading");return b((V(),N("div",null,[o(x,null,{default:s(()=>[o(g,{gutter:24},{default:s(()=>[o(e,{xs:10,sm:10,md:10,lg:10,xl:10},{default:s(()=>[o(n,{modelValue:p(l),"onUpdate:modelValue":a[0]||(a[0]=u=>m(l)?l.value=u:null),placeholder:"请粘贴IP,参考格式： (110.34.56.112)，每行一个,多个请回车换行",type:"textarea",rows:"30"},null,8,["modelValue"])]),_:1}),o(e,{xs:2,sm:2,md:2,lg:2,xl:2},{default:s(()=>[f("div",D,[o(h,{type:"primary",size:"default",onClick:v},{default:s(()=>[U,$(" 开始 ")]),_:1})])]),_:1}),o(e,{xs:10,sm:10,md:10,lg:10,xl:10},{default:s(()=>[o(n,{modelValue:p(c),"onUpdate:modelValue":a[1]||(a[1]=u=>m(c)?c.value=u:null),type:"textarea",rows:"30"},null,8,["modelValue"])]),_:1})]),_:1})]),_:1})])),[[I,p(d)]])}}}),G=B(j,[["__scopeId","data-v-75ba2ea3"]]);export{G as default};
