
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{d,J as h,y as g,X as v,$ as S,a0 as b,a1 as x,r as y,Z as u,o as n,b as p,f as i,w as k,s as B,i as e,e as w,g as I,A as T,z as $,_ as N,a2 as j}from"./index-FCgaQ8UK.js";import{_ as z}from"./tools.vue_vue_type_script_setup_true_lang-B0_OyB43.js";import{u as A}from"./avatar-Gg_JTmnA.js";const C={class:"flex items-center"},D={class:"flex-center gap-1"},E=["src","onerror"],J=d({name:"ToolbarRightSide",__name:"rightSide",setup(P){const l=h(),m=A(),a=g(),t=v(),{t:o}=S(),_=b(x,Function,!0),s=y(!1);return u(()=>t.avatar,()=>{s.value&&(s.value=!1)}),u(()=>m.permissions,r=>{r&&(t.avatar=r)}),(r,R)=>{const c=N,f=j;return n(),p("div",C,[i(z,{mode:"right-side"}),i(f,{items:[[{label:e(_)("route.home",e(a).settings.home.title),handle:()=>e(l).push({path:e(a).settings.home.fullPath}),hide:!e(a).settings.home.enable},{label:e(o)("app.profile"),handle:()=>e(l).push({name:"personalSetting"})},{label:e(o)("app.preferences"),handle:()=>e($).emit("global-preferences-toggle"),hide:!e(a).settings.userPreferences.enable}],[{label:e(o)("app.logout"),handle:()=>e(t).logout(null)}]],class:"flex-center cursor-pointer px-2"},{default:k(()=>[B("div",D,[e(t).avatar&&!e(s)?(n(),p("img",{key:0,src:e(t).avatar,onerror:()=>s.value=!0,class:"h-[24px] w-[24px] rounded-full"},null,8,E)):(n(),w(c,{key:1,name:"i-carbon:user-avatar-filled-alt",size:24,class:"text-gray-400"})),I(" "+T(e(t).account)+" ",1),i(c,{name:"i-ep:caret-bottom"})])]),_:1},8,["items"])])}}});export{J as _};
