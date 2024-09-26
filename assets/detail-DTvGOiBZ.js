
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{_ as B}from"./index-BtHLk_H-.js";import{d as C,z as x,O as k,y as E,r as S,b as a,o as h,e as w,g as e,w as t,h as s,j as _,G as y,N as z,aB as N,ap as T,R as $}from"./index-LpvUbtoC.js";import D from"./index-DbLTvMz7.js";import{u as F}from"./useTabbar-HSDkhyf7.js";import"./configuration_role-ByDvrTKj.js";const I=C({name:"SettingRoleDetail",__name:"detail",setup(M){const l=x(),c=k(),m=F(),r=E(),i=S();function u(){i.value.submit().then(()=>{y.emit("get-data-list"),o()})}function f(){o()}function o(){r.settings.tabbar.enable&&r.settings.tabbar.mergeTabsBy!=="activeMenu"?m.close({name:"multilevel_menu_exampleRole"}):c.push({name:"multilevel_menu_exampleRole"})}return(P,V)=>{const p=z,n=a("ElButton"),d=N,g=a("ElCol"),b=a("ElRow"),R=T,v=B;return h(),w("div",null,[e(d,{title:_(l).name==="routerName"?"新增角色管理":"编辑角色管理"},{default:t(()=>[e(n,{size:"default",round:"",onClick:o},{icon:t(()=>[e(p,{name:"i-ep:arrow-left"})]),default:t(()=>[s(" 返回 ")]),_:1})]),_:1},8,["title"]),e(R,null,{default:t(()=>[e(b,null,{default:t(()=>[e(g,{md:24,lg:16},{default:t(()=>[e(D,{id:_(l).params.id,ref_key:"formRef",ref:i},null,8,["id"])]),_:1})]),_:1})]),_:1}),e(v,null,{default:t(()=>[e(n,{type:"primary",size:"large",onClick:u},{default:t(()=>[s(" 提交 ")]),_:1}),e(n,{size:"large",onClick:f},{default:t(()=>[s(" 取消 ")]),_:1})]),_:1})])}}}),q=$(I,[["__scopeId","data-v-e8ad2288"]]);export{q as default};
