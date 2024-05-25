
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import C from"./index-BmiH0bhM.js";import{d as w,r as s,a0 as y,a1 as d,a as p,o as V,b as E,f as o,w as l,g as c,i as j,_ as L}from"./index-QfOrM8xp.js";import"./index-ChrU1yhm.js";import"./index-BZn7PRcu.js";import"./index-DFJLODe7.js";import"./index.vue_vue_type_script_setup_true_lang-C3HNuEWn.js";const P=w({name:"ProjeckEdit",__name:"index",emits:["fetch-data"],setup(D,{expose:m,emit:b}){const _=b,n=s(!1),f=s(""),i=s([]);function v(e){i.value.push(e)}s(null),y("validateTopTabs",v);let t=d([]);async function h(e){e?(f.value="编辑",T(e)):(f.value="添加",t=d([{name:"项目名称",addProjectQuotaInfoList:{}}])),n.value=!0}function T(e){t.length=0,t.push({...e}),e.children&&e.children.length&&e.children.forEach(a=>{t.push({...a})})}function g(){t[0].addProjectInfoList=t.slice(1),console.log("leftTabsRef",t)}function u(){t=d([]),_("fetch-data"),n.value=!1,i.value=[]}return m({showEdit:h}),(e,a)=>{const r=p("el-button"),k=p("el-drawer");return V(),E("div",null,[o(k,{modelValue:n.value,"onUpdate:modelValue":a[1]||(a[1]=x=>n.value=x),class:"hide-drawer-header","append-to-body":"","close-on-click-modal":!1,"destroy-on-close":"",draggable:"",size:"70%",title:"",onClose:u},{footer:l(()=>[o(r,{onClick:u},{default:l(()=>[c(" 取消 ")]),_:1}),o(r,{type:"warning",onClick:a[0]||(a[0]=()=>{})},{default:l(()=>[c(" 暂存 ")]),_:1}),o(r,{type:"primary",onClick:g},{default:l(()=>[c(" 确定 ")]),_:1})]),default:l(()=>[o(C,{ref:"",leftTabsRef:"","left-tabs-data":j(t),"validate-top-tabs":i.value},null,8,["left-tabs-data","validate-top-tabs"])]),_:1},8,["modelValue"])])}}}),Q=L(P,[["__scopeId","data-v-bce4e606"]]);export{Q as default};
