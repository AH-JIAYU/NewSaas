
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{d as y,r as d,a,al as V,o as u,b as k,f as e,w as t,C as _,g as m,D as C,am as D,e as B}from"./index-BgZOffyT.js";const h={style:{flex:"auto"}},S=y({name:"MoreOperations",__name:"index",setup(N,{expose:f}){const n=d(),l=d(!1);function p(){}async function v(s){n.value=s===1?"开票":"结算",l.value=!0}function b(){l.value=!1}return f({showEdit:v}),(s,o)=>{const i=a("el-table-column"),g=a("el-table"),c=a("el-button"),x=a("el-dialog"),w=V("loading");return u(),k("div",null,[e(x,{modelValue:l.value,"onUpdate:modelValue":o[1]||(o[1]=r=>l.value=r),title:n.value,width:"600","before-close":b},{footer:t(()=>[_("div",h,[e(c,{type:"primary",onClick:p},{default:t(()=>[m(" 确定 ")]),_:1}),e(c,{onClick:o[0]||(o[0]=r=>l.value=!1)},{default:t(()=>[m(" 取消 ")]),_:1})])]),default:t(()=>[_("div",null,"确认对一下项目进行"+C(n.value)+"操作吗?",1),D((u(),B(g,{"row-key":"id"},{default:t(()=>[e(i,{width:"80",type:"index",align:"center",label:"序号"}),e(i,{align:"center",label:"项目ID"}),e(i,{align:"center",label:"项目名称"})]),_:1})),[[w,!1]])]),_:1},8,["modelValue","title"])])}}});export{S as _};
