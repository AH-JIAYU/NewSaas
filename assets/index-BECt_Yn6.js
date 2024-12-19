
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{a as g}from"./project_settlement-BAHxo6tk.js";import{d as _,r as o,a as s,o as f,b as h,f as l,w as x,y,z as c,L as I}from"./index-DqfN6Hiv.js";const w={style:{"margin-top":".625rem"}},V=_({__name:"index",setup(b,{expose:u}){const a=o(!1),t=o({current:0,count:10,percentage:0});let n;async function i(r){r&&(a.value=!0,n=setInterval(async()=>{try{const{data:e}=await g.getSettlementWebSocket(r);e&&e.current!==void 0&&e.count!==void 0?(t.value.current=e.current,t.value.count=e.count,t.value.percentage=e.current/e.count*100,t.value.current===t.value.count&&(clearInterval(n),t.value.percentage=100,setTimeout(()=>{a.value=!1},1e3))):clearInterval(n)}catch(e){console.error("接口请求失败:",e),clearInterval(n)}},500))}const p=new BroadcastChannel("televiseChannel");return p.onmessage=function(){setTimeout(async()=>{clearInterval(n),a.value=!1},1e3)},u({showEdit:i}),(r,e)=>{const d=s("el-progress"),v=s("el-dialog");return f(),h("div",null,[l(v,{modelValue:a.value,"onUpdate:modelValue":e[0]||(e[0]=m=>a.value=m),title:"进度详情",width:"500"},{default:x(()=>[l(d,{percentage:t.value.percentage,"text-inside":!0,status:t.value.percentage===100?"success":"warning"},null,8,["percentage","status"]),y("p",w,"任务进度: "+c(t.value.current)+"/"+c(t.value.count),1)]),_:1},8,["modelValue"])])}}}),k=I(V,[["__scopeId","data-v-00d76aee"]]);export{k as default};
