
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{d as V,r as u,a,aj as w,o as d,b as y,f as e,w as t,l as _,g as f,D as C,ak as B,e as D}from"./index-FpWNHEfI.js";const N={style:{flex:"auto"}},S=V({name:"MoreOperations",__name:"index",setup(h,{expose:m}){const n=u(),l=u(!1);function p(){}async function v(i){n.value=i===1?"开票":"结算",l.value=!0}function b(){l.value=!1}return m({showEdit:v}),(i,o)=>{const s=a("el-table-column"),g=a("el-table"),c=a("el-button"),k=a("el-dialog"),x=w("loading");return d(),y("div",null,[e(k,{modelValue:l.value,"onUpdate:modelValue":o[1]||(o[1]=r=>l.value=r),title:n.value,width:"600","before-close":b},{footer:t(()=>[_("div",N,[e(c,{type:"primary",onClick:p},{default:t(()=>[f(" 确定 ")]),_:1}),e(c,{onClick:o[0]||(o[0]=r=>l.value=!1)},{default:t(()=>[f(" 取消 ")]),_:1})])]),default:t(()=>[_("div",null,"确认对一下项目进行"+C(n.value)+"操作吗?",1),B((d(),D(g,{"row-key":"id"},{default:t(()=>[e(s,{align:"center",label:"客户简称"}),e(s,{align:"center",label:"项目编码"}),e(s,{align:"center",label:"项目名称"})]),_:1})),[[x,!1]])]),_:1},8,["modelValue","title"])])}}});export{S as _};
