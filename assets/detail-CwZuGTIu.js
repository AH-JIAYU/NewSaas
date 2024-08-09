
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{_ as C}from"./index-DsFb27BK.js";import{d as R,v as x,K as k,s as E,r as S,a,o as w,b as h,f as e,w as t,g as s,i as _,B as y,J as N,aB as z,an as T,N as $}from"./index-BdHtZquS.js";import D from"./index-CSqyf6od.js";import{u as F}from"./useTabbar-BTFEhxWQ.js";import"./configuration_role-DSqK05nC.js";const I=R({name:"SettingRoleDetail",__name:"detail",setup(M){const l=x(),c=k(),m=F(),i=E(),r=S();function u(){r.value.submit().then(()=>{y.emit("get-data-list"),n()})}function f(){n()}function n(){i.settings.tabbar.enable&&i.settings.tabbar.mergeTabsBy!=="activeMenu"?m.close({name:"multilevel_menu_exampleRole"}):c.push({name:"multilevel_menu_exampleRole"})}return(P,V)=>{const p=N,o=a("ElButton"),d=z,g=a("ElCol"),b=a("ElRow"),v=T,B=C;return w(),h("div",null,[e(d,{title:_(l).name==="routerName"?"新增角色管理":"编辑角色管理"},{default:t(()=>[e(o,{size:"default",round:"",onClick:n},{icon:t(()=>[e(p,{name:"i-ep:arrow-left"})]),default:t(()=>[s(" 返回 ")]),_:1})]),_:1},8,["title"]),e(v,null,{default:t(()=>[e(b,null,{default:t(()=>[e(g,{md:24,lg:16},{default:t(()=>[e(D,{id:_(l).params.id,ref_key:"formRef",ref:r},null,8,["id"])]),_:1})]),_:1})]),_:1}),e(B,null,{default:t(()=>[e(o,{type:"primary",size:"large",onClick:u},{default:t(()=>[s(" 提交 ")]),_:1}),e(o,{size:"large",onClick:f},{default:t(()=>[s(" 取消 ")]),_:1})]),_:1})])}}}),q=$(I,[["__scopeId","data-v-e8ad2288"]]);export{q as default};
