
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{_ as C}from"./index-gUFESVr8.js";import{d as R,y as B,N as k,x as E,r as S,a,o as w,b as y,f as e,w as t,g as s,i as _,D as h,M as D,aD as N,ap as z,Q as M}from"./index-CIFOFIw0.js";import T from"./index-DDOKMZ3Z.js";import{u as $}from"./useTabbar-CGzsmyor.js";import"./configuration_role-CDVCh5MX.js";const F=R({name:"SettingRoleDetail",__name:"detail",setup(I){const l=B(),c=k(),m=$(),i=E(),r=S();function u(){r.value.submit().then(()=>{h.emit("get-data-list"),o()})}function f(){o()}function o(){i.settings.tabbar.enable&&i.settings.tabbar.mergeTabsBy!=="activeMenu"?m.close({name:"multilevel_menu_exampleRole"}):c.push({name:"multilevel_menu_exampleRole"})}return(P,V)=>{const p=D,n=a("ElButton"),d=N,g=a("ElCol"),b=a("ElRow"),v=z,x=C;return w(),y("div",null,[e(d,{title:_(l).name==="routerName"?"新增角色管理":"编辑角色管理"},{default:t(()=>[e(n,{size:"default",round:"",onClick:o},{icon:t(()=>[e(p,{name:"i-ep:arrow-left"})]),default:t(()=>[s(" 返回 ")]),_:1})]),_:1},8,["title"]),e(v,null,{default:t(()=>[e(b,null,{default:t(()=>[e(g,{md:24,lg:16},{default:t(()=>[e(T,{id:_(l).params.id,ref_key:"formRef",ref:r},null,8,["id"])]),_:1})]),_:1})]),_:1}),e(x,null,{default:t(()=>[e(n,{type:"primary",size:"large",onClick:u},{default:t(()=>[s(" 提交 ")]),_:1}),e(n,{size:"large",onClick:f},{default:t(()=>[s(" 取消 ")]),_:1})]),_:1})])}}}),G=M(F,[["__scopeId","data-v-e8ad2288"]]);export{G as default};
