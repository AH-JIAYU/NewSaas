
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{k as c,d as v,r as P,a3 as x,a as s,o as L,b as M,f as e,w as r,C as V,g as k,i as m,G as I,P as j}from"./index-BtGBeoC7.js";import{o as C}from"./apiLoading-BWIt5krR.js";const N={list:o=>c.post("member/getMemberProjectList",o),getMemberPriceList:o=>c.post("member/getMemberPriceList",o)},w=v({name:"Edit",__name:"index",setup(o,{expose:d}){const t=P(!1),n=x({list:[]});async function p(i){const a=await C(N.getMemberPriceList({projectId:i.projectId}));n.list=a.data.getMemberPriceListInfoList,t.value=!0}function b(){t.value=!1}return d({showEdit:p}),(i,a)=>{const l=s("el-table-column"),_=s("el-table"),u=s("el-button"),f=s("el-dialog");return L(),M("div",null,[e(f,{modelValue:m(t),"onUpdate:modelValue":a[0]||(a[0]=g=>I(t)?t.value=g:null),title:"查看你会员价格",direction:"rtl","close-on-click-modal":!1},{footer:r(()=>[V("div",null,[e(u,{onClick:b},{default:r(()=>[k(" 关闭 ")]),_:1})])]),default:r(()=>[e(_,{data:m(n).list,border:"",stripe:""},{default:r(()=>[e(l,{label:"会员ID",prop:"memberId"}),e(l,{label:"会员姓名",prop:"memberName"}),e(l,{label:"会员等级",prop:"memberLevelName"}),e(l,{label:"会员价格",prop:"memberPrice"})]),_:1},8,["data"])]),_:1},8,["modelValue"])])}}}),h=j(w,[["__scopeId","data-v-49b27a6a"]]),E=Object.freeze(Object.defineProperty({__proto__:null,default:h},Symbol.toStringTag,{value:"Module"}));export{N as a,h as c,E as i};
