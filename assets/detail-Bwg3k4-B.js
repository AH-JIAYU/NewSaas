
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{_ as x}from"./index-CGCWvo8T.js";import{d as B,q as k,s as v,u as R,r as S,a2 as o,a as h,i as w,f as e,w as t,g as s,h as c,e as y,_ as T,aC as F,ao as M,y as z}from"./index-D3S8ejkd.js";import N from"./index-Cm-gjApx.js";import{u as $}from"./useTabbar-MG2kerTi.js";import"./configuration_homepageSetting-er5LHq6E.js";const D=B({name:"TenantTenantHomepageSettingDetail",__name:"detail",setup(G){const l=k(),_=v(),m=$(),r=R(),i=S();function u(){i.value.submit().then(()=>{y.emit("get-data-list"),a()})}function f(){a()}function a(){r.settings.tabbar.enable&&r.settings.tabbar.mergeTabsBy!=="activeMenu"?m.close({name:"pagesExampleGeneralFormModeList"}):_.push({name:"pagesExampleGeneralFormModeList"})}return(H,I)=>{const p=T,n=o("ElButton"),d=F,g=o("ElCol"),b=o("ElRow"),C=M,E=x;return h(),w("div",null,[e(d,{title:c(l).name==="routerName"?"新增首页设置":"编辑标题"},{default:t(()=>[e(n,{size:"default",round:"",onClick:a},{icon:t(()=>[e(p,{name:"i-ep:arrow-left"})]),default:t(()=>[s(" 返回 ")]),_:1})]),_:1},8,["title"]),e(C,null,{default:t(()=>[e(b,null,{default:t(()=>[e(g,{md:24,lg:16},{default:t(()=>[e(N,{id:c(l).params.id,ref_key:"formRef",ref:i},null,8,["id"])]),_:1})]),_:1})]),_:1}),e(E,null,{default:t(()=>[e(n,{type:"primary",size:"large",onClick:u},{default:t(()=>[s(" 提交 ")]),_:1}),e(n,{size:"large",onClick:f},{default:t(()=>[s(" 取消 ")]),_:1})]),_:1})])}}}),j=z(D,[["__scopeId","data-v-e951a9bb"]]);export{j as default};
