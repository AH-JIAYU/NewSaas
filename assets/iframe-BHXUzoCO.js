
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{d as p,s as h,q as g,aT as w,r as x,a0 as b,o as l,b as r,a3 as v,a4 as S,P as k,i as a,f as u,w as P,am as d,aE as _,F as m,T as I,L,a5 as T,_ as V}from"./index-13Balsai.js";const z={class:"iframe-view absolute left-0 top-0 h-full w-full flex flex-col"},B=["data-path","src"],C={class:"absolute left-0 top-0 h-full w-full flex-center bg-stone-2/75 dark:bg-stone-8/75"},E=p({name:"IframeView",__name:"iframe",setup(R){const s=h(),f=g(),i=w(),c=x();return b(()=>s.fullPath,o=>{T(()=>{var n;(n=c.value)==null||n.forEach(t=>{t.dataset.path===o&&(t.onload=()=>{i.closeLoading(o)})})})},{immediate:!0}),(o,n)=>{const t=L;return l(),r("div",z,[(l(!0),r(v,null,S(a(i).openedList,e=>(l(),r("div",{key:e.path,class:k(["absolute left-0 top-0 h-full w-full flex flex-col",{"z-1":a(s).fullPath===e.path}])},[u(I,{name:a(f).settings.mainPage.enableTransition?a(f).settings.mainPage.transitionMode:"",mode:"out-in",appear:""},{default:P(()=>[d(m("iframe",{ref_for:!0,ref_key:"iframeRef",ref:c,"data-path":e.path,src:e.src,frameborder:"0",class:"h-full w-full flex-1"},null,8,B),[[_,a(s).fullPath===e.path]])]),_:2},1032,["name"]),d(m("div",C,[u(t,{name:"i-line-md:loading-twotone-loop",size:36})],512),[[_,e.isLoading]])],2))),128))])}}}),F=V(E,[["__scopeId","data-v-1b4490bf"]]);export{F as default};
