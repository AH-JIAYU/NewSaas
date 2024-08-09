
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{_ as C}from"./index-DGyvJnoz.js";import{d as R,v as x,K as k,s as E,r as S,a,o as w,b as h,f as e,w as t,g as s,i as _,B as y,J as N,au as z,am as T,N as $}from"./index-CyRDEfVX.js";import D from"./index-2QiFlH2r.js";import{u as F}from"./useTabbar-BGkIZK8q.js";import"./configuration_role-BMcdws11.js";const I=R({name:"SettingRoleDetail",__name:"detail",setup(M){const l=x(),c=k(),m=F(),i=E(),r=S();function u(){r.value.submit().then(()=>{y.emit("get-data-list"),o()})}function f(){o()}function o(){i.settings.tabbar.enable&&i.settings.tabbar.mergeTabsBy!=="activeMenu"?m.close({name:"multilevel_menu_exampleRole"}):c.push({name:"multilevel_menu_exampleRole"})}return(P,V)=>{const p=N,n=a("ElButton"),d=z,g=a("ElCol"),b=a("ElRow"),v=T,B=C;return w(),h("div",null,[e(d,{title:_(l).name==="routerName"?"新增角色管理":"编辑角色管理"},{default:t(()=>[e(n,{size:"default",round:"",onClick:o},{icon:t(()=>[e(p,{name:"i-ep:arrow-left"})]),default:t(()=>[s(" 返回 ")]),_:1})]),_:1},8,["title"]),e(v,null,{default:t(()=>[e(b,null,{default:t(()=>[e(g,{md:24,lg:16},{default:t(()=>[e(D,{id:_(l).params.id,ref_key:"formRef",ref:r},null,8,["id"])]),_:1})]),_:1})]),_:1}),e(B,null,{default:t(()=>[e(n,{type:"primary",size:"large",onClick:u},{default:t(()=>[s(" 提交 ")]),_:1}),e(n,{size:"large",onClick:f},{default:t(()=>[s(" 取消 ")]),_:1})]),_:1})])}}}),q=$(I,[["__scopeId","data-v-e8ad2288"]]);export{q as default};
