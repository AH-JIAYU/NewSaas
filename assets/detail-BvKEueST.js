
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{_ as R}from"./index-jEwHFW-K.js";import{d as x,I as B,J as k,y as E,r as S,a,o as w,b as y,f as e,w as t,g as s,i as _,z as h,_ as z,au as I,ao as M,M as N}from"./index-DAevhFAq.js";import T from"./index-DMv-s_F-.js";import{u as $}from"./useTabbar-raJx6Kn8.js";import"./configuration_role-AI5us4G2.js";const D=x({name:"SettingRoleDetail",__name:"detail",setup(F){const l=B(),c=k(),u=$(),i=E(),r=S();function m(){r.value.submit().then(()=>{h.emit("get-data-list"),o()})}function f(){o()}function o(){i.settings.tabbar.enable&&i.settings.tabbar.mergeTabsBy!=="activeMenu"?u.close({name:"multilevel_menu_exampleRole"}):c.push({name:"multilevel_menu_exampleRole"})}return(P,V)=>{const p=z,n=a("ElButton"),d=I,g=a("ElCol"),b=a("ElRow"),v=M,C=R;return w(),y("div",null,[e(d,{title:_(l).name==="routerName"?"新增角色":"编辑角色"},{default:t(()=>[e(n,{size:"default",round:"",onClick:o},{icon:t(()=>[e(p,{name:"i-ep:arrow-left"})]),default:t(()=>[s(" 返回 ")]),_:1})]),_:1},8,["title"]),e(v,null,{default:t(()=>[e(b,null,{default:t(()=>[e(g,{md:24,lg:16},{default:t(()=>[e(T,{id:_(l).params.id,ref_key:"formRef",ref:r},null,8,["id"])]),_:1})]),_:1})]),_:1}),e(C,null,{default:t(()=>[e(n,{type:"primary",size:"large",onClick:m},{default:t(()=>[s(" 提交 ")]),_:1}),e(n,{size:"large",onClick:f},{default:t(()=>[s(" 取消 ")]),_:1})]),_:1})])}}}),G=N(D,[["__scopeId","data-v-1d248252"]]);export{G as default};
