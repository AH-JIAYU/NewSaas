
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{_ as B}from"./index-DFn6OKOI.js";import{d as k,s as v,L as E,t as x,r as R,a,o as h,b as w,f as e,w as t,g as s,i as c,C as L,K as S,as as q,q as z,_ as D}from"./index-C32xF_ni.js";import{D as F}from"./index-BBM5ul9n.js";import{u as T}from"./useTabbar-CpgdsKnT.js";import"./index-BERQB40D.js";const $=k({name:"OtherFunctionsQuestionLibrary Detail",__name:"detail",setup(I){const r=v(),u=E(),_=T(),i=x(),l=R();function m(){l.value.submit().then(()=>{L.emit("get-data-list"),n()})}function f(){n()}function n(){i.settings.tabbar.enable&&i.settings.tabbar.mergeTabsBy!=="activeMenu"?_.close({name:"questionLibrary"}):u.push({name:"questionLibrary"})}return(M,N)=>{const p=S,o=a("ElButton"),d=q,b=a("ElCol"),g=a("ElRow"),C=z,y=B;return h(),w("div",null,[e(d,{title:c(r).name==="questionLibraryCreate"?"新增问题库":"编辑问题库"},{default:t(()=>[e(o,{size:"default",round:"",onClick:n},{icon:t(()=>[e(p,{name:"i-ep:arrow-left"})]),default:t(()=>[s(" 返回 ")]),_:1})]),_:1},8,["title"]),e(C,null,{default:t(()=>[e(g,null,{default:t(()=>[e(b,{md:24,lg:16},{default:t(()=>[e(F,{id:c(r).params.id,ref_key:"formRef",ref:l},null,8,["id"])]),_:1})]),_:1})]),_:1}),e(y,null,{default:t(()=>[e(o,{type:"primary",size:"large",onClick:m},{default:t(()=>[s(" 提交 ")]),_:1}),e(o,{size:"large",onClick:f},{default:t(()=>[s(" 取消 ")]),_:1})]),_:1})])}}}),O=D($,[["__scopeId","data-v-09e66f81"]]);export{O as default};
