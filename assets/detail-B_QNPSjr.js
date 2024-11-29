
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{_ as E}from"./index-Dvraybxf.js";import{d as v,H as B,I as k,v as R,r as S,a as o,o as w,b as T,f as e,w as t,g as s,i as c,x as h,_ as y,au as F,an as M,L as z}from"./index-NZXF151a.js";import H from"./index-jDKywN55.js";import{u as I}from"./useTabbar-DD8Q6QQo.js";import"./configuration_homepageSetting-CxZnBm3c.js";const L=v({name:"TenantTenantHomepageSettingDetail",__name:"detail",setup(N){const l=B(),_=k(),m=I(),r=R(),i=S();function u(){i.value.submit().then(()=>{h.emit("get-data-list"),a()})}function f(){a()}function a(){r.settings.tabbar.enable&&r.settings.tabbar.mergeTabsBy!=="activeMenu"?m.close({name:"pagesExampleGeneralFormModeList"}):_.push({name:"pagesExampleGeneralFormModeList"})}return($,D)=>{const p=y,n=o("ElButton"),d=F,g=o("ElCol"),b=o("ElRow"),x=M,C=E;return w(),T("div",null,[e(d,{title:c(l).name==="routerName"?"新增首页设置":"编辑首页设置"},{default:t(()=>[e(n,{size:"default",round:"",onClick:a},{icon:t(()=>[e(p,{name:"i-ep:arrow-left"})]),default:t(()=>[s(" 返回 ")]),_:1})]),_:1},8,["title"]),e(x,null,{default:t(()=>[e(b,null,{default:t(()=>[e(g,{md:24,lg:16},{default:t(()=>[e(H,{id:c(l).params.id,ref_key:"formRef",ref:i},null,8,["id"])]),_:1})]),_:1})]),_:1}),e(C,null,{default:t(()=>[e(n,{type:"primary",size:"large",onClick:u},{default:t(()=>[s(" 提交 ")]),_:1}),e(n,{size:"large",onClick:f},{default:t(()=>[s(" 取消 ")]),_:1})]),_:1})])}}}),q=z(L,[["__scopeId","data-v-c2d5a8ad"]]);export{q as default};
