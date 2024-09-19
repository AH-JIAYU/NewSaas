
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{d as f,y as d,P as _,r as x,au as m,l as v,e as p,g as n,t,w,z as g,O as h,as as b,o as N,h as S,H as B,j as k,N as y,ao as l}from"./index-BOIe6JP6.js";const I={class:"absolute left-[50%] top-[50%] flex flex-col items-center justify-between lg:flex-row -translate-x-50% -translate-y-50% lg:gap-12"},C={class:"flex flex-col gap-4"},P=t("h1",{class:"m-0 text-6xl font-sans"}," 404 ",-1),R=t("div",{class:"desc mx-0 text-xl text-stone-5"}," 抱歉，你访问的页面不存在 ",-1),V=f({__name:"[...all]",setup(j){const a=g(),c=h(),o=d(),r=_(),e=x({inter:Number.NaN,countdown:5});m(()=>{e.value.inter&&window.clearInterval(e.value.inter)}),v(()=>{o.settings.tabbar.enable&&r.remove(a.meta.activeMenu||a.fullPath),e.value.inter=window.setInterval(()=>{e.value.countdown--,e.value.countdown===0&&(e.value.inter&&window.clearInterval(e.value.inter),s())},1e3)});function s(){c.push(o.settings.home.fullPath)}return(H,M)=>{const u=y,i=b;return N(),p("div",I,[n(u,{name:"404",class:"text-[300px] lg:text-[400px]"}),t("div",C,[P,R,t("div",null,[n(i,{onClick:s},{default:w(()=>[S(B(k(e).countdown)+" 秒后，返回首页 ",1)]),_:1})])])])}}});typeof l=="function"&&l(V);export{V as default};
