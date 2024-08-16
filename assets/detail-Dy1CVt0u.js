
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{_ as C}from"./index-Cvp1DPnW.js";import{d as x,z as B,O as E,y as k,r as S,a,o as w,b as y,f as e,w as t,g as s,i as _,G as h,N as z,aE as N,aq as T,R as $}from"./index-Bb0m2dFC.js";import D from"./index-CPPTUH8u.js";import{u as F}from"./useTabbar-C3j06yyE.js";import"./configuration_role-ctWpaYZI.js";const I=x({name:"SettingRoleDetail",__name:"detail",setup(M){const l=B(),c=E(),m=F(),i=k(),r=S();function u(){r.value.submit().then(()=>{h.emit("get-data-list"),o()})}function f(){o()}function o(){i.settings.tabbar.enable&&i.settings.tabbar.mergeTabsBy!=="activeMenu"?m.close({name:"multilevel_menu_exampleRole"}):c.push({name:"multilevel_menu_exampleRole"})}return(P,V)=>{const p=z,n=a("ElButton"),d=N,g=a("ElCol"),b=a("ElRow"),R=T,v=C;return w(),y("div",null,[e(d,{title:_(l).name==="routerName"?"新增角色管理":"编辑角色管理"},{default:t(()=>[e(n,{size:"default",round:"",onClick:o},{icon:t(()=>[e(p,{name:"i-ep:arrow-left"})]),default:t(()=>[s(" 返回 ")]),_:1})]),_:1},8,["title"]),e(R,null,{default:t(()=>[e(b,null,{default:t(()=>[e(g,{md:24,lg:16},{default:t(()=>[e(D,{id:_(l).params.id,ref_key:"formRef",ref:r},null,8,["id"])]),_:1})]),_:1})]),_:1}),e(v,null,{default:t(()=>[e(n,{type:"primary",size:"large",onClick:u},{default:t(()=>[s(" 提交 ")]),_:1}),e(n,{size:"large",onClick:f},{default:t(()=>[s(" 取消 ")]),_:1})]),_:1})])}}}),j=$(I,[["__scopeId","data-v-e8ad2288"]]);export{j as default};
