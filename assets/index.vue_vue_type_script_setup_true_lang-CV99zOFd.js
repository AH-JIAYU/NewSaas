
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{_ as b}from"./index.vue_vue_type_script_setup_true_lang-BVfBUei9.js";import{d as w,r as n,a0 as T,a1 as i,a as x,o as g,b as y,f as r,w as C,i as V}from"./index-DQumISPN.js";const z=w({__name:"index",emits:["fetch-data"],setup(k,{expose:c,emit:d}){const u=d,t=n(!1),s=n(""),o=n([]);function f(e){o.value.push(e)}T("validateTopTabs",f);let a=i([]);async function p(e){e?(s.value="编辑",m(e)):(s.value="添加",a=i([{name:"主项目",platform:{},screen:{},security:{}}])),t.value=!0}function m(e){a.length=0,a.push({...e}),e.children&&e.children.length&&e.children.forEach(l=>{a.push({...l})})}function v(){a=i([]),u("fetch-data"),t.value=!1,o.value=[]}return c({showEdit:p}),(e,l)=>{const h=x("el-drawer");return g(),y("div",null,[r(h,{class:"hide-drawer-header",modelValue:t.value,"onUpdate:modelValue":l[0]||(l[0]=_=>t.value=_),"append-to-body":"","close-on-click-modal":!1,"destroy-on-close":"",draggable:"",size:"60%",title:s.value,onClose:v},{default:C(()=>[r(b,{"left-tabs-data":V(a),"validate-top-tabs":o.value},null,8,["left-tabs-data","validate-top-tabs"])]),_:1},8,["modelValue","title"])])}}});export{z as _};
