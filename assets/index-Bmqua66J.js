
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{d as v,r as x,a as l,o as V,b as w,f as e,w as t,C,g as d,P as g}from"./index-DQRW2_Vj.js";const y={style:{flex:"auto"}},h=v({name:"AddSettlement",__name:"index",setup(k,{expose:i}){const o=x(!1);function _(){}async function u(c){o.value=!0}function r(){o.value=!1}return i({showEdit:u}),(c,n)=>{const f=l("el-input"),m=l("el-form-item"),p=l("el-form"),a=l("el-button"),b=l("el-dialog");return V(),w("div",null,[e(b,{modelValue:o.value,"onUpdate:modelValue":n[1]||(n[1]=s=>o.value=s),title:"遗漏项目新增",width:"700",style:{height:"200px"},"before-close":r},{footer:t(()=>[C("div",y,[e(a,{type:"primary",onClick:_},{default:t(()=>[d(" 确定 ")]),_:1}),e(a,{onClick:n[0]||(n[0]=s=>o.value=!1)},{default:t(()=>[d(" 取消 ")]),_:1})])]),default:t(()=>[e(p,{"label-width":"100px",inline:!1},{default:t(()=>[e(m,{label:"项目ID"},{default:t(()=>[e(f)]),_:1})]),_:1})]),_:1},8,["modelValue"])])}}}),N=g(h,[["__scopeId","data-v-8d9b4792"]]);export{N as default};
