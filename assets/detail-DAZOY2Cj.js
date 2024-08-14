
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{_ as E}from"./index-BhTcxBlM.js";import{d as v,x as B,M as k,v as R,r as S,a as o,o as w,b as M,f as e,w as t,g as s,i as c,C as T,L as h,aD as y,ap as F,P as z}from"./index-Cc6n2BiZ.js";import D from"./index-ByrX1DYc.js";import{u as L}from"./useTabbar-DjHFjnfk.js";import"./configuration_homepageSetting-D6uMVnTS.js";const N=v({name:"TenantTenantHomepageSettingDetail",__name:"detail",setup(P){const l=B(),m=k(),_=L(),r=R(),i=S();function u(){i.value.submit().then(()=>{T.emit("get-data-list"),a()})}function f(){a()}function a(){r.settings.tabbar.enable&&r.settings.tabbar.mergeTabsBy!=="activeMenu"?_.close({name:"pagesExampleGeneralFormModeList"}):m.push({name:"pagesExampleGeneralFormModeList"})}return($,G)=>{const p=h,n=o("ElButton"),d=y,g=o("ElCol"),b=o("ElRow"),C=F,x=E;return w(),M("div",null,[e(d,{title:c(l).name==="routerName"?"新增首页设置":"编辑首页设置"},{default:t(()=>[e(n,{size:"default",round:"",onClick:a},{icon:t(()=>[e(p,{name:"i-ep:arrow-left"})]),default:t(()=>[s(" 返回 ")]),_:1})]),_:1},8,["title"]),e(C,null,{default:t(()=>[e(b,null,{default:t(()=>[e(g,{md:24,lg:16},{default:t(()=>[e(D,{id:c(l).params.id,ref_key:"formRef",ref:i},null,8,["id"])]),_:1})]),_:1})]),_:1}),e(x,null,{default:t(()=>[e(n,{type:"primary",size:"large",onClick:u},{default:t(()=>[s(" 提交 ")]),_:1}),e(n,{size:"large",onClick:f},{default:t(()=>[s(" 取消 ")]),_:1})]),_:1})])}}}),q=z(N,[["__scopeId","data-v-c2d5a8ad"]]);export{q as default};
