
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{_ as E}from"./index-D4XA0xCG.js";import{d as B,y as k,N as v,x as y,r as M,a as n,o as R,b as w,f as e,w as t,g as s,i as c,D as S,M as h,aD as D,ap as F,Q as N}from"./index-XUp5c_5V.js";import z from"./index-CcpUc2XY.js";import{u as T}from"./useTabbar-Ch-vg-Nu.js";import"./configuration_manager-Q5ndZtr0.js";import"./group_manage-D32HCnfP.js";import"./department-CR-AIYi6.js";import"./department-DcaMowIg.js";const $=B({name:"MybillDetail",__name:"detail",setup(G){const l=k(),m=v(),_=T(),r=y(),i=M();function u(){i.value.submit().then(()=>{S.emit("get-data-list"),o()})}function p(){o()}function o(){r.settings.tabbar.enable&&r.settings.tabbar.mergeTabsBy!=="activeMenu"?_.close({name:"pagesExampleGeneralFormModeList"}):m.push({name:"pagesExampleGeneralFormModeList"})}return(I,L)=>{const f=h,a=n("ElButton"),d=D,g=n("ElCol"),b=n("ElRow"),x=F,C=E;return R(),w("div",null,[e(d,{title:c(l).name==="routerName"?"新增我的账单":"编辑我的账单"},{default:t(()=>[e(a,{size:"default",round:"",onClick:o},{icon:t(()=>[e(f,{name:"i-ep:arrow-left"})]),default:t(()=>[s(" 返回 ")]),_:1})]),_:1},8,["title"]),e(x,null,{default:t(()=>[e(b,null,{default:t(()=>[e(g,{md:24,lg:16},{default:t(()=>[e(z,{id:c(l).params.id,ref_key:"formRef",ref:i},null,8,["id"])]),_:1})]),_:1})]),_:1}),e(C,null,{default:t(()=>[e(a,{type:"primary",size:"large",onClick:u},{default:t(()=>[s(" 提交 ")]),_:1}),e(a,{size:"large",onClick:p},{default:t(()=>[s(" 取消 ")]),_:1})]),_:1})])}}}),K=N($,[["__scopeId","data-v-ee934526"]]);export{K as default};
