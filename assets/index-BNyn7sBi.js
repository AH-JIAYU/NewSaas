
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{C as s}from"./clipboard-h_RFbrkZ.js";const a=i=>({toClipboard(r,n){return new Promise((d,c)=>{const o=document.createElement("button"),e=new s(o,{text:()=>r,action:()=>"copy",container:n!==void 0?n:document.body});e.on("success",t=>{e.destroy(),d(t)}),e.on("error",t=>{e.destroy(),c(t)}),document.body.appendChild(o),o.click(),document.body.removeChild(o)})}});export{a as u};
