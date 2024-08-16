
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{d,O as h,y as g,a1 as v,a2 as S,A as b,B as x,r as y,a3 as u,o as n,b as p,f as i,w as B,s as k,i as e,e as w,g as I,H as N,G as T,N as $,_ as j}from"./index-CedPcfav.js";import{_ as A}from"./tools.vue_vue_type_script_setup_true_lang-DqqkKi4x.js";import{u as C}from"./avatar-BEiinBk7.js";const D={class:"flex items-center"},E={class:"flex-center gap-1"},H=["src","onerror"],G=d({name:"ToolbarRightSide",__name:"rightSide",setup(P){const l=h(),m=C(),a=g(),t=v(),{t:o}=S(),_=b(x,Function,!0),s=y(!1);return u(()=>t.avatar,()=>{s.value&&(s.value=!1)}),u(()=>m.permissions,r=>{r&&(t.avatar=r)}),(r,R)=>{const c=$,f=j;return n(),p("div",D,[i(A,{mode:"right-side"}),i(f,{items:[[{label:e(_)("route.home",e(a).settings.home.title),handle:()=>e(l).push({path:e(a).settings.home.fullPath}),hide:!e(a).settings.home.enable},{label:e(o)("app.profile"),handle:()=>e(l).push({name:"personalSetting"})},{label:e(o)("app.preferences"),handle:()=>e(T).emit("global-preferences-toggle"),hide:!e(a).settings.userPreferences.enable}],[{label:e(o)("app.logout"),handle:()=>e(t).logout(null)}]],class:"flex-center cursor-pointer px-2"},{default:B(()=>[k("div",E,[e(t).avatar&&!e(s)?(n(),p("img",{key:0,src:e(t).avatar,onerror:()=>s.value=!0,class:"h-[24px] w-[24px] rounded-full"},null,8,H)):(n(),w(c,{key:1,name:"i-carbon:user-avatar-filled-alt",size:24,class:"text-gray-400"})),I(" "+N(e(t).account)+" ",1),i(c,{name:"i-ep:caret-bottom"})])]),_:1},8,["items"])])}}});export{G as _};
