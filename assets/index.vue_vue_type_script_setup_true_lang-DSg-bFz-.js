
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{d as v,r as s,a as i,o as b,b as x,f as l,w as t,A as u,g as d}from"./index-CWNW1mmx.js";const V=u("div",null,"确认删除这条数据吗?",-1),w={style:{flex:"auto"}},k=v({name:"Delete",__name:"index",setup(C,{expose:r}){const e=s(!1);s();function c(){}async function _(m){e.value=!0}function f(){e.value=!1}return r({showEdit:_}),(m,o)=>{const n=i("el-button"),p=i("el-dialog");return b(),x("div",null,[l(p,{modelValue:e.value,"onUpdate:modelValue":o[1]||(o[1]=a=>e.value=a),title:"删除",width:"500","before-close":f},{footer:t(()=>[u("div",w,[l(n,{type:"primary",onClick:c},{default:t(()=>[d(" 确定 ")]),_:1}),l(n,{onClick:o[0]||(o[0]=a=>e.value=!1)},{default:t(()=>[d(" 取消 ")]),_:1})])]),default:t(()=>[V]),_:1},8,["modelValue"])])}}});export{k as _};
