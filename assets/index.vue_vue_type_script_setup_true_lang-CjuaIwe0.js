
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{d as m,a1 as h,r as l,a3 as i,y as f,c as d,b as _,o as r,f as w,w as b,e as c,j as s,k as u,H as k,S}from"./index-C6Z_9UGF.js";const v=""+new URL("logo-CLz_KCqM.png",import.meta.url).href,L=["src"],x={key:1,class:"block truncate font-bold"},N=m({name:"Logo",__name:"index",props:{showLogo:{type:Boolean,default:!0},showTitle:{type:Boolean,default:!0}},setup(C){const o=h(),a=l(),t=l();o.logo?a.value=o.logo:a.value=v,o.webName?t.value=o.webName:t.value="嘉禹SaaS服务",i(()=>o.logo,e=>{e&&(a.value=e)},{deep:!0}),i(()=>o.webName,e=>{e&&(t.value=e)},{deep:!0});const n=f(),p=d(()=>n.settings.home.enable?n.settings.home.fullPath:"");return(e,y)=>{const g=_("RouterLink");return r(),w(g,{to:s(p),class:S(["h-[var(--g-sidebar-logo-height)] w-inherit flex-center gap-2 px-3 text-inherit no-underline",{"cursor-pointer":s(n).settings.home.enable}]),title:s(t)},{default:b(()=>[e.showLogo?(r(),c("img",{key:0,src:s(a),class:"logo h-[30px] w-[30px] object-contain"},null,8,L)):u("",!0),e.showTitle?(r(),c("span",x,k(s(t)),1)):u("",!0)]),_:1},8,["to","class","title"])}}});export{N as _};
