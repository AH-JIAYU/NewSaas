
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{d as f,t as d,M as _,r as x,aq as v,C as m,b as p,f as n,l as t,w,v as g,L as b,ao as h,o as S,g as B,E as N,i as k,K as y,q as l}from"./index-JVwiYWif.js";const C={class:"absolute left-[50%] top-[50%] flex flex-col items-center justify-between lg:flex-row -translate-x-50% -translate-y-50% lg:gap-12"},I={class:"flex flex-col gap-4"},M=t("h1",{class:"m-0 text-6xl font-sans"}," 404 ",-1),R=t("div",{class:"desc mx-0 text-xl text-stone-5"}," 抱歉，你访问的页面不存在 ",-1),V=f({__name:"[...all]",setup(q){const a=g(),c=b(),o=d(),r=_(),e=x({inter:Number.NaN,countdown:5});v(()=>{e.value.inter&&window.clearInterval(e.value.inter)}),m(()=>{o.settings.tabbar.enable&&r.remove(a.meta.activeMenu||a.fullPath),e.value.inter=window.setInterval(()=>{e.value.countdown--,e.value.countdown===0&&(e.value.inter&&window.clearInterval(e.value.inter),s())},1e3)});function s(){c.push(o.settings.home.fullPath)}return(E,L)=>{const i=y,u=h;return S(),p("div",C,[n(i,{name:"404",class:"text-[300px] lg:text-[400px]"}),t("div",I,[M,R,t("div",null,[n(u,{onClick:s},{default:w(()=>[B(N(k(e).countdown)+" 秒后，返回首页 ",1)]),_:1})])])])}}});typeof l=="function"&&l(V);export{V as default};
