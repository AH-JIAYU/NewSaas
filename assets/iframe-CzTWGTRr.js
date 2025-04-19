
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{d as p,I as h,y as g,aV as w,r as x,X as b,o as l,b as r,F as v,t as S,O as k,i as a,f as u,w as I,s as d,aH as _,v as m,T as P,_ as V,a0 as L,M as T}from"./index-CBBxVEK9.js";const y={class:"iframe-view absolute left-0 top-0 h-full w-full flex flex-col"},z=["data-path","src"],B={class:"absolute left-0 top-0 h-full w-full flex-center bg-stone-2/75 dark:bg-stone-8/75"},C=p({name:"IframeView",__name:"iframe",setup(R){const s=h(),f=g(),i=w(),c=x();return b(()=>s.fullPath,o=>{L(()=>{var n;(n=c.value)==null||n.forEach(t=>{t.dataset.path===o&&(t.onload=()=>{i.closeLoading(o)})})})},{immediate:!0}),(o,n)=>{const t=V;return l(),r("div",y,[(l(!0),r(v,null,S(a(i).openedList,e=>(l(),r("div",{key:e.path,class:k(["absolute left-0 top-0 h-full w-full flex flex-col",{"z-1":a(s).fullPath===e.path}])},[u(P,{name:a(f).settings.mainPage.enableTransition?a(f).settings.mainPage.transitionMode:"",mode:"out-in",appear:""},{default:I(()=>[d(m("iframe",{ref_for:!0,ref_key:"iframeRef",ref:c,"data-path":e.path,src:e.src,frameborder:"0",class:"h-full w-full flex-1"},null,8,z),[[_,a(s).fullPath===e.path]])]),_:2},1032,["name"]),d(m("div",B,[u(t,{name:"i-line-md:loading-twotone-loop",size:36})],512),[[_,e.isLoading]])],2))),128))])}}}),F=T(C,[["__scopeId","data-v-1b4490bf"]]);export{F as default};
