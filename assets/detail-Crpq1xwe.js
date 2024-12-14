
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{_ as C}from"./index-DYm1oMy1.js";import{d as R,H as B,I as k,v as E,r as S,a,o as w,b as h,f as e,w as t,g as s,i as _,x as y,_ as z,at as I,an as N,L as T}from"./index-DwcK68j4.js";import $ from"./index-CJQrckCU.js";import{u as D}from"./useTabbar-cXvIgVxk.js";import"./configuration_role-DrpLdUTD.js";const F=R({name:"SettingRoleDetail",__name:"detail",setup(H){const l=B(),c=k(),m=D(),i=E(),r=S();function u(){r.value.submit().then(()=>{y.emit("get-data-list"),n()})}function f(){n()}function n(){i.settings.tabbar.enable&&i.settings.tabbar.mergeTabsBy!=="activeMenu"?m.close({name:"multilevel_menu_exampleRole"}):c.push({name:"multilevel_menu_exampleRole"})}return(M,P)=>{const p=z,o=a("ElButton"),d=I,g=a("ElCol"),b=a("ElRow"),v=N,x=C;return w(),h("div",null,[e(d,{title:_(l).name==="routerName"?"新增角色":"编辑角色"},{default:t(()=>[e(o,{size:"default",round:"",onClick:n},{icon:t(()=>[e(p,{name:"i-ep:arrow-left"})]),default:t(()=>[s(" 返回 ")]),_:1})]),_:1},8,["title"]),e(v,null,{default:t(()=>[e(b,null,{default:t(()=>[e(g,{md:24,lg:16},{default:t(()=>[e($,{id:_(l).params.id,ref_key:"formRef",ref:r},null,8,["id"])]),_:1})]),_:1})]),_:1}),e(x,null,{default:t(()=>[e(o,{type:"primary",size:"large",onClick:u},{default:t(()=>[s(" 提交 ")]),_:1}),e(o,{size:"large",onClick:f},{default:t(()=>[s(" 取消 ")]),_:1})]),_:1})])}}}),G=T(F,[["__scopeId","data-v-1d248252"]]);export{G as default};
