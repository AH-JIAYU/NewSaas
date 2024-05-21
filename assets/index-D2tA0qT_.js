
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import w from"./index-D60Uo7Li.js";import{d as x,r as d,a0 as y,a1 as c,a as p,o as V,b as E,f as o,w as l,g as u,i as z,O as D,_ as j}from"./index-C32xF_ni.js";import"./index-L6QP26Xn.js";import"./index-CJv0MN7P.js";import"./index-DFJLODe7.js";import"./index.vue_vue_type_script_setup_true_lang-CEce41F7.js";const B=x({name:"ProjeckEdit",__name:"index",emits:["fetch-data"],setup(L,{expose:m,emit:v}){const _=v,s=d(!1),n=d(""),i=d([]);function b(e){i.value.push(e)}y("validateTopTabs",b);let a=c([]);async function h(e){e?(n.value="编辑",T(e)):(n.value="添加",a=c([{name:"项目名称",platform:{},screen:{},security:{}}])),s.value=!0}function T(e){a.length=0,a.push({...e}),e.children&&e.children.length&&e.children.forEach(t=>{a.push({...t})})}function k(){}function f(){a=c([]),_("fetch-data"),s.value=!1,i.value=[]}return m({showEdit:h}),(e,t)=>{const r=p("el-button"),C=p("el-drawer");return V(),E("div",null,[o(C,{modelValue:s.value,"onUpdate:modelValue":t[1]||(t[1]=g=>s.value=g),class:D(n.value==="添加"?"hide-drawer-header":"edit-drawer"),"append-to-body":"","close-on-click-modal":!1,"destroy-on-close":"",draggable:"",size:"70%",title:"",onClose:f},{footer:l(()=>[o(r,{onClick:f},{default:l(()=>[u(" 取消 ")]),_:1}),o(r,{type:"warning",onClick:t[0]||(t[0]=()=>{})},{default:l(()=>[u(" 暂存 ")]),_:1}),o(r,{type:"primary",onClick:k},{default:l(()=>[u(" 确定 ")]),_:1})]),default:l(()=>[o(w,{"left-tabs-data":z(a),"validate-top-tabs":i.value},null,8,["left-tabs-data","validate-top-tabs"])]),_:1},8,["modelValue","class"])])}}}),U=j(B,[["__scopeId","data-v-f40a8675"]]);export{U as default};
