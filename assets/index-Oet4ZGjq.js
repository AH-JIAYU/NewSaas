
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{d as f,r as o,a as _,p,q as m,o as g,b as D,f as x,w as y,s as h,A as V,M as b}from"./index--d-k_wOm.js";const w={class:"isDiv"},C=f({__name:"index",setup(k,{expose:c}){const e=o(!1),t=o(""),a=o(!1),s=o();async function d(i,l){try{e.value=!0,i&&(a.value=!0,l==="certificate"?t.value="证书详情":t.value="密钥详情",s.value=i,a.value=!1)}catch{}finally{a.value=!1}}function r(){s.value="",e.value=!1}return c({showEdit:d}),(i,l)=>{const n=_("el-dialog"),u=p("loading");return m((g(),D("div",null,[x(n,{modelValue:e.value,"onUpdate:modelValue":l[0]||(l[0]=v=>e.value=v),"append-to-body":"","close-on-click-modal":!1,"destroy-on-close":"",title:t.value,draggable:"",width:"50%",onClose:r},{default:y(()=>[h("div",w,V(s.value),1)]),_:1},8,["modelValue","title"])])),[[u,a.value]])}}}),E=b(C,[["__scopeId","data-v-aa321ad3"]]);export{E as default};
