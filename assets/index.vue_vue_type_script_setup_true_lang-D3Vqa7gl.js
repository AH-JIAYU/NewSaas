
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{d as h,a1 as g,r as l,a2 as m,y as d,c as _,a as f,o as n,e as k,w,b as i,i as t,j as c,H as S,S as b}from"./index-KptYxjxV.js";const x=["src"],y={key:1,class:"block truncate font-bold"},v=h({name:"Logo",__name:"index",props:{showLogo:{type:Boolean,default:!0},showTitle:{type:Boolean,default:!0}},setup(C){const a=g(),o=l();o.value=a.logo,m(()=>a.logo,e=>{e&&(o.value=e)},{deep:!0});const s=d(),r=l("TCTASK"),u=_(()=>s.settings.home.enable?s.settings.home.fullPath:"");return(e,B)=>{const p=f("RouterLink");return n(),k(p,{to:t(u),class:b(["h-[var(--g-sidebar-logo-height)] w-inherit flex-center gap-2 px-3 text-inherit no-underline",{"cursor-pointer":t(s).settings.home.enable}]),title:t(r)},{default:w(()=>[e.showLogo?(n(),i("img",{key:0,src:t(o),class:"logo h-[30px] w-[30px] object-contain"},null,8,x)):c("",!0),e.showTitle?(n(),i("span",y,S(t(r)),1)):c("",!0)]),_:1},8,["to","class","title"])}}});export{v as _};
