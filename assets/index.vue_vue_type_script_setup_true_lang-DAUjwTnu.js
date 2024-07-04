
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{d as i,m as a,u,o as l,b as s,y as m,F as f,f as g,j as p,P as b,L as v}from"./index-DtqcPD5G.js";const _={key:0,class:"absolute bottom-0 left-0 w-full translate-y-1/2 text-center"},B=i({name:"SearchBar",__name:"index",props:a({showToggle:{type:Boolean,default:!0},background:{type:Boolean,default:!1}},{fold:{type:Boolean,default:!1},foldModifiers:{}}),emits:a(["toggle"],["update:fold"]),setup(n,{emit:r}){const d=r,e=u(n,"fold");function t(){e.value=!e.value,d("toggle",e.value)}return(o,h)=>{const c=v;return l(),s("div",{class:b(["relative",{"py-4":o.showToggle,"px-4 bg-[var(--g-bg)] transition":o.background}])},[m(o.$slots,"default",{fold:e.value,toggle:t}),o.showToggle?(l(),s("div",_,[f("button",{class:"h-5 inline-flex cursor-pointer select-none items-center border-size-0 rounded bg-[var(--g-bg)] px-2 text-xs font-medium outline-none",onClick:t},[g(c,{name:e.value?"i-ep:caret-bottom":"i-ep:caret-top"},null,8,["name"])])])):p("",!0)],2)}}});export{B as _};
