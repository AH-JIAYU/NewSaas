
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{c as g}from"./user_cooperation-DZ0idste.js";import{d as h,r as s,k as x,a as i,p as V,o as u,b as k,f as a,w as c,s as C,g as N,i as t,q as B,e as A,j as E,I,R as L}from"./index-b3LqPvyy.js";const T={style:{flex:"auto"}},D=h({name:"AllocationEdit",__name:"index",emits:["fetch-data"],setup(M,{expose:_,emit:R}){const n=s(!1),o=s(!1);s();const e=s({list:[],type:"",typeList:["自动分配","供应商","会员组","租户"]});async function f(r){try{n.value=!0;const l=await g.getTenantSupplierMemberNameInfo(r);e.value.list=[l.data],e.value.type=r.type,n.value=!1,o.value=!0}catch{}finally{n.value=!1}}function p(){o.value=!1}return x(async()=>{}),_({showEdit:f}),(r,l)=>{const d=i("el-table-column"),m=i("el-table"),v=i("el-button"),b=i("el-dialog"),y=V("loading");return u(),k("div",null,[a(b,{modelValue:t(o),"onUpdate:modelValue":l[0]||(l[0]=w=>I(o)?o.value=w:null),title:"分配",width:"700","before-close":p},{footer:c(()=>[C("div",T,[a(v,{onClick:p},{default:c(()=>[N(" 关闭 ")]),_:1})])]),default:c(()=>[t(e).list.length?B((u(),A(m,{key:0,data:t(e).list,"row-key":"id"},{default:c(()=>[a(d,{align:"center","show-overflow-tooltip":"",type:"index"}),a(d,{align:"center","show-overflow-tooltip":"",label:t(e).typeList[t(e).type-1]+"id",prop:"id"},null,8,["label"]),a(d,{align:"center","show-overflow-tooltip":"",label:t(e).typeList[t(e).type-1]+"名称",prop:"name"},null,8,["label"])]),_:1},8,["data"])),[[y,t(n)]]):E("",!0)]),_:1},8,["modelValue"])])}}}),H=L(D,[["__scopeId","data-v-b7373d66"]]);export{H as default};
