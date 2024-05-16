
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{d as w,r as s,a1 as R,a,o as U,e as h,w as l,f as e,i as t,g as f,E as q,_ as B}from"./index-CvJF3YJZ.js";const E=w({name:"ConfigurationSupplierLevelIndex",__name:"index",setup(I,{expose:v}){const u=s(!1),i=s(""),o=s(),p=s(),g=R({name:[{required:!0,message:"请输入名称",trigger:"blur"}],number:[{required:!0,message:"请输入比例",trigger:"blur"}]});async function V(m){m?(i.value="编辑",o.value=m):(i.value="添加",o.value={}),u.value=!0}function _(){p.value.resetFields(),u.value=!1}function x(){_()}return v({showEdit:V}),(m,n)=>{const y=a("el-divider"),c=a("el-input"),d=a("el-form-item"),b=a("el-button"),C=a("el-form"),k=a("el-dialog");return U(),h(k,{modelValue:t(u),"onUpdate:modelValue":n[2]||(n[2]=r=>q(u)?u.value=r:null),style:{height:"20.5rem"},title:t(i),width:"600"},{default:l(()=>[e(y,{"content-position":"left"}),e(C,{model:t(o),ref_key:"formRef",ref:p,rules:t(g),"label-width":"80px",inline:!1},{default:l(()=>[e(d,{label:"等级名称",prop:"name"},{default:l(()=>[e(c,{maxlength:"100",modelValue:t(o).name,"onUpdate:modelValue":n[0]||(n[0]=r=>t(o).name=r)},null,8,["modelValue"])]),_:1}),e(d,{label:"加成比例",prop:"number"},{default:l(()=>[e(c,{modelValue:t(o).number,"onUpdate:modelValue":n[1]||(n[1]=r=>t(o).number=r),type:"number"},{append:l(()=>[f("%")]),_:1},8,["modelValue"])]),_:1}),e(d,null,{default:l(()=>[e(b,{type:"primary",onClick:x},{default:l(()=>[f("确定")]),_:1}),e(b,{onClick:_},{default:l(()=>[f("取消")]),_:1})]),_:1})]),_:1},8,["model","rules"])]),_:1},8,["modelValue","title"])}}}),S=B(E,[["__scopeId","data-v-19043abf"]]);export{S as default};
