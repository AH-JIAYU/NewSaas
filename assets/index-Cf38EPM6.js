
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{d as m,az as g,r,K as i,u as f,E as h,a2 as _,a as l,c as b,w,h as s,i as c,j as u,t as v,A as x,y as k}from"./index-DBku3IVP.js";const S=["src"],y={key:1,class:"block truncate font-bold"},N=m({name:"Logo",__name:"index",props:{showLogo:{type:Boolean,default:!0},showTitle:{type:Boolean,default:!0}},setup(B){const e=g(),o=r(),a=r();e.logo&&e.logo!=="undefined"&&e.logo!=="null"?o.value=e.logo:o.value="",e.webName&&e.webName!=="undefined"&&e.webName!=="null"?a.value=e.webName:a.value="嘉禹SaaS服务",i(()=>e.logo,t=>{t?o.value=t:o.value=""},{deep:!0}),i(()=>e.webName,t=>{t&&(a.value=t)},{deep:!0});const n=f(),p=h(()=>n.settings.home.enable?n.settings.home.fullPath:"");return(t,C)=>{const d=_("RouterLink");return l(),b(d,{to:s(p),class:x(["h-[var(--g-sidebar-logo-height)] w-inherit flex-center gap-2 px-3 text-inherit no-underline",{"cursor-pointer":s(n).settings.home.enable}]),title:s(a)},{default:w(()=>[s(o)?(l(),c("img",{key:0,src:s(o),class:"logo h-[30px] w-[30px] object-contain"},null,8,S)):u("",!0),t.showTitle?(l(),c("span",y,v(s(a)),1)):u("",!0)]),_:1},8,["to","class","title"])}}}),j=k(N,[["__scopeId","data-v-f796b8d3"]]);export{j as default};
