
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{d,I as h,v as g,W as v,Z as x,$ as S,a0 as b,r as y,X as u,o as n,b as p,f as i,w as k,y as B,i as e,e as I,g as w,z as T,x as $,_ as N,a1 as j}from"./index-jCl6XbW_.js";import{_ as z}from"./tools.vue_vue_type_script_setup_true_lang-PmJWSB9M.js";import{u as C}from"./avatar-D6euJ0ZE.js";const D={class:"flex items-center"},E={class:"flex-center gap-1"},P=["src","onerror"],K=d({name:"ToolbarRightSide",__name:"rightSide",setup(R){const l=h(),m=C(),a=g(),t=v(),{t:o}=x(),_=S(b,Function,!0),s=y(!1);return u(()=>t.avatar,()=>{s.value&&(s.value=!1)}),u(()=>m.permissions,r=>{r&&(t.avatar=r)}),(r,V)=>{const c=N,f=j;return n(),p("div",D,[i(z,{mode:"right-side"}),i(f,{items:[[{label:e(_)("route.home",e(a).settings.home.title),handle:()=>e(l).push({path:e(a).settings.home.fullPath}),hide:!e(a).settings.home.enable},{label:e(o)("app.profile"),handle:()=>e(l).push({name:"personalSetting"})},{label:e(o)("app.preferences"),handle:()=>e($).emit("global-preferences-toggle"),hide:!e(a).settings.userPreferences.enable}],[{label:e(o)("app.logout"),handle:()=>e(t).logout(null)}]],class:"flex-center cursor-pointer px-2"},{default:k(()=>[B("div",E,[e(t).avatar&&!e(s)?(n(),p("img",{key:0,src:e(t).avatar,onerror:()=>s.value=!0,class:"h-[24px] w-[24px] rounded-full"},null,8,P)):(n(),I(c,{key:1,name:"i-carbon:user-avatar-filled-alt",size:24,class:"text-gray-400"})),w(" "+T(e(t).account)+" ",1),i(c,{name:"i-ep:caret-bottom"})])]),_:1},8,["items"])])}}});export{K as _};
