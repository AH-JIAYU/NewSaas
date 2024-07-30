
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{_ as C}from"./index-BR8OZnQy.js";import{d as R,s as x,M as k,q as E,r as S,a,o as w,b as h,f as e,w as t,g as s,i as _,B as y,L as z,av as M,al as N,P}from"./index-DoiK1_dJ.js";import T from"./index-DcIx1lBn.js";import{u as $}from"./useTabbar-BfNOz3n3.js";import"./configuration_role-DDW_9wi7.js";const D=R({name:"SettingRoleDetail",__name:"detail",setup(F){const l=x(),c=k(),m=$(),i=E(),r=S();function u(){r.value.submit().then(()=>{y.emit("get-data-list"),o()})}function f(){o()}function o(){i.settings.tabbar.enable&&i.settings.tabbar.mergeTabsBy!=="activeMenu"?m.close({name:"multilevel_menu_exampleRole"}):c.push({name:"multilevel_menu_exampleRole"})}return(I,V)=>{const p=z,n=a("ElButton"),d=M,g=a("ElCol"),b=a("ElRow"),v=N,B=C;return w(),h("div",null,[e(d,{title:_(l).name==="routerName"?"新增角色管理":"编辑角色管理"},{default:t(()=>[e(n,{size:"default",round:"",onClick:o},{icon:t(()=>[e(p,{name:"i-ep:arrow-left"})]),default:t(()=>[s(" 返回 ")]),_:1})]),_:1},8,["title"]),e(v,null,{default:t(()=>[e(b,null,{default:t(()=>[e(g,{md:24,lg:16},{default:t(()=>[e(T,{id:_(l).params.id,ref_key:"formRef",ref:r},null,8,["id"])]),_:1})]),_:1})]),_:1}),e(B,null,{default:t(()=>[e(n,{type:"primary",size:"large",onClick:u},{default:t(()=>[s(" 提交 ")]),_:1}),e(n,{size:"large",onClick:f},{default:t(()=>[s(" 取消 ")]),_:1})]),_:1})])}}}),G=P(D,[["__scopeId","data-v-e8ad2288"]]);export{G as default};
