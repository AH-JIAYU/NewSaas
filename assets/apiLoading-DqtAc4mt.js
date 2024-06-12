
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{C as e,D as a}from"./index-C29iptdf.js";async function r(o){const t=document.createElement("div");t.setAttribute("uid",String(Math.floor(Math.random()*5))),e({type:"circle-fade",size:50,color:"#fff",text:"数据加载中……"},t);const n=await o;return a(t),n}async function s(o){e({type:"circle-fade",size:50,color:"#fff",text:"提交数据中……"});const t=await o;return a(),t}export{r as o,s};
