
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{d as k,r as u,a,ai as w,o as d,b as y,f as e,w as t,j as _,g as m,D as C,aj as B,e as D}from"./index-CvJF3YJZ.js";const N={style:{flex:"auto"}},E=k({name:"MoreOperations",__name:"index",setup(h,{expose:f}){const n=u(),l=u(!1);function p(){}const v=async i=>{n.value=i===1?"开票":"结算",l.value=!0};function b(){l.value=!1}return f({showEdit:v}),(i,o)=>{const s=a("el-table-column"),g=a("el-table"),c=a("el-button"),x=a("el-dialog"),V=w("loading");return d(),y("div",null,[e(x,{modelValue:l.value,"onUpdate:modelValue":o[1]||(o[1]=r=>l.value=r),title:n.value,width:"600","before-close":b},{footer:t(()=>[_("div",N,[e(c,{type:"primary",onClick:p},{default:t(()=>[m(" 确定 ")]),_:1}),e(c,{onClick:o[0]||(o[0]=r=>l.value=!1)},{default:t(()=>[m(" 取消 ")]),_:1})])]),default:t(()=>[_("div",null,"确认对一下项目进行"+C(n.value)+"操作吗?",1),B((d(),D(g,{"row-key":"id"},{default:t(()=>[e(s,{align:"center",label:"客户简称"}),e(s,{align:"center",label:"项目编码"}),e(s,{align:"center",label:"项目名称"})]),_:1})),[[V,!1]])]),_:1},8,["modelValue","title"])])}}});export{E as _};
