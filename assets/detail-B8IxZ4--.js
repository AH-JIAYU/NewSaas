
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{_ as v}from"./index-CudViDhX.js";import{d as x,I as B,J as k,y as R,r as S,a as o,o as w,b as y,f as e,w as t,g as s,i as c,z as M,_ as T,av as h,ap as z,M as F}from"./index-DFP_ze2i.js";import I from"./index-DH5t2k-c.js";import{u as N}from"./useTabbar-Dp4mHQpL.js";import"./configuration_homepageSetting-Qu9h-urO.js";const $=x({name:"TenantTenantHomepageSettingDetail",__name:"detail",setup(D){const l=B(),_=k(),m=N(),r=R(),i=S();function u(){i.value.submit().then(()=>{M.emit("get-data-list"),a()})}function f(){a()}function a(){r.settings.tabbar.enable&&r.settings.tabbar.mergeTabsBy!=="activeMenu"?m.close({name:"pagesExampleGeneralFormModeList"}):_.push({name:"pagesExampleGeneralFormModeList"})}return(G,H)=>{const p=T,n=o("ElButton"),d=h,g=o("ElCol"),b=o("ElRow"),C=z,E=v;return w(),y("div",null,[e(d,{title:c(l).name==="routerName"?"新增首页设置":"编辑首页设置"},{default:t(()=>[e(n,{size:"default",round:"",onClick:a},{icon:t(()=>[e(p,{name:"i-ep:arrow-left"})]),default:t(()=>[s(" 返回 ")]),_:1})]),_:1},8,["title"]),e(C,null,{default:t(()=>[e(b,null,{default:t(()=>[e(g,{md:24,lg:16},{default:t(()=>[e(I,{id:c(l).params.id,ref_key:"formRef",ref:i},null,8,["id"])]),_:1})]),_:1})]),_:1}),e(E,null,{default:t(()=>[e(n,{type:"primary",size:"large",onClick:u},{default:t(()=>[s(" 提交 ")]),_:1}),e(n,{size:"large",onClick:f},{default:t(()=>[s(" 取消 ")]),_:1})]),_:1})])}}}),j=F($,[["__scopeId","data-v-c2d5a8ad"]]);export{j as default};
