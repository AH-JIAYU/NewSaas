
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{d as f,s as d,L as _,r as x,at as v,l as m,b as p,f as n,q as t,w,v as g,K as b,ar as h,o as S,g as B,C as N,i as k,J as y,al as l}from"./index-CyRDEfVX.js";const C={class:"absolute left-[50%] top-[50%] flex flex-col items-center justify-between lg:flex-row -translate-x-50% -translate-y-50% lg:gap-12"},I={class:"flex flex-col gap-4"},R=t("h1",{class:"m-0 text-6xl font-sans"}," 404 ",-1),V=t("div",{class:"desc mx-0 text-xl text-stone-5"}," 抱歉，你访问的页面不存在 ",-1),L=f({__name:"[...all]",setup(M){const a=g(),c=b(),s=d(),r=_(),e=x({inter:Number.NaN,countdown:5});v(()=>{e.value.inter&&window.clearInterval(e.value.inter)}),m(()=>{s.settings.tabbar.enable&&r.remove(a.meta.activeMenu||a.fullPath),e.value.inter=window.setInterval(()=>{e.value.countdown--,e.value.countdown===0&&(e.value.inter&&window.clearInterval(e.value.inter),o())},1e3)});function o(){c.push(s.settings.home.fullPath)}return(P,T)=>{const i=y,u=h;return S(),p("div",C,[n(i,{name:"404",class:"text-[300px] lg:text-[400px]"}),t("div",I,[R,V,t("div",null,[n(u,{onClick:o},{default:w(()=>[B(N(k(e).countdown)+" 秒后，返回首页 ",1)]),_:1})])])])}}});typeof l=="function"&&l(L);export{L as default};
