
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{c as y}from"./user_cooperation-BL1BAll7.js";import{d as g,r,k as h,a as n,p as x,o as p,b as V,f as l,w as s,s as k,g as C,i as t,q as N,e as B,j as A,I as E,R as I}from"./index-Ke106btl.js";const L={style:{flex:"auto"}},T=g({name:"AllocationEdit",__name:"index",emits:["fetch-data"],setup(D,{expose:_,emit:M}){const o=r(!1);r();const e=r({list:[],type:"",typeList:["自动分配","供应商","会员组","租户"]});async function u(i){const a=await y.getTenantSupplierMemberNameInfo(i);e.value.list=[a.data],e.value.type=i.type,o.value=!0}function d(){o.value=!1}return h(async()=>{}),_({showEdit:u}),(i,a)=>{const c=n("el-table-column"),f=n("el-table"),m=n("el-button"),v=n("el-dialog"),b=x("loading");return p(),V("div",null,[l(v,{modelValue:t(o),"onUpdate:modelValue":a[0]||(a[0]=w=>E(o)?o.value=w:null),title:"分配",width:"700","before-close":d},{footer:s(()=>[k("div",L,[l(m,{onClick:d},{default:s(()=>[C(" 关闭 ")]),_:1})])]),default:s(()=>[t(e).list.length?N((p(),B(f,{key:0,data:t(e).list,"row-key":"id"},{default:s(()=>[l(c,{align:"center","show-overflow-tooltip":"",type:"index"}),l(c,{align:"center","show-overflow-tooltip":"",label:t(e).typeList[t(e).type-1]+"id",prop:"id"},null,8,["label"]),l(c,{align:"center","show-overflow-tooltip":"",label:t(e).typeList[t(e).type-1]+"名称",prop:"name"},null,8,["label"])]),_:1},8,["data"])),[[b,!1]]):A("",!0)]),_:1},8,["modelValue"])])}}}),q=I(T,[["__scopeId","data-v-0916732e"]]);export{q as default};
