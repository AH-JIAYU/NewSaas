
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{_ as x}from"./index-C4irRxFb.js";import{d as R,x as B,M as E,v as k,r as S,a,o as w,b as h,f as e,w as t,g as s,i as _,C as y,L as z,aE as M,aq as N,P}from"./index-DntGxMRg.js";import T from"./index-atbH9msj.js";import{u as $}from"./useTabbar-BIk3kekB.js";import"./configuration_role-9yA6ue5l.js";const D=R({name:"SettingRoleDetail",__name:"detail",setup(F){const l=B(),c=E(),m=$(),i=k(),r=S();function u(){r.value.submit().then(()=>{y.emit("get-data-list"),o()})}function f(){o()}function o(){i.settings.tabbar.enable&&i.settings.tabbar.mergeTabsBy!=="activeMenu"?m.close({name:"multilevel_menu_exampleRole"}):c.push({name:"multilevel_menu_exampleRole"})}return(I,V)=>{const p=z,n=a("ElButton"),d=M,g=a("ElCol"),b=a("ElRow"),v=N,C=x;return w(),h("div",null,[e(d,{title:_(l).name==="routerName"?"新增角色管理":"编辑角色管理"},{default:t(()=>[e(n,{size:"default",round:"",onClick:o},{icon:t(()=>[e(p,{name:"i-ep:arrow-left"})]),default:t(()=>[s(" 返回 ")]),_:1})]),_:1},8,["title"]),e(v,null,{default:t(()=>[e(b,null,{default:t(()=>[e(g,{md:24,lg:16},{default:t(()=>[e(T,{id:_(l).params.id,ref_key:"formRef",ref:r},null,8,["id"])]),_:1})]),_:1})]),_:1}),e(C,null,{default:t(()=>[e(n,{type:"primary",size:"large",onClick:u},{default:t(()=>[s(" 提交 ")]),_:1}),e(n,{size:"large",onClick:f},{default:t(()=>[s(" 取消 ")]),_:1})]),_:1})])}}}),G=P(D,[["__scopeId","data-v-e8ad2288"]]);export{G as default};
