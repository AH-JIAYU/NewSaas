
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{_ as B}from"./index-BVO6pzGO.js";import{d as E,y as k,N as v,x as R,r as w,a,o as y,b as M,f as e,w as t,g as s,i as c,D as S,M as h,aB as D,an as F,Q as N}from"./index-BQjh9Koe.js";import{D as z}from"./index-BmxOzSEJ.js";import{u as T}from"./useTabbar-DblkV-4l.js";const $=E({name:"ConfigurationApplicationCenterDetail",__name:"detail",setup(A){const l=k(),_=v(),m=T(),r=R(),i=w();function u(){i.value.submit().then(()=>{S.emit("get-data-list"),n()})}function f(){n()}function n(){r.settings.tabbar.enable&&r.settings.tabbar.mergeTabsBy!=="activeMenu"?m.close({name:"pagesExampleGeneralFormModeList"}):_.push({name:"pagesExampleGeneralFormModeList"})}return(G,I)=>{const p=h,o=a("ElButton"),d=D,g=a("ElCol"),b=a("ElRow"),C=F,x=B;return y(),M("div",null,[e(d,{title:c(l).name==="routerName"?"新增应用中心":"编辑应用中心"},{default:t(()=>[e(o,{size:"default",round:"",onClick:n},{icon:t(()=>[e(p,{name:"i-ep:arrow-left"})]),default:t(()=>[s(" 返回 ")]),_:1})]),_:1},8,["title"]),e(C,null,{default:t(()=>[e(b,null,{default:t(()=>[e(g,{md:24,lg:16},{default:t(()=>[e(z,{id:c(l).params.id,ref_key:"formRef",ref:i},null,8,["id"])]),_:1})]),_:1})]),_:1}),e(x,null,{default:t(()=>[e(o,{type:"primary",size:"large",onClick:u},{default:t(()=>[s(" 提交 ")]),_:1}),e(o,{size:"large",onClick:f},{default:t(()=>[s(" 取消 ")]),_:1})]),_:1})])}}}),Q=N($,[["__scopeId","data-v-6f9be788"]]);export{Q as default};
