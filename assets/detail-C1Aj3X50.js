
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{_ as R}from"./index-DJwWqIaa.js";import{d as x,q as B,s as k,u as E,r as S,a2 as a,a as h,i as w,f as e,w as t,g as s,h as _,e as y,_ as z,aC as N,ao as T,y as $}from"./index-C9fHoe7f.js";import D from"./index-BEs8Nmpb.js";import{u as F}from"./useTabbar-tgsU7dC6.js";import"./configuration_role-WL4RT13J.js";const I=x({name:"SettingRoleDetail",__name:"detail",setup(M){const l=B(),c=k(),u=F(),i=E(),r=S();function m(){r.value.submit().then(()=>{y.emit("get-data-list"),o()})}function f(){o()}function o(){i.settings.tabbar.enable&&i.settings.tabbar.mergeTabsBy!=="activeMenu"?u.close({name:"multilevel_menu_exampleRole"}):c.push({name:"multilevel_menu_exampleRole"})}return(P,V)=>{const p=z,n=a("ElButton"),d=N,g=a("ElCol"),b=a("ElRow"),C=T,v=R;return h(),w("div",null,[e(d,{title:_(l).name==="routerName"?"新增角色":"编辑角色"},{default:t(()=>[e(n,{size:"default",round:"",onClick:o},{icon:t(()=>[e(p,{name:"i-ep:arrow-left"})]),default:t(()=>[s(" 返回 ")]),_:1})]),_:1},8,["title"]),e(C,null,{default:t(()=>[e(b,null,{default:t(()=>[e(g,{md:24,lg:16},{default:t(()=>[e(D,{id:_(l).params.id,ref_key:"formRef",ref:r},null,8,["id"])]),_:1})]),_:1})]),_:1}),e(v,null,{default:t(()=>[e(n,{type:"primary",size:"large",onClick:m},{default:t(()=>[s(" 提交 ")]),_:1}),e(n,{size:"large",onClick:f},{default:t(()=>[s(" 取消 ")]),_:1})]),_:1})])}}}),J=$(I,[["__scopeId","data-v-1d248252"]]);export{J as default};
