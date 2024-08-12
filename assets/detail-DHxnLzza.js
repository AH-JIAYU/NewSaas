
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{_ as B}from"./index-BVO6pzGO.js";import{d as C,y as R,N as k,x as E,r as S,a,o as w,b as y,f as e,w as t,g as s,i as _,D as h,M as N,aB as z,an as D,Q as M}from"./index-BQjh9Koe.js";import T from"./index-5toI_0iW.js";import{u as $}from"./useTabbar-DblkV-4l.js";import"./configuration_role-D_Xtr-zD.js";const F=C({name:"SettingRoleDetail",__name:"detail",setup(I){const l=R(),c=k(),m=$(),i=E(),r=S();function u(){r.value.submit().then(()=>{h.emit("get-data-list"),n()})}function f(){n()}function n(){i.settings.tabbar.enable&&i.settings.tabbar.mergeTabsBy!=="activeMenu"?m.close({name:"multilevel_menu_exampleRole"}):c.push({name:"multilevel_menu_exampleRole"})}return(P,V)=>{const p=N,o=a("ElButton"),d=z,g=a("ElCol"),b=a("ElRow"),v=D,x=B;return w(),y("div",null,[e(d,{title:_(l).name==="routerName"?"新增角色管理":"编辑角色管理"},{default:t(()=>[e(o,{size:"default",round:"",onClick:n},{icon:t(()=>[e(p,{name:"i-ep:arrow-left"})]),default:t(()=>[s(" 返回 ")]),_:1})]),_:1},8,["title"]),e(v,null,{default:t(()=>[e(b,null,{default:t(()=>[e(g,{md:24,lg:16},{default:t(()=>[e(T,{id:_(l).params.id,ref_key:"formRef",ref:r},null,8,["id"])]),_:1})]),_:1})]),_:1}),e(x,null,{default:t(()=>[e(o,{type:"primary",size:"large",onClick:u},{default:t(()=>[s(" 提交 ")]),_:1}),e(o,{size:"large",onClick:f},{default:t(()=>[s(" 取消 ")]),_:1})]),_:1})])}}}),G=M(F,[["__scopeId","data-v-e8ad2288"]]);export{G as default};
