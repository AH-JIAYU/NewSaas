
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{d,K as h,s as g,X as v,Z as x,x as S,y as b,r as y,$ as u,o as n,b as p,f as i,w as B,q as k,i as e,e as w,g as I,C as T,B as $,J as C,_ as N}from"./index-CyRDEfVX.js";import{_ as j}from"./tools.vue_vue_type_script_setup_true_lang-B2YxyM08.js";import{u as D}from"./avatar-CdQQ4USA.js";const E={class:"flex items-center"},K={class:"flex-center gap-1"},P=["src","onerror"],F=d({name:"ToolbarRightSide",__name:"rightSide",setup(R){const l=h(),m=D(),a=g(),t=v(),{t:o}=x(),_=S(b,Function,!0),s=y(!1);return u(()=>t.avatar,()=>{s.value&&(s.value=!1)}),u(()=>m.permissions,r=>{r&&(t.avatar=r)}),(r,V)=>{const c=C,f=N;return n(),p("div",E,[i(j,{mode:"right-side"}),i(f,{items:[[{label:e(_)("route.home",e(a).settings.home.title),handle:()=>e(l).push({path:e(a).settings.home.fullPath}),hide:!e(a).settings.home.enable},{label:e(o)("app.profile"),handle:()=>e(l).push({name:"personalSetting"})},{label:e(o)("app.preferences"),handle:()=>e($).emit("global-preferences-toggle"),hide:!e(a).settings.userPreferences.enable}],[{label:e(o)("app.logout"),handle:()=>e(t).logout(null)}]],class:"flex-center cursor-pointer px-2"},{default:B(()=>[k("div",K,[e(t).avatar&&!e(s)?(n(),p("img",{key:0,src:e(t).avatar,onerror:()=>s.value=!0,class:"h-[24px] w-[24px] rounded-full"},null,8,P)):(n(),w(c,{key:1,name:"i-carbon:user-avatar-filled-alt",size:24,class:"text-gray-400"})),I(" "+T(e(t).account)+" ",1),i(c,{name:"i-ep:caret-bottom"})])]),_:1},8,["items"])])}}});export{F as _};
