
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{_ as E}from"./index-DmBIu4vz.js";import{d as B,y as k,N as v,x as R,r as S,a as o,o as w,b as y,f as e,w as t,g as s,i as c,D as M,M as T,aD as h,ap as D,Q as F}from"./index-DaerNgvX.js";import N from"./index-BxBJPGEf.js";import{u as z}from"./useTabbar-Czx0KqRs.js";import"./configuration_homepageSetting-YWl-iFR0.js";const $=B({name:"TenantTenantHomepageSettingDetail",__name:"detail",setup(G){const l=k(),m=v(),_=z(),r=R(),i=S();function u(){i.value.submit().then(()=>{M.emit("get-data-list"),a()})}function f(){a()}function a(){r.settings.tabbar.enable&&r.settings.tabbar.mergeTabsBy!=="activeMenu"?_.close({name:"pagesExampleGeneralFormModeList"}):m.push({name:"pagesExampleGeneralFormModeList"})}return(H,I)=>{const p=T,n=o("ElButton"),d=h,g=o("ElCol"),b=o("ElRow"),x=D,C=E;return w(),y("div",null,[e(d,{title:c(l).name==="routerName"?"新增首页设置":"编辑首页设置"},{default:t(()=>[e(n,{size:"default",round:"",onClick:a},{icon:t(()=>[e(p,{name:"i-ep:arrow-left"})]),default:t(()=>[s(" 返回 ")]),_:1})]),_:1},8,["title"]),e(x,null,{default:t(()=>[e(b,null,{default:t(()=>[e(g,{md:24,lg:16},{default:t(()=>[e(N,{id:c(l).params.id,ref_key:"formRef",ref:i},null,8,["id"])]),_:1})]),_:1})]),_:1}),e(C,null,{default:t(()=>[e(n,{type:"primary",size:"large",onClick:u},{default:t(()=>[s(" 提交 ")]),_:1}),e(n,{size:"large",onClick:f},{default:t(()=>[s(" 取消 ")]),_:1})]),_:1})])}}}),j=F($,[["__scopeId","data-v-c2d5a8ad"]]);export{j as default};
