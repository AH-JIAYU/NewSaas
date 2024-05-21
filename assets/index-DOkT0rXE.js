
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{d as B,m as p,u as w,r as d,c as F,a as o,o as I,b as M,f as e,w as l,g as _,i as t}from"./index-C32xF_ni.js";const z=B({__name:"index",props:p({mode:{},id:{}},{modelValue:{type:Boolean,default:!1},modelModifiers:{}}),emits:p(["success"],["update:modelValue"]),setup(m,{emit:E}){const i=m,V=E,a=w(m,"modelValue"),r=d(),s=d({id:i.id,title:"",detail:""}),b=d({title:[{required:!0,message:"请输入标题",trigger:"blur"}]}),g=F(()=>i.id===""?"新增筛选库":"编辑筛选库");function v(){r.value.submit().then(()=>{V("success"),c()})}function c(){a.value=!1}return(R,n)=>{const x=o("ElInput"),k=o("ElFormItem"),y=o("ElForm"),f=o("ElButton"),C=o("ElDialog");return I(),M("div",null,[e(C,{modelValue:a.value,"onUpdate:modelValue":n[1]||(n[1]=u=>a.value=u),title:t(g),width:"80%","close-on-click-modal":!1,"append-to-body":"","destroy-on-close":""},{footer:l(()=>[e(f,{size:"large",onClick:c},{default:l(()=>[_(" 取消 ")]),_:1}),e(f,{type:"primary",size:"large",onClick:v},{default:l(()=>[_(" 确定 ")]),_:1})]),default:l(()=>[e(y,{ref_key:"formRef",ref:r,model:t(s),rules:t(b),"label-width":"120px","label-suffix":"："},{default:l(()=>[e(k,{label:"标题",prop:"title"},{default:l(()=>[e(x,{modelValue:t(s).title,"onUpdate:modelValue":n[0]||(n[0]=u=>t(s).title=u),placeholder:"请输入标题"},null,8,["modelValue"])]),_:1})]),_:1},8,["model","rules"])]),_:1},8,["modelValue","title"])])}}});export{z as default};
