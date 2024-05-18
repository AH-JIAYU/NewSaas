
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import x from"./index-DKctThpG.js";import{d as y,r,a0 as C,a1 as d,a as p,o as V,b as E,f as o,w as l,g as c,i as D,_ as j}from"./index-DQumISPN.js";import"./index-C7oBfLXy.js";import"./index-WikOps_z.js";import"./index-DFJLODe7.js";import"./index.vue_vue_type_script_setup_true_lang-Dol5EsIp.js";const z={class:"hide-drawer-header"},B=y({name:"ProjeckEdit",__name:"index",emits:["fetch-data"],setup(L,{expose:m,emit:_}){const b=_,s=r(!1),u=r(""),n=r([]);function v(e){n.value.push(e)}C("validateTopTabs",v);let t=d([]);async function h(e){e?(u.value="编辑",T(e)):(u.value="添加",t=d([{name:"项目名称",platform:{},screen:{},security:{}}])),s.value=!0}function T(e){t.length=0,t.push({...e}),e.children&&e.children.length&&e.children.forEach(a=>{t.push({...a})})}function k(){}function f(){t=d([]),b("fetch-data"),s.value=!1,n.value=[]}return m({showEdit:h}),(e,a)=>{const i=p("el-button"),g=p("el-drawer");return V(),E("div",z,[o(g,{class:"hide-drawer-header",modelValue:s.value,"onUpdate:modelValue":a[1]||(a[1]=w=>s.value=w),"append-to-body":"","close-on-click-modal":!1,"destroy-on-close":"",draggable:"",size:"70%",title:"",onClose:f},{footer:l(()=>[o(i,{onClick:f},{default:l(()=>[c(" 取消 ")]),_:1}),o(i,{type:"warning",onClick:a[0]||(a[0]=()=>{})},{default:l(()=>[c(" 暂存 ")]),_:1}),o(i,{type:"primary",onClick:k},{default:l(()=>[c(" 确定 ")]),_:1})]),default:l(()=>[o(x,{"left-tabs-data":D(t),"validate-top-tabs":n.value},null,8,["left-tabs-data","validate-top-tabs"])]),_:1},8,["modelValue"])])}}}),q=j(B,[["__scopeId","data-v-9beb1f5d"]]);export{q as default};
