
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{_ as C}from"./index.vue_vue_type_script_setup_true_lang-Bz_zwBSA.js";import{d as x,r as d,a0 as k,a1 as u,a as v,o as V,b as D,f as o,w as s,g as f,i as E,O as z}from"./index-AWq_1fCc.js";const F=x({__name:"index",emits:["fetch-data"],setup(B,{expose:m,emit:_}){const p=_,n=d(!1),i=d(""),r=d([]);function h(e){r.value.push(e)}k("validateTopTabs",h);let t=u([]);async function b(e){e?(i.value="编辑",w(e)):(i.value="添加",t=u([{supplierAccord:"名称"}])),n.value=!0}function w(e){t.length=0,t.push({...e}),e.children&&e.children.length&&e.children.forEach(a=>{t.push({...a})})}function c(){t=u([]),p("fetch-data"),n.value=!1,r.value=[]}async function y(){const e=[];r.value.forEach(a=>{e.push(a.validate())});try{(await Promise.all(e)).every(l=>l)&&(console.log("leftTabsData",t),i.value,p("fetch-data"),c())}catch(a){console.error("Form validation failed:",a)}}return m({showEdit:b}),(e,a)=>{const l=v("el-button"),T=v("el-drawer");return V(),D("div",null,[o(T,{modelValue:n.value,"onUpdate:modelValue":a[0]||(a[0]=g=>n.value=g),class:z(i.value==="添加"?"hide-drawer-header":"edit-drawer"),"append-to-body":"","close-on-click-modal":!1,"destroy-on-close":"",draggable:"",size:"70%",title:"",onClose:c},{footer:s(()=>[o(l,{onClick:c},{default:s(()=>[f(" 取消 ")]),_:1}),o(l,{type:"warning"},{default:s(()=>[f(" 暂存 ")]),_:1}),o(l,{type:"primary",onClick:y},{default:s(()=>[f(" 确定 ")]),_:1})]),default:s(()=>[o(C,{"left-tabs-data":E(t),"validate-top-tabs":r.value},null,8,["left-tabs-data","validate-top-tabs"])]),_:1},8,["modelValue","class"])])}}});export{F as _};
