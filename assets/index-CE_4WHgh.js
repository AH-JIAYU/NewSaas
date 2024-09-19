
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{d as C,aO as V,r as i,b as r,q as D,o as d,f as _,w as c,s as N,j as t,g as l,aN as j,h as k,H as z,I as B,R as I}from"./index-BOIe6JP6.js";const P=C({__name:"index",setup(R,{expose:f}){const{pagination:m,getParams:S,onSizeChange:q,onCurrentChange:A}=V(),a=i(!1),u=i(!1),o=i(!1),s=i([]);async function g(e){try{o.value=!0,e?(s.value=e.data.list,u.value=e.data.success,m.value.total=e.data.list.length,o.value=!1):s.value=e||[]}catch{}finally{o.value=!1}a.value=!0}function v(){s.value=[],a.value=!1}return f({showEdit:g}),(e,p)=>{const n=r("el-table-column"),h=r("el-empty"),b=r("el-table"),y=r("el-dialog"),w=D("loading");return d(),_(y,{modelValue:t(a),"onUpdate:modelValue":p[0]||(p[0]=x=>B(a)?a.value=x:null),title:"解析记录",onClose:v},{default:c(()=>[N((d(),_(b,{border:"",data:t(s),stripe:"","max-height":"370"},{empty:c(()=>[l(h,{image:t(j),"image-size":300},null,8,["image"])]),default:c(()=>[l(n,{align:"center",prop:"type","show-overflow-tooltip":"",label:"状态"}),l(n,{align:"center",prop:"host","show-overflow-tooltip":"",label:"解析类型"}),l(n,{align:"center",prop:"host","show-overflow-tooltip":"",label:"记录值"}),l(n,{align:"center",prop:"projectName","show-overflow-tooltip":"",label:"指向"},{default:c(()=>[k(z(t(u)?"已生效":"未生效"),1)]),_:1})]),_:1},8,["data"])),[[w,t(o)]])]),_:1},8,["modelValue"])}}}),H=I(P,[["__scopeId","data-v-3d4285ac"]]);export{H as default};
