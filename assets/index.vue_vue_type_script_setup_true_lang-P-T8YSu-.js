
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{d as m,s as u,r as a,c as g,a as h,o,e as _,w as d,b as r,i as e,j as i,D as f,O as w}from"./index-BTcEBOVJ.js";const k=""+new URL("logo-CLz_KCqM.png",import.meta.url).href,L=["src"],b={key:1,class:"block truncate font-bold"},B=m({name:"Logo",__name:"index",props:{showLogo:{type:Boolean,default:!0},showTitle:{type:Boolean,default:!0}},setup(x){const t=u(),s=a("Fantastic-admin 专业版"),l=a(k),c=g(()=>t.settings.home.enable?t.settings.home.fullPath:"");return(n,C)=>{const p=h("RouterLink");return o(),_(p,{to:e(c),class:w(["h-[var(--g-sidebar-logo-height)] w-inherit flex-center gap-2 px-3 text-inherit no-underline",{"cursor-pointer":e(t).settings.home.enable}]),title:e(s)},{default:d(()=>[n.showLogo?(o(),r("img",{key:0,src:e(l),class:"logo h-[30px] w-[30px] object-contain"},null,8,L)):i("",!0),n.showTitle?(o(),r("span",b,f(e(s)),1)):i("",!0)]),_:1},8,["to","class","title"])}}});export{B as _};
