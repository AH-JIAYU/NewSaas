
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{a as d}from"./configuration_homepageSetting-BPTs8uxH.js";import{d as x,r as o,k as y,E as p,a as i,p as b,q as F,i as l,o as I,b as k,f as c,w as v,R as D}from"./index-Dx7ZN6ED.js";const R=x({__name:"index",props:{id:{default:""},row:{default:""}},setup(_,{expose:g}){const f=_,e=o(!1),m=o(),t=o({id:f.id,title:"",css:"",html:"",rawData:""}),h=o({title:[{required:!0,message:"请输入标题",trigger:"blur"}]});return y(()=>{try{e.value=!0,t.value.id!==""&&(t.value=JSON.parse(f.row),e.value=!1)}catch{}finally{e.value=!1}}),g({submit(){return new Promise(s=>{m.value.validate(r=>{if(r)if(t.value.id==="")try{e.value=!0;const{id:a,...n}=t.value;d.create(n).then(u=>{e.value=!1,u.status===1&&p.success({message:"新增成功",center:!0}),s()})}catch{}finally{e.value=!1}else try{e.value=!0,d.edit(t.value).then(a=>{e.value=!1,a.status===1&&p.success({message:"编辑成功",center:!0}),s()})}catch{}finally{e.value=!1}})})}}),(s,r)=>{const a=i("ElInput"),n=i("ElFormItem"),u=i("ElForm"),E=b("loading");return F((I(),k("div",null,[c(u,{ref_key:"formRef",ref:m,model:l(t),rules:l(h),"label-width":"120px","label-suffix":"："},{default:v(()=>[c(n,{label:"标题",prop:"title"},{default:v(()=>[c(a,{modelValue:l(t).title,"onUpdate:modelValue":r[0]||(r[0]=w=>l(t).title=w),placeholder:"请输入标题"},null,8,["modelValue"])]),_:1})]),_:1},8,["model","rules"])])),[[E,l(e)]])}}}),q=D(R,[["__scopeId","data-v-67ceefa6"]]);export{q as default};
