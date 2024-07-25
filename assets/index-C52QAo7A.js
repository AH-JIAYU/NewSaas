
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{d as s,r as a,l,aR as r,o as d,b as i,v as m,Q as u,i as _,P as p}from"./index-exuCqRnv.js";const f=s({name:"FixedActionBar",__name:"index",setup(g){const t=a(!1);l(()=>{e(),window.addEventListener("scroll",e)}),r(()=>{window.removeEventListener("scroll",e)});function e(){const o=document.documentElement.scrollTop||document.body.scrollTop,n=document.documentElement.clientHeight||document.body.clientHeight,c=document.documentElement.scrollHeight||document.body.scrollHeight;t.value=Math.ceil(o+n)>=c}return(o,n)=>(d(),i("div",{class:u(["fixed-action-bar bottom-0 z-4 bg-[var(--g-container-bg)] p-5 text-center transition",{shadow:!_(t)}]),"data-fixed-calc-width":""},[m(o.$slots,"default",{},void 0,!0)],2))}}),v=p(f,[["__scopeId","data-v-9af45002"]]);export{v as _};
