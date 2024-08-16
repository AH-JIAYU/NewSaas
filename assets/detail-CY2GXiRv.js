
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{_ as x}from"./index-DPaArLnq.js";import{d as v,x as B,M as k,v as R,r as S,a as o,o as w,b as M,f as e,w as t,g as s,i as c,C as T,L as h,aE as y,aq as F,P as z}from"./index-DIUeIGtu.js";import L from"./index-D45_BuYs.js";import{u as N}from"./useTabbar-CG9HTynN.js";import"./configuration_homepageSetting-BOEk3L2U.js";const P=v({name:"TenantTenantHomepageSettingDetail",__name:"detail",setup($){const l=B(),m=k(),_=N(),r=R(),i=S();function u(){i.value.submit().then(()=>{T.emit("get-data-list"),a()})}function f(){a()}function a(){r.settings.tabbar.enable&&r.settings.tabbar.mergeTabsBy!=="activeMenu"?_.close({name:"pagesExampleGeneralFormModeList"}):m.push({name:"pagesExampleGeneralFormModeList"})}return(D,G)=>{const p=h,n=o("ElButton"),d=y,g=o("ElCol"),b=o("ElRow"),C=F,E=x;return w(),M("div",null,[e(d,{title:c(l).name==="routerName"?"新增首页设置":"编辑首页设置"},{default:t(()=>[e(n,{size:"default",round:"",onClick:a},{icon:t(()=>[e(p,{name:"i-ep:arrow-left"})]),default:t(()=>[s(" 返回 ")]),_:1})]),_:1},8,["title"]),e(C,null,{default:t(()=>[e(b,null,{default:t(()=>[e(g,{md:24,lg:16},{default:t(()=>[e(L,{id:c(l).params.id,ref_key:"formRef",ref:i},null,8,["id"])]),_:1})]),_:1})]),_:1}),e(E,null,{default:t(()=>[e(n,{type:"primary",size:"large",onClick:u},{default:t(()=>[s(" 提交 ")]),_:1}),e(n,{size:"large",onClick:f},{default:t(()=>[s(" 取消 ")]),_:1})]),_:1})])}}}),j=z(P,[["__scopeId","data-v-c2d5a8ad"]]);export{j as default};
