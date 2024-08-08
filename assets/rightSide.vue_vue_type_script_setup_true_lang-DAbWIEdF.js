
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{d,G as h,l as g,Q as v,R as x,p as S,q as b,r as y,U as u,o as n,b as p,f as l,w as k,y as B,i as e,e as w,g as I,z as T,x as N,F as R,_ as $}from"./index-CHE_Y-qx.js";import{_ as j}from"./tools.vue_vue_type_script_setup_true_lang-VCbCfghy.js";import{u as z}from"./avatar-DyPeL_YJ.js";const C={class:"flex items-center"},D={class:"flex-center gap-1"},E=["src","onerror"],A=d({name:"ToolbarRightSide",__name:"rightSide",setup(F){const i=h(),m=z(),a=g(),t=v(),{t:o}=x(),_=S(b,Function,!0),s=y(!1);return u(()=>t.avatar,()=>{s.value&&(s.value=!1)}),u(()=>m.permissions,r=>{r&&(t.avatar=r)}),(r,P)=>{const c=R,f=$;return n(),p("div",C,[l(j,{mode:"right-side"}),l(f,{items:[[{label:e(_)("route.home",e(a).settings.home.title),handle:()=>e(i).push({path:e(a).settings.home.fullPath}),hide:!e(a).settings.home.enable},{label:e(o)("app.profile"),handle:()=>e(i).push({name:"personalSetting"})},{label:e(o)("app.preferences"),handle:()=>e(N).emit("global-preferences-toggle"),hide:!e(a).settings.userPreferences.enable}],[{label:e(o)("app.logout"),handle:()=>e(t).logout(null)}]],class:"flex-center cursor-pointer px-2"},{default:k(()=>[B("div",D,[e(t).avatar&&!e(s)?(n(),p("img",{key:0,src:e(t).avatar,onerror:()=>s.value=!0,class:"h-[24px] w-[24px] rounded-full"},null,8,E)):(n(),w(c,{key:1,name:"i-carbon:user-avatar-filled-alt",size:24,class:"text-gray-400"})),I(" "+T(e(t).account)+" ",1),l(c,{name:"i-ep:caret-bottom"})])]),_:1},8,["items"])])}}});export{A as _};
