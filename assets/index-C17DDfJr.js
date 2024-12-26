
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{d as D,r as I,a as t,o as w,b as y,f as e,w as l,g as u,i as n,an as g,L as C}from"./index-CS2KSSDR.js";const k=D({name:"UserDataExport",__name:"index",setup(U){const o=I({a:"",b:"",c:""});function f(){}function i(){}return(h,a)=>{const r=t("el-input"),s=t("el-form-item"),_=t("el-col"),b=t("el-select"),p=t("el-button"),c=t("el-row"),m=t("el-card"),x=t("el-form"),V=g;return w(),y("div",null,[e(V,null,{default:l(()=>[e(x,{"label-position":"right"},{default:l(()=>[e(m,null,{header:l(()=>[u(" 按项目导出会员资料 ")]),default:l(()=>[e(c,{gutter:24},{default:l(()=>[e(_,{span:6},{default:l(()=>[e(s,{label:"项目ID/名称"},{default:l(()=>[e(r,{modelValue:n(o).a,"onUpdate:modelValue":a[0]||(a[0]=d=>n(o).a=d),placeholder:"请输入"},null,8,["modelValue"])]),_:1})]),_:1}),e(_,{span:6},{default:l(()=>[e(s,{label:"项目状态"},{default:l(()=>[e(b,{modelValue:n(o).b,"onUpdate:modelValue":a[1]||(a[1]=d=>n(o).b=d),placeholder:"请选择",style:{width:"100%"}},null,8,["modelValue"])]),_:1})]),_:1}),e(_,{span:6},{default:l(()=>[e(p,{size:"default",type:"primary",onClick:f},{default:l(()=>[u(" 导出 ")]),_:1})]),_:1})]),_:1})]),_:1}),e(m,null,{header:l(()=>[u(" 按会员ID导出资料(站长ID＿会员ID) ")]),default:l(()=>[e(c,{gutter:24},{default:l(()=>[e(_,{span:12},{default:l(()=>[e(s,{label:"项目ID/名称"},{default:l(()=>[e(r,{modelValue:n(o).c,"onUpdate:modelValue":a[2]||(a[2]=d=>n(o).c=d),type:"textarea",rows:5,placeholder:"请输入"},null,8,["modelValue"])]),_:1})]),_:1}),e(_,{span:6},{default:l(()=>[e(p,{size:"default",type:"primary",onClick:i},{default:l(()=>[u(" 导出 ")]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})])}}}),z=C(k,[["__scopeId","data-v-2b899632"]]);export{z as default};
