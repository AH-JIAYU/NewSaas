
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{_ as v}from"./index-DbSANWJS.js";import{d as x,s as B,v as k,u as R,r as h,a3 as n,b as w,j as y,g as e,w as t,h as s,i as c,e as M,_ as S,aC as z,ao as F,z as D}from"./index-D3JQ81m5.js";import{D as N}from"./index-Dbll3mCx.js";import{u as T}from"./useTabbar-CLwFmbzW.js";import"./index-DkOs4Kru.js";import"./index-iJRjh0Y-.js";import"./zh_Hans-CrfEz-Jr.js";const $=x({name:"MybillDetail",__name:"detail",setup(G){const l=B(),m=k(),_=T(),r=R(),i=h();function u(){i.value.submit().then(()=>{M.emit("get-data-list"),o()})}function p(){o()}function o(){r.settings.tabbar.enable&&r.settings.tabbar.mergeTabsBy!=="activeMenu"?_.close({name:"pagesExampleGeneralFormModeList"}):m.push({name:"pagesExampleGeneralFormModeList"})}return(I,L)=>{const f=S,a=n("ElButton"),d=z,g=n("ElCol"),b=n("ElRow"),C=F,E=v;return w(),y("div",null,[e(d,{title:c(l).name==="routerName"?"新增我的账单":"编辑我的账单"},{default:t(()=>[e(a,{size:"default",round:"",onClick:o},{icon:t(()=>[e(f,{name:"i-ep:arrow-left"})]),default:t(()=>[s(" 返回 ")]),_:1})]),_:1},8,["title"]),e(C,null,{default:t(()=>[e(b,null,{default:t(()=>[e(g,{md:24,lg:16},{default:t(()=>[e(N,{id:c(l).params.id,ref_key:"formRef",ref:i},null,8,["id"])]),_:1})]),_:1})]),_:1}),e(E,null,{default:t(()=>[e(a,{type:"primary",size:"large",onClick:u},{default:t(()=>[s(" 提交 ")]),_:1}),e(a,{size:"large",onClick:p},{default:t(()=>[s(" 取消 ")]),_:1})]),_:1})])}}}),K=D($,[["__scopeId","data-v-b78bce29"]]);export{K as default};
