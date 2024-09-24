
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{_ as E}from"./index-WePVKZqn.js";import{d as x,z as k,O as v,y as R,r as S,b as o,o as h,e as w,g as e,w as t,h as s,j as i,G as y,N as T,aB as z,ap as F,R as M}from"./index-Bgpn2lkb.js";import N from"./index-BgTqPEID.js";import{u as G}from"./useTabbar-Djk8Ft31.js";import"./configuration_homepageSetting-CZjS1hAB.js";const $=x({name:"TenantTenantHomepageSettingDetail",__name:"detail",setup(D){const l=k(),m=v(),_=G(),r=R(),c=S();function u(){c.value.submit().then(()=>{y.emit("get-data-list"),a()})}function p(){a()}function a(){r.settings.tabbar.enable&&r.settings.tabbar.mergeTabsBy!=="activeMenu"?_.close({name:"pagesExampleGeneralFormModeList"}):m.push({name:"pagesExampleGeneralFormModeList"})}return(H,I)=>{const f=T,n=o("ElButton"),d=z,g=o("ElCol"),b=o("ElRow"),B=F,C=E;return h(),w("div",null,[e(d,{title:i(l).name==="routerName"?"新增首页设置":"编辑首页设置"},{default:t(()=>[e(n,{size:"default",round:"",onClick:a},{icon:t(()=>[e(f,{name:"i-ep:arrow-left"})]),default:t(()=>[s(" 返回 ")]),_:1})]),_:1},8,["title"]),e(B,null,{default:t(()=>[e(b,null,{default:t(()=>[e(g,{md:24,lg:16},{default:t(()=>[e(N,{id:i(l).params.id,ref_key:"formRef",ref:c},null,8,["id"])]),_:1})]),_:1})]),_:1}),e(C,null,{default:t(()=>[e(n,{type:"primary",size:"large",onClick:u},{default:t(()=>[s(" 提交 ")]),_:1}),e(n,{size:"large",onClick:p},{default:t(()=>[s(" 取消 ")]),_:1})]),_:1})])}}}),O=M($,[["__scopeId","data-v-c2d5a8ad"]]);export{O as default};
