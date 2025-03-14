
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{k as t,aB as c}from"./index-KFsg0x_i.js";const l={upload:e=>t.post("project/uploadQiniu",e),detail:e=>t.post("project/getQiniuFileUrl",e),delete:e=>t.post("project/deleteQiniu",e)},i=c();async function p(e,a){const s=await(await fetch(e,{method:"GET",headers:{Authorization:i.token}})).blob(),n=URL.createObjectURL(s),o=document.createElement("a");o.href=n,document.body.appendChild(o),o.download=a,o.click(),document.body.removeChild(o),URL.revokeObjectURL(n)}export{p as D,l as f};
