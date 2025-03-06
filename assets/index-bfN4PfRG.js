
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{d as m,aB as g,r,X as i,y as f,c as h,a as _,o as l,e as b,w,i as s,b as c,j as u,A as v,O as x,M as k}from"./index-puGejJ6c.js";const S=["src"],y={key:1,class:"block truncate font-bold"},B=m({name:"Logo",__name:"index",props:{showLogo:{type:Boolean,default:!0},showTitle:{type:Boolean,default:!0}},setup(N){const e=g(),t=r(),a=r();e.logo&&e.logo!=="undefined"&&e.logo!=="null"?t.value=e.logo:t.value="",e.webName&&e.webName!=="undefined"&&e.webName!=="null"?a.value=e.webName:a.value="嘉禹SaaS服务",i(()=>e.logo,o=>{o?t.value=o:t.value=""},{deep:!0}),i(()=>e.webName,o=>{o&&(a.value=o)},{deep:!0});const n=f(),p=h(()=>n.settings.home.enable?n.settings.home.fullPath:"");return(o,C)=>{const d=_("RouterLink");return l(),b(d,{to:s(p),class:x(["h-[var(--g-sidebar-logo-height)] w-inherit flex-center gap-2 px-3 text-inherit no-underline",{"cursor-pointer":s(n).settings.home.enable}]),title:s(a)},{default:w(()=>[s(t)?(l(),c("img",{key:0,src:s(t),class:"logo h-[30px] w-[30px] object-contain"},null,8,S)):u("",!0),o.showTitle?(l(),c("span",y,v(s(a)),1)):u("",!0)]),_:1},8,["to","class","title"])}}}),j=k(B,[["__scopeId","data-v-f796b8d3"]]);export{j as default};
