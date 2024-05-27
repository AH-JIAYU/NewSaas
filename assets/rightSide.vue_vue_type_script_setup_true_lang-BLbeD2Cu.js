
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{d,L as h,s as _,Y as g,Z as f,v as b,x as v,r as x,$ as S,o as n,b as i,f as r,w as y,l as k,i as e,e as w,g as B,D as I,C as p,K as T,y as $}from"./index-Cw-g3-rV.js";import{_ as C}from"./tools.vue_vue_type_script_setup_true_lang-DLSjLIxV.js";const D={class:"flex items-center"},N={class:"flex-center gap-1"},V=["src","onerror"],z=d({name:"ToolbarRightSide",__name:"rightSide",setup(j){const l=h(),t=_(),a=g(),{t:s}=f(),u=b(v,Function,!0),o=x(!1);return S(()=>a.avatar,()=>{o.value&&(o.value=!1)}),(E,K)=>{const c=T,m=$;return n(),i("div",D,[r(C,{mode:"right-side"}),r(m,{items:[[{label:e(u)("route.home",e(t).settings.home.title),handle:()=>e(l).push({path:e(t).settings.home.fullPath}),hide:!e(t).settings.home.enable},{label:e(s)("app.profile"),handle:()=>e(l).push({name:"personalSetting"})},{label:e(s)("app.preferences"),handle:()=>e(p).emit("global-preferences-toggle"),hide:!e(t).settings.userPreferences.enable}],[{label:e(s)("app.hotkeys"),handle:()=>e(p).emit("global-hotkeys-intro-toggle"),hide:e(t).mode!=="pc"}],[{label:e(s)("app.logout"),handle:()=>e(a).logout()}]],class:"flex-center cursor-pointer px-2"},{default:y(()=>[k("div",N,[e(a).avatar&&!e(o)?(n(),i("img",{key:0,src:e(a).avatar,onerror:()=>o.value=!0,class:"h-[24px] w-[24px] rounded-full"},null,8,V)):(n(),w(c,{key:1,name:"i-carbon:user-avatar-filled-alt",size:24,class:"text-gray-400"})),B(" "+I(e(a).account)+" ",1),r(c,{name:"i-ep:caret-bottom"})])]),_:1},8,["items"])])}}});export{z as _};
