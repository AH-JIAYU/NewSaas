
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{d as f,r as t,a3 as _,al as p,a4 as m,b as g,j as D,g as b,w as x,f as y,t as h,z as V}from"./index-D3JQ81m5.js";const w={class:"isDiv"},C=f({__name:"index",setup(k,{expose:c}){const e=t(!1),o=t(""),a=t(!1),s=t();async function d(i,l){try{e.value=!0,i&&(a.value=!0,l==="certificate"?o.value="证书详情":o.value="密钥详情",s.value=i,a.value=!1)}catch{}finally{a.value=!1}}function r(){s.value="",e.value=!1}return c({showEdit:d}),(i,l)=>{const n=_("el-dialog"),u=p("loading");return m((g(),D("div",null,[b(n,{modelValue:e.value,"onUpdate:modelValue":l[0]||(l[0]=v=>e.value=v),"append-to-body":"","close-on-click-modal":!1,"destroy-on-close":"",title:o.value,draggable:"",width:"50%",onClose:r},{default:x(()=>[y("div",w,h(s.value),1)]),_:1},8,["modelValue","title"])])),[[u,a.value]])}}}),E=V(C,[["__scopeId","data-v-b8b17a7a"]]);export{E as default};
