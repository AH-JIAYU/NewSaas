
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{_ as E}from"./index-Cxy7Gyez.js";import{d as x,z as k,O as v,y as R,r as y,b as n,o as h,e as w,g as e,w as t,h as s,j as c,G as M,N as S,aB as z,ap as F,R as N}from"./index-BRxVf_xq.js";import G from"./index-BDoqWvOu.js";import{u as T}from"./useTabbar-D8yjlduI.js";import"./group_manage-vSxgwgKG.js";import"./department-B0zdYDkP.js";import"./department-DdsGfl5-.js";const $=x({name:"MybillDetail",__name:"detail",setup(D){const l=k(),m=v(),_=T(),r=R(),i=y();function u(){i.value.submit().then(()=>{M.emit("get-data-list"),o()})}function p(){o()}function o(){r.settings.tabbar.enable&&r.settings.tabbar.mergeTabsBy!=="activeMenu"?_.close({name:"pagesExampleGeneralFormModeList"}):m.push({name:"pagesExampleGeneralFormModeList"})}return(I,L)=>{const f=S,a=n("ElButton"),d=z,g=n("ElCol"),b=n("ElRow"),B=F,C=E;return h(),w("div",null,[e(d,{title:c(l).name==="routerName"?"新增我的账单":"编辑我的账单"},{default:t(()=>[e(a,{size:"default",round:"",onClick:o},{icon:t(()=>[e(f,{name:"i-ep:arrow-left"})]),default:t(()=>[s(" 返回 ")]),_:1})]),_:1},8,["title"]),e(B,null,{default:t(()=>[e(b,null,{default:t(()=>[e(g,{md:24,lg:16},{default:t(()=>[e(G,{id:c(l).params.id,ref_key:"formRef",ref:i},null,8,["id"])]),_:1})]),_:1})]),_:1}),e(C,null,{default:t(()=>[e(a,{type:"primary",size:"large",onClick:u},{default:t(()=>[s(" 提交 ")]),_:1}),e(a,{size:"large",onClick:p},{default:t(()=>[s(" 取消 ")]),_:1})]),_:1})])}}}),J=N($,[["__scopeId","data-v-ee934526"]]);export{J as default};
