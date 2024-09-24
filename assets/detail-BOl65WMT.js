
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{_ as E}from"./index-WePVKZqn.js";import{d as x,z as k,O as v,y as R,r as y,b as n,o as h,e as w,g as e,w as t,h as s,j as c,G as M,N as S,aB as z,ap as F,R as N}from"./index-Bgpn2lkb.js";import G from"./index-CdouJrnD.js";import{u as T}from"./useTabbar-Djk8Ft31.js";import"./department-CT2Pe4Lu.js";const $=x({name:"MybillDetail",__name:"detail",setup(D){const l=k(),_=v(),m=T(),r=R(),i=y();function u(){i.value.submit().then(()=>{M.emit("get-data-list"),o()})}function f(){o()}function o(){r.settings.tabbar.enable&&r.settings.tabbar.mergeTabsBy!=="activeMenu"?m.close({name:"pagesExampleGeneralFormModeList"}):_.push({name:"pagesExampleGeneralFormModeList"})}return(I,L)=>{const p=S,a=n("ElButton"),d=z,g=n("ElCol"),b=n("ElRow"),B=F,C=E;return h(),w("div",null,[e(d,{title:c(l).name==="routerName"?"新增我的账单":"编辑我的账单"},{default:t(()=>[e(a,{size:"default",round:"",onClick:o},{icon:t(()=>[e(p,{name:"i-ep:arrow-left"})]),default:t(()=>[s(" 返回 ")]),_:1})]),_:1},8,["title"]),e(B,null,{default:t(()=>[e(b,null,{default:t(()=>[e(g,{md:24,lg:16},{default:t(()=>[e(G,{id:c(l).params.id,ref_key:"formRef",ref:i},null,8,["id"])]),_:1})]),_:1})]),_:1}),e(C,null,{default:t(()=>[e(a,{type:"primary",size:"large",onClick:u},{default:t(()=>[s(" 提交 ")]),_:1}),e(a,{size:"large",onClick:f},{default:t(()=>[s(" 取消 ")]),_:1})]),_:1})])}}}),O=N($,[["__scopeId","data-v-a76f4108"]]);export{O as default};
