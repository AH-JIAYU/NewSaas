
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{d,N as h,x as g,a0 as v,a1 as x,z as S,A as b,r as k,a2 as u,o as n,b as p,f as i,w as y,p as B,i as e,e as w,g as I,G as N,D as T,M as D,_ as $}from"./index-BQjh9Koe.js";import{_ as j}from"./tools.vue_vue_type_script_setup_true_lang-ocqK2eXH.js";import{u as z}from"./avatar-CeetY5u2.js";const A={class:"flex items-center"},C={class:"flex-center gap-1"},E=["src","onerror"],G=d({name:"ToolbarRightSide",__name:"rightSide",setup(M){const l=h(),m=z(),a=g(),t=v(),{t:o}=x(),_=S(b,Function,!0),s=k(!1);return u(()=>t.avatar,()=>{s.value&&(s.value=!1)}),u(()=>m.permissions,r=>{r&&(t.avatar=r)}),(r,P)=>{const c=D,f=$;return n(),p("div",A,[i(j,{mode:"right-side"}),i(f,{items:[[{label:e(_)("route.home",e(a).settings.home.title),handle:()=>e(l).push({path:e(a).settings.home.fullPath}),hide:!e(a).settings.home.enable},{label:e(o)("app.profile"),handle:()=>e(l).push({name:"personalSetting"})},{label:e(o)("app.preferences"),handle:()=>e(T).emit("global-preferences-toggle"),hide:!e(a).settings.userPreferences.enable}],[{label:e(o)("app.logout"),handle:()=>e(t).logout(null)}]],class:"flex-center cursor-pointer px-2"},{default:y(()=>[B("div",C,[e(t).avatar&&!e(s)?(n(),p("img",{key:0,src:e(t).avatar,onerror:()=>s.value=!0,class:"h-[24px] w-[24px] rounded-full"},null,8,E)):(n(),w(c,{key:1,name:"i-carbon:user-avatar-filled-alt",size:24,class:"text-gray-400"})),I(" "+N(e(t).account)+" ",1),i(c,{name:"i-ep:caret-bottom"})])]),_:1},8,["items"])])}}});export{G as _};
