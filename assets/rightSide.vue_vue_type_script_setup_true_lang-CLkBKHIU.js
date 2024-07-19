
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{d as m,M as _,p as d,$ as f,a0 as h,s as g,t as v,r as b,a1 as x,o,b as i,f as r,w as S,C as B,i as e,e as k,g as w,D as y,B as I,L as T,_ as $}from"./index-fxwsKnso.js";import{_ as C}from"./tools.vue_vue_type_script_setup_true_lang-RSuAK0Hw.js";const D={class:"flex items-center"},N={class:"flex-center gap-1"},V=["src","onerror"],z=m({name:"ToolbarRightSide",__name:"rightSide",setup(j){const l=_(),a=d(),t=f(),{t:n}=h(),u=g(v,Function,!0),s=b(!1);return x(()=>t.avatar,()=>{s.value&&(s.value=!1)}),(E,M)=>{const c=T,p=$;return o(),i("div",D,[r(C,{mode:"right-side"}),r(p,{items:[[{label:e(u)("route.home",e(a).settings.home.title),handle:()=>e(l).push({path:e(a).settings.home.fullPath}),hide:!e(a).settings.home.enable},{label:e(n)("app.profile"),handle:()=>e(l).push({name:"personalSetting"})},{label:e(n)("app.preferences"),handle:()=>e(I).emit("global-preferences-toggle"),hide:!e(a).settings.userPreferences.enable}],[{label:e(n)("app.logout"),handle:()=>e(t).logout(null)}]],class:"flex-center cursor-pointer px-2"},{default:S(()=>[B("div",N,[e(t).avatar&&!e(s)?(o(),i("img",{key:0,src:e(t).avatar,onerror:()=>s.value=!0,class:"h-[24px] w-[24px] rounded-full"},null,8,V)):(o(),k(c,{key:1,name:"i-carbon:user-avatar-filled-alt",size:24,class:"text-gray-400"})),w(" "+y(e(t).account)+" ",1),r(c,{name:"i-ep:caret-bottom"})])]),_:1},8,["items"])])}}});export{z as _};
