
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{d as g,X as d,r,Z as i,y as h,c as f,a as _,o as l,e as b,w,i as o,b as c,j as u,A as k,O as v}from"./index-BE57dBdt.js";const x=["src"],S={key:1,class:"block truncate font-bold"},C=g({name:"Logo",__name:"index",props:{showLogo:{type:Boolean,default:!0},showTitle:{type:Boolean,default:!0}},setup(y){const e=d(),s=r(),a=r();e.logo&&e.logo!=="undefined"&&e.logo!=="null"?s.value=e.logo:s.value="",e.webName&&e.webName!=="undefined"&&e.webName!=="null"?a.value=e.webName:a.value="嘉禹SaaS服务",i(()=>e.logo,t=>{t&&(s.value=t)},{deep:!0}),i(()=>e.webName,t=>{t&&(a.value=t)},{deep:!0});const n=h(),p=f(()=>n.settings.home.enable?n.settings.home.fullPath:"");return(t,N)=>{const m=_("RouterLink");return l(),b(m,{to:o(p),class:v(["h-[var(--g-sidebar-logo-height)] w-inherit flex-center gap-2 px-3 text-inherit no-underline",{"cursor-pointer":o(n).settings.home.enable}]),title:o(a)},{default:w(()=>[o(s)?(l(),c("img",{key:0,src:o(s),class:"logo h-[30px] w-[30px] object-contain"},null,8,x)):u("",!0),t.showTitle?(l(),c("span",S,k(o(a)),1)):u("",!0)]),_:1},8,["to","class","title"])}}});export{C as _};
