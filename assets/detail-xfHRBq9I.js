
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{_ as B}from"./index-DSfh8HJt.js";import{d as C,z as x,O as k,y as E,r as S,a,o as w,b as y,f as e,w as t,g as s,i as _,G as h,N as z,aB as N,an as T,R as $}from"./index-DXIwLSJH.js";import D from"./index-DN6wUFAP.js";import{u as F}from"./useTabbar-Bue8p077.js";import"./configuration_role-Br8L6_ja.js";const I=C({name:"SettingRoleDetail",__name:"detail",setup(M){const l=x(),c=k(),m=F(),i=E(),r=S();function u(){r.value.submit().then(()=>{h.emit("get-data-list"),n()})}function f(){n()}function n(){i.settings.tabbar.enable&&i.settings.tabbar.mergeTabsBy!=="activeMenu"?m.close({name:"multilevel_menu_exampleRole"}):c.push({name:"multilevel_menu_exampleRole"})}return(P,V)=>{const p=z,o=a("ElButton"),d=N,g=a("ElCol"),b=a("ElRow"),R=T,v=B;return w(),y("div",null,[e(d,{title:_(l).name==="routerName"?"新增角色管理":"编辑角色管理"},{default:t(()=>[e(o,{size:"default",round:"",onClick:n},{icon:t(()=>[e(p,{name:"i-ep:arrow-left"})]),default:t(()=>[s(" 返回 ")]),_:1})]),_:1},8,["title"]),e(R,null,{default:t(()=>[e(b,null,{default:t(()=>[e(g,{md:24,lg:16},{default:t(()=>[e(D,{id:_(l).params.id,ref_key:"formRef",ref:r},null,8,["id"])]),_:1})]),_:1})]),_:1}),e(v,null,{default:t(()=>[e(o,{type:"primary",size:"large",onClick:u},{default:t(()=>[s(" 提交 ")]),_:1}),e(o,{size:"large",onClick:f},{default:t(()=>[s(" 取消 ")]),_:1})]),_:1})])}}}),q=$(I,[["__scopeId","data-v-e8ad2288"]]);export{q as default};
