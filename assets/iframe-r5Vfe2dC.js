
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{d as m,z as h,y as g,aU as w,r as x,a3 as b,o as l,b as r,F as v,t as S,S as k,i as a,f as u,w as I,q as d,ap as p,s as _,T as P,N as z,n as L,R}from"./index-CbxE907u.js";const T={class:"iframe-view absolute left-0 top-0 h-full w-full flex flex-col"},V=["data-path","src"],y={class:"absolute left-0 top-0 h-full w-full flex-center bg-stone-2/75 dark:bg-stone-8/75"},B=m({name:"IframeView",__name:"iframe",setup(C){const s=h(),f=g(),i=w(),c=x();return b(()=>s.fullPath,o=>{L(()=>{var n;(n=c.value)==null||n.forEach(t=>{t.dataset.path===o&&(t.onload=()=>{i.closeLoading(o)})})})},{immediate:!0}),(o,n)=>{const t=z;return l(),r("div",T,[(l(!0),r(v,null,S(a(i).openedList,e=>(l(),r("div",{key:e.path,class:k(["absolute left-0 top-0 h-full w-full flex flex-col",{"z-1":a(s).fullPath===e.path}])},[u(P,{name:a(f).settings.mainPage.enableTransition?a(f).settings.mainPage.transitionMode:"",mode:"out-in",appear:""},{default:I(()=>[d(_("iframe",{ref_for:!0,ref_key:"iframeRef",ref:c,"data-path":e.path,src:e.src,frameborder:"0",class:"h-full w-full flex-1"},null,8,V),[[p,a(s).fullPath===e.path]])]),_:2},1032,["name"]),d(_("div",y,[u(t,{name:"i-line-md:loading-twotone-loop",size:36})],512),[[p,e.isLoading]])],2))),128))])}}}),E=R(B,[["__scopeId","data-v-1b4490bf"]]);export{E as default};
