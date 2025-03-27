
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{d as i,J as l,r as m,o as u,b as _,f as p,O as f,_ as d,M as v}from"./index-SHuwLsia.js";import{u as g}from"./useMainPage-OFV1-vtq.js";import"./useTabbar-DDRHpm9g.js";const x=i({name:"PageReload",__name:"index",setup(P){const n=l(),s=g(),e=m(!1);function t(){e.value=!0,new Promise((a,o)=>{try{s.reload(),a()}catch(r){o(r)}}).catch(()=>{n.push({name:n.currentRoute.value.name,query:{reload:Date.now()}})}).finally(()=>{e.value=!1})}return(c,a)=>{const o=d;return u(),_("span",{class:f(["flex-center cursor-pointer px-2 py-1",{animation:e.value}]),onClick:t,onAnimationend:a[0]||(a[0]=r=>e.value=!1)},[p(o,{name:"i-iconoir:refresh-double"})],34)}}}),C=v(x,[["__scopeId","data-v-94c739c5"]]);export{C as default};
