
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{_ as v}from"./index-DbSANWJS.js";import{d as x,s as B,v as k,u as R,r as S,a3 as o,b as h,j as w,g as e,w as t,h as s,i as c,e as T,_ as y,aC as z,ao as F,z as M}from"./index-D3JQ81m5.js";import N from"./index-CF0Ej6F-.js";import{u as $}from"./useTabbar-CLwFmbzW.js";import"./configuration_homepageSetting-BYNX4dcf.js";const D=x({name:"TenantTenantHomepageSettingDetail",__name:"detail",setup(G){const l=B(),_=k(),m=$(),r=R(),i=S();function u(){i.value.submit().then(()=>{T.emit("get-data-list"),a()})}function f(){a()}function a(){r.settings.tabbar.enable&&r.settings.tabbar.mergeTabsBy!=="activeMenu"?m.close({name:"pagesExampleGeneralFormModeList"}):_.push({name:"pagesExampleGeneralFormModeList"})}return(H,I)=>{const p=y,n=o("ElButton"),d=z,g=o("ElCol"),b=o("ElRow"),C=F,E=v;return h(),w("div",null,[e(d,{title:c(l).name==="routerName"?"新增首页设置":"编辑标题"},{default:t(()=>[e(n,{size:"default",round:"",onClick:a},{icon:t(()=>[e(p,{name:"i-ep:arrow-left"})]),default:t(()=>[s(" 返回 ")]),_:1})]),_:1},8,["title"]),e(C,null,{default:t(()=>[e(b,null,{default:t(()=>[e(g,{md:24,lg:16},{default:t(()=>[e(N,{id:c(l).params.id,ref_key:"formRef",ref:i},null,8,["id"])]),_:1})]),_:1})]),_:1}),e(E,null,{default:t(()=>[e(n,{type:"primary",size:"large",onClick:u},{default:t(()=>[s(" 提交 ")]),_:1}),e(n,{size:"large",onClick:f},{default:t(()=>[s(" 取消 ")]),_:1})]),_:1})])}}}),q=M(D,[["__scopeId","data-v-e951a9bb"]]);export{q as default};
