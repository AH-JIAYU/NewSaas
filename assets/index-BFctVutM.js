
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{_ as h}from"./index-CzUBR6H3.js";import{a as k}from"./user_cooperation-B4OA0K_h.js";import{d as w,r as n,n as N,a as y,o as l,b as d,f as u,w as s,y as i,g as p,i as _,e as C,j as L,F as B,t as T,z as v,A,L as E}from"./index-DPapYRlU.js";import"./index-CJ_hbdPY.js";import"./clipboard-BgKpnIi9.js";const I={class:"idList"},M={style:{flex:"auto"}},S=w({name:"AllocationEdit",__name:"index",emits:["fetch-data"],setup(z,{expose:b,emit:D}){const r=n(!1),t=n(!1);n();const o=n({list:[],type:"",typeList:["自动分配","供应商","会员组","合作商"]});async function g(c){try{r.value=!0;const a=await k.getTenantSupplierMemberNameInfo(c);o.value.list=a.data.getTenantSupplierMemberNameList,o.value.type=c.type,r.value=!1,t.value=!0}catch{}finally{r.value=!1}}function m(){t.value=!1}return N(async()=>{}),b({showEdit:g}),(c,a)=>{const f=y("el-button"),V=h,x=y("el-dialog");return l(),d("div",null,[u(x,{modelValue:_(t),"onUpdate:modelValue":a[0]||(a[0]=e=>A(t)?t.value=e:null),title:"分配",width:"700","before-close":m},{footer:s(()=>[i("div",M,[u(f,{onClick:m},{default:s(()=>[p(" 关闭 ")]),_:1})])]),default:s(()=>[_(o).type===1?(l(),C(f,{key:0,size:"small",type:"primary"},{default:s(()=>[p("部门")]),_:1})):L("",!0),i("div",I,[(l(!0),d(B,null,T(_(o).list,e=>(l(),d("div",{class:"item",key:e.id},[i("b",null,v(e.name),1),p("   "),i("span",null,"ID: "+v(e.id),1),u(V,{content:e.id},null,8,["content"])]))),128))])]),_:1},8,["modelValue"])])}}}),q=E(S,[["__scopeId","data-v-6f3be0f1"]]);export{q as default};
