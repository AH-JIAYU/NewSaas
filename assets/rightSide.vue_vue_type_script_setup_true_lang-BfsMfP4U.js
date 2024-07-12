
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{d as m,P as _,t as d,a1 as f,a2 as h,x as g,y as v,r as x,a3 as b,o,b as i,f as r,w as S,I as y,i as e,e as k,g as w,J as B,H as I,O as T,z as N}from"./index-D7X-4r4C.js";import{_ as P}from"./tools.vue_vue_type_script_setup_true_lang-Chfy2_0m.js";const V={class:"flex items-center"},$={class:"flex-center gap-1"},j=["src","onerror"],R=m({name:"ToolbarRightSide",__name:"rightSide",setup(z){const l=_(),a=d(),t=f(),{t:n}=h(),u=g(v,Function,!0),s=x(!1);return b(()=>t.avatar,()=>{s.value&&(s.value=!1)}),(C,D)=>{const c=T,p=N;return o(),i("div",V,[r(P,{mode:"right-side"}),r(p,{items:[[{label:e(u)("route.home",e(a).settings.home.title),handle:()=>e(l).push({path:e(a).settings.home.fullPath}),hide:!e(a).settings.home.enable},{label:e(n)("app.profile"),handle:()=>e(l).push({name:"personalSetting"})},{label:e(n)("app.preferences"),handle:()=>e(I).emit("global-preferences-toggle"),hide:!e(a).settings.userPreferences.enable}],[{label:e(n)("app.logout"),handle:()=>e(t).logout(null)}]],class:"flex-center cursor-pointer px-2"},{default:S(()=>[y("div",$,[e(t).avatar&&!e(s)?(o(),i("img",{key:0,src:e(t).avatar,onerror:()=>s.value=!0,class:"h-[24px] w-[24px] rounded-full"},null,8,j)):(o(),k(c,{key:1,name:"i-carbon:user-avatar-filled-alt",size:24,class:"text-gray-400"})),w(" "+B(e(t).account)+" ",1),r(c,{name:"i-ep:caret-bottom"})])]),_:1},8,["items"])])}}});export{R as _};
