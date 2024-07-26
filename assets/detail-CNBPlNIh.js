
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{_ as C}from"./index-lp6xs_18.js";import{d as R,q as k,M as x,p as E,r as S,a,o as w,b as h,f as e,w as t,g as s,i as _,B as y,L as z,at as M,ak as N,P}from"./index-BRyMcolp.js";import T from"./index-COA2m5gM.js";import{u as $}from"./useTabbar-D9cKg0os.js";import"./configuration_role-CAo_QI8F.js";const D=R({name:"SettingRoleDetail",__name:"detail",setup(F){const l=k(),c=x(),m=$(),i=E(),r=S();function u(){r.value.submit().then(()=>{y.emit("get-data-list"),o()})}function f(){o()}function o(){i.settings.tabbar.enable&&i.settings.tabbar.mergeTabsBy!=="activeMenu"?m.close({name:"multilevel_menu_exampleRole"}):c.push({name:"multilevel_menu_exampleRole"})}return(I,V)=>{const p=z,n=a("ElButton"),d=M,g=a("ElCol"),b=a("ElRow"),v=N,B=C;return w(),h("div",null,[e(d,{title:_(l).name==="routerName"?"新增角色管理":"编辑角色管理"},{default:t(()=>[e(n,{size:"default",round:"",onClick:o},{icon:t(()=>[e(p,{name:"i-ep:arrow-left"})]),default:t(()=>[s(" 返回 ")]),_:1})]),_:1},8,["title"]),e(v,null,{default:t(()=>[e(b,null,{default:t(()=>[e(g,{md:24,lg:16},{default:t(()=>[e(T,{id:_(l).params.id,ref_key:"formRef",ref:r},null,8,["id"])]),_:1})]),_:1})]),_:1}),e(B,null,{default:t(()=>[e(n,{type:"primary",size:"large",onClick:u},{default:t(()=>[s(" 提交 ")]),_:1}),e(n,{size:"large",onClick:f},{default:t(()=>[s(" 取消 ")]),_:1})]),_:1})])}}}),G=P(D,[["__scopeId","data-v-e8ad2288"]]);export{G as default};
