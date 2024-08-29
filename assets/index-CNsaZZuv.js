
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{d as g,r as x,a5 as I,a as s,o as V,b as k,f as e,w as t,s as C,g as i,i as m,H as L,I as N,ba as P,R as w}from"./index-DSudqXuk.js";import{a as y}from"./survey_myProjeck-Ca-b8bIo.js";import{o as h}from"./apiLoading-BsKNhTuj.js";const B=g({name:"Edit",__name:"index",setup(E,{expose:d}){const a=x(!1),r=I({list:[]});async function p(c){const o=await h(y.getMemberPriceList({projectId:c.projectId}));r.list=o.data.getMemberPriceListInfoList,a.value=!0}function _(){a.value=!1}return d({showEdit:p}),(c,o)=>{const l=s("el-table-column"),u=P,b=s("el-table"),f=s("el-button"),v=s("el-dialog");return V(),k("div",null,[e(v,{modelValue:m(a),"onUpdate:modelValue":o[0]||(o[0]=n=>N(a)?a.value=n:null),title:"查看你会员价格",direction:"rtl","close-on-click-modal":!1},{footer:t(()=>[C("div",null,[e(f,{onClick:_},{default:t(()=>[i(" 关闭 ")]),_:1})])]),default:t(()=>[e(b,{data:m(r).list,border:"",stripe:""},{default:t(()=>[e(l,{label:"会员ID",prop:"memberId"}),e(l,{label:"会员姓名",prop:"memberName"}),e(l,{label:"会员等级",prop:"memberLevelName"}),e(l,{label:"会员价格",prop:"memberPrice"},{default:t(({row:n})=>[e(u),i(L(n.memberPrice||0),1)]),_:1})]),_:1},8,["data"])]),_:1},8,["modelValue"])])}}}),D=w(B,[["__scopeId","data-v-d01a0536"]]);export{D as default};
