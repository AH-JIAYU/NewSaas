
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{a as d}from"./configuration_homepageSetting-C8iT8p1G.js";import{d as h,r as o,v as b,ah as f,a as i,an as F,ak as I,i as t,o as k,b as D,f as u,w as p,J as V}from"./index-CHE_Y-qx.js";const C=h({__name:"index",props:{id:{default:""},row:{default:""}},setup(_,{expose:v}){const m=_,g=o(!1),c=o(),e=o({id:m.id,title:"",css:"",html:"",rawData:""}),w=o({title:[{required:!0,message:"请输入标题",trigger:"blur"}]});return b(()=>{e.value.id!==""&&(e.value=JSON.parse(m.row))}),v({submit(){return new Promise(l=>{c.value.validate(s=>{if(s)if(e.value.id===""){const{id:a,...r}=e.value;d.create(r).then(n=>{n.status===1&&f.success({message:"新增成功",center:!0}),l()})}else d.edit(e.value).then(a=>{a.status===1&&f.success({message:"编辑成功",center:!0}),l()})})})}}),(l,s)=>{const a=i("ElInput"),r=i("ElFormItem"),n=i("ElForm"),x=F("loading");return I((k(),D("div",null,[u(n,{ref_key:"formRef",ref:c,model:t(e),rules:t(w),"label-width":"120px","label-suffix":"："},{default:p(()=>[u(r,{label:"标题",prop:"title"},{default:p(()=>[u(a,{modelValue:t(e).title,"onUpdate:modelValue":s[0]||(s[0]=E=>t(e).title=E),placeholder:"请输入标题"},null,8,["modelValue"])]),_:1})]),_:1},8,["model","rules"])])),[[x,t(g)]])}}}),J=V(C,[["__scopeId","data-v-1221c792"]]);export{J as default};
