
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{_ as x}from"./index-DaJ9QR5Z.js";import{d as B,s as k,K as v,q as R,r as S,a as o,o as w,b as T,f as e,w as t,g as s,i as c,z as h,J as y,at as z,aj as F,N as M}from"./index-JhMSEHdj.js";import N from"./index-BPpDG5w9.js";import{u as $}from"./useTabbar-R_7m38PT.js";import"./configuration_homepageSetting-04BZKs3b.js";const D=B({name:"TenantTenantHomepageSettingDetail",__name:"detail",setup(G){const l=k(),m=v(),_=$(),r=R(),i=S();function u(){i.value.submit().then(()=>{h.emit("get-data-list"),a()})}function f(){a()}function a(){r.settings.tabbar.enable&&r.settings.tabbar.mergeTabsBy!=="activeMenu"?_.close({name:"pagesExampleGeneralFormModeList"}):m.push({name:"pagesExampleGeneralFormModeList"})}return(H,I)=>{const p=y,n=o("ElButton"),d=z,g=o("ElCol"),b=o("ElRow"),C=F,E=x;return w(),T("div",null,[e(d,{title:c(l).name==="routerName"?"新增首页设置":"编辑首页设置"},{default:t(()=>[e(n,{size:"default",round:"",onClick:a},{icon:t(()=>[e(p,{name:"i-ep:arrow-left"})]),default:t(()=>[s(" 返回 ")]),_:1})]),_:1},8,["title"]),e(C,null,{default:t(()=>[e(b,null,{default:t(()=>[e(g,{md:24,lg:16},{default:t(()=>[e(N,{id:c(l).params.id,ref_key:"formRef",ref:i},null,8,["id"])]),_:1})]),_:1})]),_:1}),e(E,null,{default:t(()=>[e(n,{type:"primary",size:"large",onClick:u},{default:t(()=>[s(" 提交 ")]),_:1}),e(n,{size:"large",onClick:f},{default:t(()=>[s(" 取消 ")]),_:1})]),_:1})])}}}),A=M(D,[["__scopeId","data-v-c2d5a8ad"]]);export{A as default};
