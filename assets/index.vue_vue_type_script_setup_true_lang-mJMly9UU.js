
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{d as u,p as g,r as a,c as m,a as h,o,e as _,w as d,b as r,i as e,j as l,D as f,Q as w}from"./index-exuCqRnv.js";const k=""+new URL("logo-CLz_KCqM.png",import.meta.url).href,C=["src"],L={key:1,class:"block truncate font-bold"},B=u({name:"Logo",__name:"index",props:{showLogo:{type:Boolean,default:!0},showTitle:{type:Boolean,default:!0}},setup(b){const t=g(),s=a("TCTASK"),i=a(k),c=m(()=>t.settings.home.enable?t.settings.home.fullPath:"");return(n,x)=>{const p=h("RouterLink");return o(),_(p,{to:e(c),class:w(["h-[var(--g-sidebar-logo-height)] w-inherit flex-center gap-2 px-3 text-inherit no-underline",{"cursor-pointer":e(t).settings.home.enable}]),title:e(s)},{default:d(()=>[n.showLogo?(o(),r("img",{key:0,src:e(i),class:"logo h-[30px] w-[30px] object-contain"},null,8,C)):l("",!0),n.showTitle?(o(),r("span",L,f(e(s)),1)):l("",!0)]),_:1},8,["to","class","title"])}}});export{B as _};
