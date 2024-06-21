
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{_ as p}from"./index-C6je7MqD.js";import{d,v as b,O as g,t as B,r as v,a as y,o as h,b as k,f as e,w as t,i as x,g as i,H as C,s as S,_ as R}from"./index-QzTLBS9C.js";import{D}from"./index-DU4WKKEv.js";import{u as E}from"./useTabbar-BtDJ0mGt.js";import"./apiLoading-DOvOeYtT.js";import"./otherFunctions_screenLibrary-CztaMELx.js";import"./basicDictionary-h7Y0HjPs.js";import"./otherFunctions_basicDictionary-0g0PKaVr.js";const F={class:"absolute-container"},L=d({name:"OtherFunctionsScreenLibraryDetail",__name:"detail",setup(O){const c=b(),u=g(),m=E(),n=B(),o=v();function a(){o.value.submit().then(()=>{C.emit("get-data-list"),s()})}function l(){s()}function s(){n.settings.tabbar.enable&&n.settings.tabbar.mergeTabsBy!=="activeMenu"?m.close({name:"screenLibrary"}):u.push({name:"screenLibrary"})}return(T,w)=>{const _=S,r=y("ElButton"),f=p;return h(),k("div",F,[e(_,null,{default:t(()=>[e(D,{id:x(c).params.id,ref_key:"formRef",ref:o,onOnSubmit:a},null,8,["id"])]),_:1}),e(f,null,{default:t(()=>[e(r,{type:"primary",size:"large",onClick:a},{default:t(()=>[i(" 提交 ")]),_:1}),e(r,{size:"large",onClick:l},{default:t(()=>[i(" 取消 ")]),_:1})]),_:1})])}}}),$=R(L,[["__scopeId","data-v-0320553c"]]);export{$ as default};
