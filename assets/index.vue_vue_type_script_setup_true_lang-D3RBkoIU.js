
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{d as v,r as x,a as l,o as V,b as w,f as e,w as o,C,g as i}from"./index-BJnWue-r.js";const g={style:{flex:"auto"}},B=v({name:"AddSettlement",__name:"index",setup(k,{expose:_}){const t=x(!1);function d(){}async function u(m){t.value=!0}function r(){t.value=!1}return _({showEdit:u}),(m,n)=>{const f=l("el-input"),c=l("el-form-item"),p=l("el-form"),a=l("el-button"),b=l("el-dialog");return V(),w("div",null,[e(b,{modelValue:t.value,"onUpdate:modelValue":n[1]||(n[1]=s=>t.value=s),title:"添加项目详情",width:"700","before-close":r},{footer:o(()=>[C("div",g,[e(a,{type:"primary",onClick:d},{default:o(()=>[i(" 确定 ")]),_:1}),e(a,{onClick:n[0]||(n[0]=s=>t.value=!1)},{default:o(()=>[i(" 取消 ")]),_:1})])]),default:o(()=>[e(p,{"label-width":"100px",inline:!1},{default:o(()=>[e(c,{label:"项目ID"},{default:o(()=>[e(f)]),_:1})]),_:1})]),_:1},8,["modelValue"])])}}});export{B as _};
