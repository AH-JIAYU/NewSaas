
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import y from"./index-Dg85QeeB.js";import{d as C,r,a0 as V,a1 as c,a as f,o as w,b as E,f as o,w as l,g as d,i as D,_ as j}from"./index-BgZmKZlu.js";import"./HTooltip.vue_vue_type_script_setup_true_lang-DVb5VBpJ.js";import"./index-rKI2bg_x.js";import"./index-C_oCk9B4.js";import"./index-DFJLODe7.js";import"./index.vue_vue_type_script_setup_true_lang-CNC_xmuL.js";const z=C({name:"ProjeckEdit",__name:"index",emits:["fetch-data"],setup(B,{expose:m,emit:_}){const b=_,n=r(!1),u=r(""),s=r([]);function v(e){s.value.push(e)}V("validateTopTabs",v);let t=c([]);async function h(e){e?(u.value="编辑",T(e)):(u.value="添加",t=c([{name:"添加项目",platform:{},screen:{},security:{}}])),n.value=!0}function T(e){t.length=0,t.push({...e}),e.children&&e.children.length&&e.children.forEach(a=>{t.push({...a})})}function k(){}function p(){t=c([]),b("fetch-data"),n.value=!1,s.value=[]}return m({showEdit:h}),(e,a)=>{const i=f("el-button"),g=f("el-drawer");return w(),E("div",null,[o(g,{modelValue:n.value,"onUpdate:modelValue":a[1]||(a[1]=x=>n.value=x),"append-to-body":"","close-on-click-modal":!1,"destroy-on-close":"",draggable:"",size:"70%",title:"",onClose:p},{footer:l(()=>[o(i,{onClick:p},{default:l(()=>[d(" 取消 ")]),_:1}),o(i,{type:"warning",onClick:a[0]||(a[0]=()=>{})},{default:l(()=>[d(" 暂存 ")]),_:1}),o(i,{type:"primary",onClick:k},{default:l(()=>[d(" 确定 ")]),_:1})]),default:l(()=>[o(y,{"left-tabs-data":D(t),"validate-top-tabs":s.value},null,8,["left-tabs-data","validate-top-tabs"])]),_:1},8,["modelValue"])])}}}),q=j(z,[["__scopeId","data-v-877379eb"]]);export{q as default};
