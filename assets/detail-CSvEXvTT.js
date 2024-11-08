
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{_ as C}from"./index-DcfeddWj.js";import{d as R,H as B,I as k,v as E,r as S,a,o as w,b as h,f as e,w as t,g as s,i as _,x as y,_ as z,av as I,ap as N,L as T}from"./index-DK9KDSNt.js";import $ from"./index-B98Lei0K.js";import{u as D}from"./useTabbar-CHjOdvay.js";import"./configuration_role-CKgR9dAN.js";const F=R({name:"SettingRoleDetail",__name:"detail",setup(H){const l=B(),c=k(),m=D(),i=E(),r=S();function u(){r.value.submit().then(()=>{y.emit("get-data-list"),o()})}function f(){o()}function o(){i.settings.tabbar.enable&&i.settings.tabbar.mergeTabsBy!=="activeMenu"?m.close({name:"multilevel_menu_exampleRole"}):c.push({name:"multilevel_menu_exampleRole"})}return(M,P)=>{const p=z,n=a("ElButton"),d=I,g=a("ElCol"),b=a("ElRow"),v=N,x=C;return w(),h("div",null,[e(d,{title:_(l).name==="routerName"?"新增角色管理":"编辑角色管理"},{default:t(()=>[e(n,{size:"default",round:"",onClick:o},{icon:t(()=>[e(p,{name:"i-ep:arrow-left"})]),default:t(()=>[s(" 返回 ")]),_:1})]),_:1},8,["title"]),e(v,null,{default:t(()=>[e(b,null,{default:t(()=>[e(g,{md:24,lg:16},{default:t(()=>[e($,{id:_(l).params.id,ref_key:"formRef",ref:r},null,8,["id"])]),_:1})]),_:1})]),_:1}),e(x,null,{default:t(()=>[e(n,{type:"primary",size:"large",onClick:u},{default:t(()=>[s(" 提交 ")]),_:1}),e(n,{size:"large",onClick:f},{default:t(()=>[s(" 取消 ")]),_:1})]),_:1})])}}}),G=T(F,[["__scopeId","data-v-e8ad2288"]]);export{G as default};
