
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{d,M as h,p as g,$ as v,a0 as S,s as b,t as x,r as B,a1 as u,o as n,b as p,f as i,w as k,C as y,i as e,e as w,g as I,D as T,B as $,L as C,_ as D}from"./index-DZI9-0T5.js";import{_ as N}from"./tools.vue_vue_type_script_setup_true_lang-ByqfUBwi.js";import{u as j}from"./avatar-BDoqVtB2.js";const E={class:"flex items-center"},M={class:"flex-center gap-1"},P=["src","onerror"],H=d({name:"ToolbarRightSide",__name:"rightSide",setup(R){const l=h(),m=j(),a=g(),t=v(),{t:o}=S(),_=b(x,Function,!0),s=B(!1);return u(()=>t.avatar,()=>{s.value&&(s.value=!1)}),u(()=>m.permissions,r=>{r&&(t.avatar=r)}),(r,V)=>{const c=C,f=D;return n(),p("div",E,[i(N,{mode:"right-side"}),i(f,{items:[[{label:e(_)("route.home",e(a).settings.home.title),handle:()=>e(l).push({path:e(a).settings.home.fullPath}),hide:!e(a).settings.home.enable},{label:e(o)("app.profile"),handle:()=>e(l).push({name:"personalSetting"})},{label:e(o)("app.preferences"),handle:()=>e($).emit("global-preferences-toggle"),hide:!e(a).settings.userPreferences.enable}],[{label:e(o)("app.logout"),handle:()=>e(t).logout(null)}]],class:"flex-center cursor-pointer px-2"},{default:k(()=>[y("div",M,[e(t).avatar&&!e(s)?(n(),p("img",{key:0,src:e(t).avatar,onerror:()=>s.value=!0,class:"h-[24px] w-[24px] rounded-full"},null,8,P)):(n(),w(c,{key:1,name:"i-carbon:user-avatar-filled-alt",size:24,class:"text-gray-400"})),I(" "+T(e(t).account)+" ",1),i(c,{name:"i-ep:caret-bottom"})])]),_:1},8,["items"])])}}});export{H as _};
