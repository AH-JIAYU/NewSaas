
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{_ as g}from"./index.vue_vue_type_script_setup_true_lang-DqNyBdRs.js";import{d as k,r as d,a0 as x,a1 as u,a as m,o as V,b as E,f as s,w as o,g as f,i as z,O as D}from"./index-DA0dbiYf.js";const L=k({__name:"index",emits:["fetch-data"],setup(B,{expose:v,emit:_}){const p=_,n=d(!1),i=d(""),r=d([]);function h(e){r.value.push(e)}x("validateTopTabs",h);let t=u([]);async function b(e){e?(i.value="编辑",y(e)):(i.value="添加",t=u([{name:"主项目",platform:{},screen:{},security:{}}])),n.value=!0}function y(e){t.length=0,t.push({...e}),e.children&&e.children.length&&e.children.forEach(a=>{t.push({...a})})}function c(){t=u([]),p("fetch-data"),n.value=!1,r.value=[]}async function w(){const e=[];r.value.forEach(a=>{e.push(a.validate())});try{(await Promise.all(e)).every(l=>l)&&(i.value,p("fetch-data"),c())}catch(a){console.error("Form validation failed:",a)}}return v({showEdit:b}),(e,a)=>{const l=m("el-button"),C=m("el-drawer");return V(),E("div",null,[s(C,{modelValue:n.value,"onUpdate:modelValue":a[1]||(a[1]=T=>n.value=T),class:D(i.value==="添加"?"hide-drawer-header":"edit-drawer"),"append-to-body":"","close-on-click-modal":!1,"destroy-on-close":"",draggable:"",size:"60%",onClose:c},{footer:o(()=>[s(l,{onClick:c},{default:o(()=>[f(" 取消 ")]),_:1}),s(l,{type:"warning",onClick:a[0]||(a[0]=()=>{})},{default:o(()=>[f(" 暂存 ")]),_:1}),s(l,{type:"primary",onClick:w},{default:o(()=>[f(" 确定 ")]),_:1})]),default:o(()=>[s(g,{"left-tabs-data":z(t),"validate-top-tabs":r.value},null,8,["left-tabs-data","validate-top-tabs"])]),_:1},8,["modelValue","class"])])}}});export{L as _};
