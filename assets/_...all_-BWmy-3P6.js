
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{d as f,q as d,L as _,r as x,as as m,n as v,b as p,f as o,A as t,w,s as g,K as b,aq as h,o as B,g as S,B as N,i as k,J as y,ai as l}from"./index-6I3CLwp1.js";const I={class:"absolute left-[50%] top-[50%] flex flex-col items-center justify-between lg:flex-row -translate-x-50% -translate-y-50% lg:gap-12"},C={class:"flex flex-col gap-4"},R=t("h1",{class:"m-0 text-6xl font-sans"}," 404 ",-1),V=t("div",{class:"desc mx-0 text-xl text-stone-5"}," 抱歉，你访问的页面不存在 ",-1),q=f({__name:"[...all]",setup(L){const a=g(),c=b(),s=d(),r=_(),e=x({inter:Number.NaN,countdown:5});m(()=>{e.value.inter&&window.clearInterval(e.value.inter)}),v(()=>{s.settings.tabbar.enable&&r.remove(a.meta.activeMenu||a.fullPath),e.value.inter=window.setInterval(()=>{e.value.countdown--,e.value.countdown===0&&(e.value.inter&&window.clearInterval(e.value.inter),n())},1e3)});function n(){c.push(s.settings.home.fullPath)}return(M,P)=>{const i=y,u=h;return B(),p("div",I,[o(i,{name:"404",class:"text-[300px] lg:text-[400px]"}),t("div",C,[R,V,t("div",null,[o(u,{onClick:n},{default:w(()=>[S(N(k(e).countdown)+" 秒后，返回首页 ",1)]),_:1})])])])}}});typeof l=="function"&&l(q);export{q as default};
