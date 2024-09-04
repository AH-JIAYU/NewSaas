
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{_ as E}from"./index-BmgyXyP7.js";import{d as x,z as k,O as v,y as R,r as S,a as o,o as w,b as y,f as e,w as t,g as s,i as c,G as T,N as h,aB as z,ap as F,R as M}from"./index-v5mc-w_H.js";import N from"./index-Cb5y2aWH.js";import{u as G}from"./useTabbar-CtGv348U.js";import"./configuration_homepageSetting-Boma6U6G.js";const $=x({name:"TenantTenantHomepageSettingDetail",__name:"detail",setup(D){const l=k(),m=v(),_=G(),r=R(),i=S();function u(){i.value.submit().then(()=>{T.emit("get-data-list"),a()})}function f(){a()}function a(){r.settings.tabbar.enable&&r.settings.tabbar.mergeTabsBy!=="activeMenu"?_.close({name:"pagesExampleGeneralFormModeList"}):m.push({name:"pagesExampleGeneralFormModeList"})}return(H,I)=>{const p=h,n=o("ElButton"),d=z,g=o("ElCol"),b=o("ElRow"),B=F,C=E;return w(),y("div",null,[e(d,{title:c(l).name==="routerName"?"新增首页设置":"编辑首页设置"},{default:t(()=>[e(n,{size:"default",round:"",onClick:a},{icon:t(()=>[e(p,{name:"i-ep:arrow-left"})]),default:t(()=>[s(" 返回 ")]),_:1})]),_:1},8,["title"]),e(B,null,{default:t(()=>[e(b,null,{default:t(()=>[e(g,{md:24,lg:16},{default:t(()=>[e(N,{id:c(l).params.id,ref_key:"formRef",ref:i},null,8,["id"])]),_:1})]),_:1})]),_:1}),e(C,null,{default:t(()=>[e(n,{type:"primary",size:"large",onClick:u},{default:t(()=>[s(" 提交 ")]),_:1}),e(n,{size:"large",onClick:f},{default:t(()=>[s(" 取消 ")]),_:1})]),_:1})])}}}),j=M($,[["__scopeId","data-v-c2d5a8ad"]]);export{j as default};
