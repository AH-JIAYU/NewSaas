
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{_ as E}from"./index-ofxL_6RX.js";import{d as v,v as x,K as k,s as R,r as w,a as n,o as y,b as M,f as e,w as t,g as s,i as c,B as S,J as h,au as F,am as N,N as z}from"./index-CHTO5iG0.js";import T from"./index-SYAM7AUm.js";import{u as $}from"./useTabbar-x4HFUdN-.js";import"./announcement-quHvIMAw.js";const D=v({name:"MybillDetail",__name:"detail",setup(G){const l=x(),m=k(),_=$(),r=R(),i=w();function u(){i.value.submit().then(()=>{S.emit("get-data-list"),o()})}function f(){o()}function o(){r.settings.tabbar.enable&&r.settings.tabbar.mergeTabsBy!=="activeMenu"?_.close({name:"pagesExampleGeneralFormModeList"}):m.push({name:"pagesExampleGeneralFormModeList"})}return(I,L)=>{const p=h,a=n("ElButton"),d=F,g=n("ElCol"),b=n("ElRow"),B=N,C=E;return y(),M("div",null,[e(d,{title:c(l).name==="routerName"?"新增我的账单":"编辑我的账单"},{default:t(()=>[e(a,{size:"default",round:"",onClick:o},{icon:t(()=>[e(p,{name:"i-ep:arrow-left"})]),default:t(()=>[s(" 返回 ")]),_:1})]),_:1},8,["title"]),e(B,null,{default:t(()=>[e(b,null,{default:t(()=>[e(g,{md:24,lg:16},{default:t(()=>[e(T,{id:c(l).params.id,ref_key:"formRef",ref:i},null,8,["id"])]),_:1})]),_:1})]),_:1}),e(C,null,{default:t(()=>[e(a,{type:"primary",size:"large",onClick:u},{default:t(()=>[s(" 提交 ")]),_:1}),e(a,{size:"large",onClick:f},{default:t(()=>[s(" 取消 ")]),_:1})]),_:1})])}}}),K=z(D,[["__scopeId","data-v-a76f4108"]]);export{K as default};
