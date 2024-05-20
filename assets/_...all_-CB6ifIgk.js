
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{d as f,s as d,L as _,t as x,M as p,r as m,ap as v,B as w,b as g,f as o,l as t,w as b,an as h,o as B,g as S,D as N,i as k,K as y,p as l}from"./index-BgF8AKrH.js";const I={class:"absolute left-[50%] top-[50%] flex flex-col items-center justify-between lg:flex-row -translate-x-50% -translate-y-50% lg:gap-12"},C={class:"flex flex-col gap-4"},M=t("h1",{class:"m-0 text-6xl font-sans"}," 404 ",-1),R=t("div",{class:"desc mx-0 text-xl text-stone-5"}," 抱歉，你访问的页面不存在 ",-1),V=f({__name:"[...all]",setup(D){const a=d(),c=_(),s=x(),r=p(),e=m({inter:Number.NaN,countdown:5});v(()=>{e.value.inter&&window.clearInterval(e.value.inter)}),w(()=>{s.settings.tabbar.enable&&r.remove(a.meta.activeMenu||a.fullPath),e.value.inter=window.setInterval(()=>{e.value.countdown--,e.value.countdown===0&&(e.value.inter&&window.clearInterval(e.value.inter),n())},1e3)});function n(){c.push(s.settings.home.fullPath)}return(L,P)=>{const i=y,u=h;return B(),g("div",I,[o(i,{name:"404",class:"text-[300px] lg:text-[400px]"}),t("div",C,[M,R,t("div",null,[o(u,{onClick:n},{default:b(()=>[S(N(k(e).countdown)+" 秒后，返回首页 ",1)]),_:1})])])])}}});typeof l=="function"&&l(V);export{V as default};
