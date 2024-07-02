
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{d,M as h,q as _,Z as g,$ as f,t as b,v,r as x,a0 as S,o as n,b as i,f as r,w as k,F as y,i as e,e as w,g as B,G as I,E as p,L as T,x as $}from"./index-gu6-sLbe.js";import{_ as E}from"./tools.vue_vue_type_script_setup_true_lang-5B7nvY1l.js";const N={class:"flex items-center"},V={class:"flex-center gap-1"},j=["src","onerror"],R=d({name:"ToolbarRightSide",__name:"rightSide",setup(C){const l=h(),t=_(),a=g(),{t:s}=f(),u=b(v,Function,!0),o=x(!1);return S(()=>a.avatar,()=>{o.value&&(o.value=!1)}),(D,F)=>{const c=T,m=$;return n(),i("div",N,[r(E,{mode:"right-side"}),r(m,{items:[[{label:e(u)("route.home",e(t).settings.home.title),handle:()=>e(l).push({path:e(t).settings.home.fullPath}),hide:!e(t).settings.home.enable},{label:e(s)("app.profile"),handle:()=>e(l).push({name:"personalSetting"})},{label:e(s)("app.preferences"),handle:()=>e(p).emit("global-preferences-toggle"),hide:!e(t).settings.userPreferences.enable}],[{label:e(s)("app.hotkeys"),handle:()=>e(p).emit("global-hotkeys-intro-toggle"),hide:e(t).mode!=="pc"}],[{label:e(s)("app.logout"),handle:()=>e(a).logout(null)}]],class:"flex-center cursor-pointer px-2"},{default:k(()=>[y("div",V,[e(a).avatar&&!e(o)?(n(),i("img",{key:0,src:e(a).avatar,onerror:()=>o.value=!0,class:"h-[24px] w-[24px] rounded-full"},null,8,j)):(n(),w(c,{key:1,name:"i-carbon:user-avatar-filled-alt",size:24,class:"text-gray-400"})),B(" "+I(e(a).account)+" ",1),r(c,{name:"i-ep:caret-bottom"})])]),_:1},8,["items"])])}}});export{R as _};
