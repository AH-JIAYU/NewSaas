
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{d as g,a1 as h,r as l,a3 as m,y as f,c as _,b as d,o as a,f as k,w,e as i,j as o,k as c,H as S,S as L}from"./index-BfsAQ9I4.js";const b=""+new URL("logo-CLz_KCqM.png",import.meta.url).href,x=["src"],C={key:1,class:"block truncate font-bold"},R=g({name:"Logo",__name:"index",props:{showLogo:{type:Boolean,default:!0},showTitle:{type:Boolean,default:!0}},setup(y){const s=h(),t=l();s.logo?t.value=s.logo:t.value=b,m(()=>s.logo,e=>{e&&(t.value=e)},{deep:!0});const n=f(),r=l("嘉禹SaaS服务"),u=_(()=>n.settings.home.enable?n.settings.home.fullPath:"");return(e,v)=>{const p=d("RouterLink");return a(),k(p,{to:o(u),class:L(["h-[var(--g-sidebar-logo-height)] w-inherit flex-center gap-2 px-3 text-inherit no-underline",{"cursor-pointer":o(n).settings.home.enable}]),title:o(r)},{default:w(()=>[e.showLogo?(a(),i("img",{key:0,src:o(t),class:"logo h-[30px] w-[30px] object-contain"},null,8,x)):c("",!0),e.showTitle?(a(),i("span",C,S(o(r)),1)):c("",!0)]),_:1},8,["to","class","title"])}}});export{R as _};
