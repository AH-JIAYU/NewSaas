
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{d as g,W as d,r,X as i,v as h,c as f,a as _,o as l,e as b,w,i as s,b as c,j as u,z as v,N as k}from"./index-Cy3Ir7tY.js";const x=["src"],S={key:1,class:"block truncate font-bold"},C=g({name:"Logo",__name:"index",props:{showLogo:{type:Boolean,default:!0},showTitle:{type:Boolean,default:!0}},setup(N){const e=d(),o=r(),a=r();e.logo&&e.logo!=="undefined"&&e.logo!=="null"?o.value=e.logo:o.value="",e.webName&&e.webName!=="undefined"&&e.webName!=="null"?a.value=e.webName:a.value="嘉禹SaaS服务",i(()=>e.logo,t=>{t?o.value=t:o.value=""},{deep:!0}),i(()=>e.webName,t=>{t&&(a.value=t)},{deep:!0});const n=h(),p=f(()=>n.settings.home.enable?n.settings.home.fullPath:"");return(t,y)=>{const m=_("RouterLink");return l(),b(m,{to:s(p),class:k(["h-[var(--g-sidebar-logo-height)] w-inherit flex-center gap-2 px-3 text-inherit no-underline",{"cursor-pointer":s(n).settings.home.enable}]),title:s(a)},{default:w(()=>[s(o)?(l(),c("img",{key:0,src:s(o),class:"logo h-[30px] w-[30px] object-contain"},null,8,x)):u("",!0),t.showTitle?(l(),c("span",S,v(s(a)),1)):u("",!0)]),_:1},8,["to","class","title"])}}});export{C as _};
