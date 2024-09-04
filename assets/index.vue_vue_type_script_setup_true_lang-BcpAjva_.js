
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{d as g,a1 as h,r as l,a3 as m,y as _,c as d,a as f,o as a,e as w,w as k,b as i,i as o,j as c,H as C,S as L}from"./index-B1sH2CRZ.js";const S=""+new URL("logo-CLz_KCqM.png",import.meta.url).href,b=["src"],x={key:1,class:"block truncate font-bold"},T=g({name:"Logo",__name:"index",props:{showLogo:{type:Boolean,default:!0},showTitle:{type:Boolean,default:!0}},setup(y){const s=h(),t=l();s.logo?t.value=s.logo:t.value=S,m(()=>s.logo,e=>{e&&(t.value=e)},{deep:!0});const n=_(),r=l("TCTASK"),u=d(()=>n.settings.home.enable?n.settings.home.fullPath:"");return(e,v)=>{const p=f("RouterLink");return a(),w(p,{to:o(u),class:L(["h-[var(--g-sidebar-logo-height)] w-inherit flex-center gap-2 px-3 text-inherit no-underline",{"cursor-pointer":o(n).settings.home.enable}]),title:o(r)},{default:k(()=>[e.showLogo?(a(),i("img",{key:0,src:o(t),class:"logo h-[30px] w-[30px] object-contain"},null,8,b)):c("",!0),e.showTitle?(a(),i("span",x,C(o(r)),1)):c("",!0)]),_:1},8,["to","class","title"])}}});export{T as _};
