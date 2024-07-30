
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{d as f,q as d,N as _,r as x,au as m,n as v,b as p,f as o,C as t,w,s as g,M as b,as as h,o as N,g as S,D as k,i as B,L as y,ak as l}from"./index-DoiK1_dJ.js";const C={class:"absolute left-[50%] top-[50%] flex flex-col items-center justify-between lg:flex-row -translate-x-50% -translate-y-50% lg:gap-12"},I={class:"flex flex-col gap-4"},M=t("h1",{class:"m-0 text-6xl font-sans"}," 404 ",-1),R=t("div",{class:"desc mx-0 text-xl text-stone-5"}," 抱歉，你访问的页面不存在 ",-1),V=f({__name:"[...all]",setup(D){const a=g(),c=b(),s=d(),r=_(),e=x({inter:Number.NaN,countdown:5});m(()=>{e.value.inter&&window.clearInterval(e.value.inter)}),v(()=>{s.settings.tabbar.enable&&r.remove(a.meta.activeMenu||a.fullPath),e.value.inter=window.setInterval(()=>{e.value.countdown--,e.value.countdown===0&&(e.value.inter&&window.clearInterval(e.value.inter),n())},1e3)});function n(){c.push(s.settings.home.fullPath)}return(L,P)=>{const i=y,u=h;return N(),p("div",C,[o(i,{name:"404",class:"text-[300px] lg:text-[400px]"}),t("div",I,[M,R,t("div",null,[o(u,{onClick:n},{default:w(()=>[S(k(B(e).countdown)+" 秒后，返回首页 ",1)]),_:1})])])])}}});typeof l=="function"&&l(V);export{V as default};
