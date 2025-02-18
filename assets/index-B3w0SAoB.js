
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{d as m,az as g,r,L as i,u as f,F as h,a3 as _,b as l,c as b,w,i as s,j as c,k as u,t as v,B as k,z as x}from"./index-CZbucr5m.js";const S=["src"],B={key:1,class:"block truncate font-bold"},L=m({name:"Logo",__name:"index",props:{showLogo:{type:Boolean,default:!0},showTitle:{type:Boolean,default:!0}},setup(N){const e=g(),o=r(),a=r();e.logo&&e.logo!=="undefined"&&e.logo!=="null"?o.value=e.logo:o.value="",e.webName&&e.webName!=="undefined"&&e.webName!=="null"?a.value=e.webName:a.value="嘉禹SaaS服务",i(()=>e.logo,t=>{t?o.value=t:o.value=""},{deep:!0}),i(()=>e.webName,t=>{t&&(a.value=t)},{deep:!0});const n=f(),p=h(()=>n.settings.home.enable?n.settings.home.fullPath:"");return(t,y)=>{const d=_("RouterLink");return l(),b(d,{to:s(p),class:k(["h-[var(--g-sidebar-logo-height)] w-inherit flex-center gap-2 px-3 text-inherit no-underline",{"cursor-pointer":s(n).settings.home.enable}]),title:s(a)},{default:w(()=>[s(o)?(l(),c("img",{key:0,src:s(o),class:"logo h-[30px] w-[30px] object-contain"},null,8,S)):u("",!0),t.showTitle?(l(),c("span",B,v(s(a)),1)):u("",!0)]),_:1},8,["to","class","title"])}}}),z=x(L,[["__scopeId","data-v-f796b8d3"]]);export{z as default};
