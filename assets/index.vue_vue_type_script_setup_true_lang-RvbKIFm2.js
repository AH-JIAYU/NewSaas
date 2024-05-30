
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import T from"./index-EjNuYrny.js";import{d as D,r as l,a0 as L,a as i,o as s,b as r,F as _,f as b,w as v,g as B,n as E,e as h,al as R}from"./index-BtNrG_gL.js";const M=D({__name:"index",props:{leftTabsData:Array,validateTopTabs:Array},setup(g){const f=g,m=l(),e=l(f.leftTabsData),k=l(f.validateTopTabs);e.value.forEach((a,t)=>{const u=l(null);L(`formRef${t}`,u)});const p=l(0),n=l(0),x={name:"客户名称",platform:{},screen:{},security:{}};function y(){const a=R(e.value[0]);n.value=++p.value,e.value.push({...x,client:m.value,await:a.await,multi:a.multi})}function C(a){e.value.splice(a,1),k.value.splice(a,1),n.value>=e.value.length&&(n.value=Math.max(0,e.value.length-1),p.value=Math.max(0,e.value.length-1))}function d(a){e.value.forEach(t=>{t.client=a}),m.value=a}return(a,t)=>{const u=i("el-button"),V=i("el-tab-pane"),w=i("el-tabs");return s(),r("div",null,[e.value[0].id?(s(),h(T,{key:1,"left-tab":e.value[0],onSetClient:d},null,8,["left-tab"])):(s(),r(_,{key:0},[b(u,{class:"button",disabled:e.value.length>9,onClick:t[0]||(t[0]=o=>y())},{default:v(()=>[B(" 新增客户 ")]),_:1},8,["disabled"]),b(w,{modelValue:n.value,"onUpdate:modelValue":t[1]||(t[1]=o=>n.value=o),"tab-position":"left",onTabRemove:C},{default:v(()=>[(s(!0),r(_,null,E(e.value,(o,c)=>(s(),h(V,{key:c,closable:e.value.length!==1,label:o.name,name:c},{default:v(()=>[b(T,{"left-tab":o,"tab-index":c,onSetClient:d},null,8,["left-tab","tab-index"])]),_:2},1032,["closable","label","name"]))),128))]),_:1},8,["modelValue"])],64))])}}});export{M as _};
