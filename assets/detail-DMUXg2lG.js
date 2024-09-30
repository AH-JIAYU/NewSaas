
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{_ as E}from"./index-DVxHRm_R.js";import{d as x,I as k,J as v,y as R,r as S,a as o,o as w,b as y,f as e,w as t,g as s,i as c,z as M,_ as T,aB as h,ap as z,M as F}from"./index-oxkd8Woh.js";import I from"./index-uGvD03qv.js";import{u as N}from"./useTabbar-D1j4Kstn.js";import"./configuration_homepageSetting-C6l_EtZK.js";const $=x({name:"TenantTenantHomepageSettingDetail",__name:"detail",setup(D){const l=k(),_=v(),m=N(),r=R(),i=S();function u(){i.value.submit().then(()=>{M.emit("get-data-list"),a()})}function f(){a()}function a(){r.settings.tabbar.enable&&r.settings.tabbar.mergeTabsBy!=="activeMenu"?m.close({name:"pagesExampleGeneralFormModeList"}):_.push({name:"pagesExampleGeneralFormModeList"})}return(G,H)=>{const p=T,n=o("ElButton"),d=h,g=o("ElCol"),b=o("ElRow"),B=z,C=E;return w(),y("div",null,[e(d,{title:c(l).name==="routerName"?"新增首页设置":"编辑首页设置"},{default:t(()=>[e(n,{size:"default",round:"",onClick:a},{icon:t(()=>[e(p,{name:"i-ep:arrow-left"})]),default:t(()=>[s(" 返回 ")]),_:1})]),_:1},8,["title"]),e(B,null,{default:t(()=>[e(b,null,{default:t(()=>[e(g,{md:24,lg:16},{default:t(()=>[e(I,{id:c(l).params.id,ref_key:"formRef",ref:i},null,8,["id"])]),_:1})]),_:1})]),_:1}),e(C,null,{default:t(()=>[e(n,{type:"primary",size:"large",onClick:u},{default:t(()=>[s(" 提交 ")]),_:1}),e(n,{size:"large",onClick:f},{default:t(()=>[s(" 取消 ")]),_:1})]),_:1})])}}}),j=F($,[["__scopeId","data-v-c2d5a8ad"]]);export{j as default};
