
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{a as d}from"./configuration_homepageSetting-DxyzwF8K.js";import{d as b,r as a,k as h,E as p,a as i,p as F,q as I,i as t,o as k,b as D,f as u,w as f,R}from"./index-CedPcfav.js";const V=b({__name:"index",props:{id:{default:""},row:{default:""}},setup(_,{expose:v}){const m=_,g=a(!1),c=a(),e=a({id:m.id,title:"",css:"",html:"",rawData:""}),E=a({title:[{required:!0,message:"请输入标题",trigger:"blur"}]});return h(()=>{e.value.id!==""&&(e.value=JSON.parse(m.row))}),v({submit(){return new Promise(l=>{c.value.validate(s=>{if(s)if(e.value.id===""){const{id:o,...r}=e.value;d.create(r).then(n=>{n.status===1&&p.success({message:"新增成功",center:!0}),l()})}else d.edit(e.value).then(o=>{o.status===1&&p.success({message:"编辑成功",center:!0}),l()})})})}}),(l,s)=>{const o=i("ElInput"),r=i("ElFormItem"),n=i("ElForm"),w=F("loading");return I((k(),D("div",null,[u(n,{ref_key:"formRef",ref:c,model:t(e),rules:t(E),"label-width":"120px","label-suffix":"："},{default:f(()=>[u(r,{label:"标题",prop:"title"},{default:f(()=>[u(o,{modelValue:t(e).title,"onUpdate:modelValue":s[0]||(s[0]=x=>t(e).title=x),placeholder:"请输入标题"},null,8,["modelValue"])]),_:1})]),_:1},8,["model","rules"])])),[[w,t(g)]])}}}),B=R(V,[["__scopeId","data-v-1221c792"]]);export{B as default};
