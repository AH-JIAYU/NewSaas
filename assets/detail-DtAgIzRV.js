
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{_ as E}from"./index-BhTcxBlM.js";import{d as v,x as B,M as k,v as M,r as R,a as n,o as w,b as y,f as e,w as t,g as s,i as c,C as S,L as h,aD as F,ap as z,P as D}from"./index-Cc6n2BiZ.js";import L from"./index-D0tEypN4.js";import{u as N}from"./useTabbar-DjHFjnfk.js";import"./configuration_manager-Bs1K01DG.js";import"./group_manage-Bh5apG7h.js";import"./department-DxgkXNyI.js";import"./department-vY4cLtAl.js";const P=v({name:"MybillDetail",__name:"detail",setup(T){const l=B(),m=k(),_=N(),r=M(),i=R();function u(){i.value.submit().then(()=>{S.emit("get-data-list"),o()})}function p(){o()}function o(){r.settings.tabbar.enable&&r.settings.tabbar.mergeTabsBy!=="activeMenu"?_.close({name:"pagesExampleGeneralFormModeList"}):m.push({name:"pagesExampleGeneralFormModeList"})}return($,G)=>{const f=h,a=n("ElButton"),d=F,g=n("ElCol"),b=n("ElRow"),C=z,x=E;return w(),y("div",null,[e(d,{title:c(l).name==="routerName"?"新增我的账单":"编辑我的账单"},{default:t(()=>[e(a,{size:"default",round:"",onClick:o},{icon:t(()=>[e(f,{name:"i-ep:arrow-left"})]),default:t(()=>[s(" 返回 ")]),_:1})]),_:1},8,["title"]),e(C,null,{default:t(()=>[e(b,null,{default:t(()=>[e(g,{md:24,lg:16},{default:t(()=>[e(L,{id:c(l).params.id,ref_key:"formRef",ref:i},null,8,["id"])]),_:1})]),_:1})]),_:1}),e(x,null,{default:t(()=>[e(a,{type:"primary",size:"large",onClick:u},{default:t(()=>[s(" 提交 ")]),_:1}),e(a,{size:"large",onClick:p},{default:t(()=>[s(" 取消 ")]),_:1})]),_:1})])}}}),O=D(P,[["__scopeId","data-v-ee934526"]]);export{O as default};
