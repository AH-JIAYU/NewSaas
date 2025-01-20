
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{_ as E}from"./index-CcO8xSPW.js";import{d as v,H as B,I as k,v as R,r as S,a as o,o as w,b as T,f as e,w as t,g as s,i as c,x as h,_ as y,at as F,an as M,L as z}from"./index-CaciiYLj.js";import H from"./index-DVY9uMs_.js";import{u as I}from"./useTabbar-w2yzBDm1.js";import"./configuration_homepageSetting-KR70P7Tk.js";const L=v({name:"TenantTenantHomepageSettingDetail",__name:"detail",setup(N){const l=B(),_=k(),m=I(),r=R(),i=S();function u(){i.value.submit().then(()=>{h.emit("get-data-list"),n()})}function f(){n()}function n(){r.settings.tabbar.enable&&r.settings.tabbar.mergeTabsBy!=="activeMenu"?m.close({name:"pagesExampleGeneralFormModeList"}):_.push({name:"pagesExampleGeneralFormModeList"})}return($,D)=>{const p=y,a=o("ElButton"),d=F,g=o("ElCol"),b=o("ElRow"),x=M,C=E;return w(),T("div",null,[e(d,{title:c(l).name==="routerName"?"新增首页设置":"编辑标题"},{default:t(()=>[e(a,{size:"default",round:"",onClick:n},{icon:t(()=>[e(p,{name:"i-ep:arrow-left"})]),default:t(()=>[s(" 返回 ")]),_:1})]),_:1},8,["title"]),e(x,null,{default:t(()=>[e(b,null,{default:t(()=>[e(g,{md:24,lg:16},{default:t(()=>[e(H,{id:c(l).params.id,ref_key:"formRef",ref:i},null,8,["id"])]),_:1})]),_:1})]),_:1}),e(C,null,{default:t(()=>[e(a,{type:"primary",size:"large",onClick:u},{default:t(()=>[s(" 提交 ")]),_:1}),e(a,{size:"large",onClick:f},{default:t(()=>[s(" 取消 ")]),_:1})]),_:1})])}}}),q=z(L,[["__scopeId","data-v-e951a9bb"]]);export{q as default};
