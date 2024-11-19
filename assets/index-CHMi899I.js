
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{a as m}from"./project_settlement-BI968olD.js";import{d as _,r as l,a as r,o as f,b as h,f as s,w as x,y,z as c,L as I}from"./index-BoPGNH9M.js";const w={style:{"margin-top":".625rem"}},V=_({__name:"index",setup(b,{expose:u}){const a=l(!1),t=l({current:0,count:10,percentage:0});let n;async function i(o){o&&(a.value=!0,n=setInterval(async()=>{try{const{data:e}=await m.getSettlementWebSocket(o);console.log("data111",e),e&&e.current!==void 0&&e.count!==void 0?(console.log("data222",e),t.value.current=e.current,t.value.count=e.count,t.value.percentage=e.current/e.count*100,t.value.current===t.value.count&&(clearInterval(n),t.value.percentage=100,setTimeout(()=>{a.value=!1},1e3))):clearInterval(n)}catch(e){console.error("接口请求失败:",e),clearInterval(n)}},500))}const p=new BroadcastChannel("televiseChannel");return p.onmessage=function(){setTimeout(async()=>{console.log(0xa1b01d4b1c7),clearInterval(n),a.value=!1},1e3)},u({showEdit:i}),(o,e)=>{const d=r("el-progress"),v=r("el-dialog");return f(),h("div",null,[s(v,{modelValue:a.value,"onUpdate:modelValue":e[0]||(e[0]=g=>a.value=g),title:"进度详情",width:"500"},{default:x(()=>[s(d,{percentage:t.value.percentage,"text-inside":!0,status:t.value.percentage===100?"success":"warning"},null,8,["percentage","status"]),y("p",w,"任务进度: "+c(t.value.current)+"/"+c(t.value.count),1)]),_:1},8,["modelValue"])])}}}),k=I(V,[["__scopeId","data-v-751c5289"]]);export{k as default};
