
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{a as d}from"./configuration_homepageSetting-BnjK0saI.js";import{d as b,r as o,n as h,E as f,a as n,an as F,ak as I,i as t,o as k,b as D,f as i,w as p,N as V}from"./index-C4dvHyEP.js";const C=b({__name:"index",props:{id:{default:""},row:{default:""}},setup(_,{expose:v}){const u=_,g=o(!1),m=o(),e=o({id:u.id,title:"",css:"",html:"",rawData:""}),E=o({title:[{required:!0,message:"请输入标题",trigger:"blur"}]});return h(()=>{e.value.id!==""&&(e.value=JSON.parse(u.row))}),v({submit(){return new Promise(c=>{m.value.validate(s=>{if(s){if(e.value.id===""){const{id:a,...l}=e.value;d.create(l).then(r=>{r.status===1&&f.success({message:"新增成功",center:!0})})}else d.edit(e.value).then(a=>{a.status===1&&f.success({message:"编辑成功",center:!0})});c()}})})}}),(c,s)=>{const a=n("ElInput"),l=n("ElFormItem"),r=n("ElForm"),w=F("loading");return I((k(),D("div",null,[i(r,{ref_key:"formRef",ref:m,model:t(e),rules:t(E),"label-width":"120px","label-suffix":"："},{default:p(()=>[i(l,{label:"标题",prop:"title"},{default:p(()=>[i(a,{modelValue:t(e).title,"onUpdate:modelValue":s[0]||(s[0]=x=>t(e).title=x),placeholder:"请输入标题"},null,8,["modelValue"])]),_:1})]),_:1},8,["model","rules"])])),[[w,t(g)]])}}}),B=V(C,[["__scopeId","data-v-1cb808e1"]]);export{B as default};
