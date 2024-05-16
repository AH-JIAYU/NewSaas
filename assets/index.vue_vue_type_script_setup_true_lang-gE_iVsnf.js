
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{_ as b}from"./index.vue_vue_type_script_setup_true_lang-CivyQRS3.js";import{d as T,r as n,a0 as w,a1 as i,a as x,o as g,b as y,f as r,w as C,i as V}from"./index-Cfx4AYRq.js";const z=T({__name:"index",emits:["fetch-data"],setup(k,{expose:c,emit:u}){const d=u,t=n(!1),s=n(""),o=n([]);function f(e){o.value.push(e)}w("validateTopTabs",f);let a=i([]);async function p(e){e?(s.value="编辑",m(e)):(s.value="添加",a=i([{name:"主项目",platform:{},screen:{},security:{}}])),t.value=!0}function m(e){a.length=0,a.push({...e}),e.children&&e.children.length&&e.children.forEach(l=>{a.push({...l})})}function v(){a=i([]),d("fetch-data"),t.value=!1,o.value=[]}return c({showEdit:p}),(e,l)=>{const _=x("el-drawer");return g(),y("div",null,[r(_,{modelValue:t.value,"onUpdate:modelValue":l[0]||(l[0]=h=>t.value=h),"append-to-body":"","close-on-click-modal":!1,"destroy-on-close":"",draggable:"",size:"55%",title:s.value,onClose:v},{default:C(()=>[r(b,{"left-tabs-data":V(a),"validate-top-tabs":o.value},null,8,["left-tabs-data","validate-top-tabs"])]),_:1},8,["modelValue","title"])])}}});export{z as _};
