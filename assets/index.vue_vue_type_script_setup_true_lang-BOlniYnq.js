
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import V from"./index-DrJCV5vn.js";import{d as w,r as l,a0 as D,a as c,o as r,b as f,f as i,w as m,g as L,F as d,n as B,e as E,ak as R}from"./index-DQumISPN.js";const M=w({__name:"index",props:{leftTabsData:Array,validateTopTabs:Array},setup(T){const p=T,v=l(),e=l(p.leftTabsData),_=l(p.validateTopTabs);e.value.forEach((a,t)=>{const s=l(null);D(`formRef${t}`,s)});const b=l(0),n=l(0),h={name:"新建项目",platform:{},screen:{},security:{}};function x(){const a=R(e.value[0]);n.value=++b.value,e.value.push({...h,client:v.value,await:a.await,multi:a.multi})}function g(a){e.value.splice(a,1),_.value.splice(a,1),n.value>=e.value.length&&(n.value=Math.max(0,e.value.length-1),b.value=Math.max(0,e.value.length-1))}function k(a){e.value.forEach(t=>{t.client=a}),v.value=a}return(a,t)=>{const s=c("el-button"),y=c("el-tab-pane"),C=c("el-tabs");return r(),f(d,null,[i(s,{onClick:t[0]||(t[0]=o=>x())},{default:m(()=>[L(" 添加子项目 ")]),_:1}),i(C,{modelValue:n.value,"onUpdate:modelValue":t[1]||(t[1]=o=>n.value=o),"tab-position":"left",onTabRemove:g},{default:m(()=>[(r(!0),f(d,null,B(e.value,(o,u)=>(r(),E(y,{key:u,closable:e.value.length!==1,label:o.name,name:u},{default:m(()=>[i(V,{"left-tab":o,"tab-index":u,onSetClient:k},null,8,["left-tab","tab-index"])]),_:2},1032,["closable","label","name"]))),128))]),_:1},8,["modelValue"])],64)}}});export{M as _};
