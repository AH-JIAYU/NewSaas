
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{d as n,s as c,a as i,i as p,b as a,t as l,z as m,A as d}from"./index-JYvP5qSa.js";const u={class:"breadcrumb-item flex items-center text-dark dark:text-white"},f={class:"separator mx-2"},k=n({__name:"item",props:{to:{},replace:{type:Boolean},separator:{default:"/"}},setup(o){const e=o,t=c();function r(){e.to&&(e.replace?t.replace(e.to):t.push(e.to))}return(s,_)=>(i(),p("div",u,[a("span",f,l(s.separator),1),a("span",{class:d(["text flex items-center opacity-60",{"is-link cursor-pointer transition-opacity hover:opacity-100":!!e.to}]),onClick:r},[m(s.$slots,"default")],2)]))}});export{k as _};
