
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{_ as C}from"./index-77YzzfOW.js";import{d as R,n as B,G as k,l as E,r as S,a,o as w,b as h,f as e,w as t,g as s,i as _,x as y,F as z,at as F,aj as N,J as T}from"./index-C4R2SyQS.js";import $ from"./index-yEA8YZZz.js";import{u as D}from"./useTabbar-Y8D438u4.js";import"./configuration_role-CGznFQYr.js";const I=R({name:"SettingRoleDetail",__name:"detail",setup(M){const l=B(),c=k(),m=D(),i=E(),r=S();function u(){r.value.submit().then(()=>{y.emit("get-data-list"),n()})}function f(){n()}function n(){i.settings.tabbar.enable&&i.settings.tabbar.mergeTabsBy!=="activeMenu"?m.close({name:"multilevel_menu_exampleRole"}):c.push({name:"multilevel_menu_exampleRole"})}return(P,V)=>{const p=z,o=a("ElButton"),d=F,g=a("ElCol"),b=a("ElRow"),v=N,x=C;return w(),h("div",null,[e(d,{title:_(l).name==="routerName"?"新增角色管理":"编辑角色管理"},{default:t(()=>[e(o,{size:"default",round:"",onClick:n},{icon:t(()=>[e(p,{name:"i-ep:arrow-left"})]),default:t(()=>[s(" 返回 ")]),_:1})]),_:1},8,["title"]),e(v,null,{default:t(()=>[e(b,null,{default:t(()=>[e(g,{md:24,lg:16},{default:t(()=>[e($,{id:_(l).params.id,ref_key:"formRef",ref:r},null,8,["id"])]),_:1})]),_:1})]),_:1}),e(x,null,{default:t(()=>[e(o,{type:"primary",size:"large",onClick:u},{default:t(()=>[s(" 提交 ")]),_:1}),e(o,{size:"large",onClick:f},{default:t(()=>[s(" 取消 ")]),_:1})]),_:1})])}}}),q=T(I,[["__scopeId","data-v-e8ad2288"]]);export{q as default};
