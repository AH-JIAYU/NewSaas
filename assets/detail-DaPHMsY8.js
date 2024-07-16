
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{_ as R}from"./index-BwSfE_oD.js";import{d as k,s as x,M as B,q as E,r as S,a,o as w,b as h,f as e,w as t,g as s,i as _,C as y,L as z,at as M,ak as N,P}from"./index-CWfNE84P.js";import T from"./index-DbWzKNWK.js";import{u as $}from"./useTabbar-XhIQlHpO.js";import"./configuration_role-DBh_W_ec.js";const D=k({name:"SettingRoleDetail",__name:"detail",setup(F){const l=x(),c=B(),m=$(),i=E(),r=S();function u(){r.value.submit().then(()=>{y.emit("get-data-list"),o()})}function f(){o()}function o(){i.settings.tabbar.enable&&i.settings.tabbar.mergeTabsBy!=="activeMenu"?m.close({name:"multilevel_menu_exampleRole"}):c.push({name:"multilevel_menu_exampleRole"})}return(I,V)=>{const p=z,n=a("ElButton"),d=M,g=a("ElCol"),b=a("ElRow"),C=N,v=R;return w(),h("div",null,[e(d,{title:_(l).name==="routerName"?"新增角色管理":"编辑角色管理"},{default:t(()=>[e(n,{size:"default",round:"",onClick:o},{icon:t(()=>[e(p,{name:"i-ep:arrow-left"})]),default:t(()=>[s(" 返回 ")]),_:1})]),_:1},8,["title"]),e(C,null,{default:t(()=>[e(b,null,{default:t(()=>[e(g,{md:24,lg:16},{default:t(()=>[e(T,{id:_(l).params.id,ref_key:"formRef",ref:r},null,8,["id"])]),_:1})]),_:1})]),_:1}),e(v,null,{default:t(()=>[e(n,{type:"primary",size:"large",onClick:u},{default:t(()=>[s(" 提交 ")]),_:1}),e(n,{size:"large",onClick:f},{default:t(()=>[s(" 取消 ")]),_:1})]),_:1})])}}}),G=P(D,[["__scopeId","data-v-e8ad2288"]]);export{G as default};
