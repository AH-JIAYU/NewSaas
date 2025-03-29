
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{a as f}from"./configuration_homepageSetting-BOOQBEup.js";import{d as y,r as l,n as x,E as p,a as i,q as b,s as B,i as s,o as F,b as I,f as c,w as v,M as C}from"./index-Cjx6Hppb.js";const D=y({__name:"index",props:{id:{default:""},row:{default:""}},setup(_,{expose:g}){const m=_,e=l(!1),d=l(),t=l({id:m.id,title:"",css:"",html:"",rawData:""}),h=l({title:[{required:!0,message:"请输入标题",trigger:"blur"}]});return l({1:"B2B",2:"B2C"}),x(()=>{try{e.value=!0,t.value.id!==""&&(t.value=JSON.parse(m.row),e.value=!1)}catch{}finally{e.value=!1}}),g({submit(){return new Promise(r=>{d.value.validate(o=>{if(o)if(t.value.id==="")try{e.value=!0;const{id:a,...n}=t.value;f.create(n).then(u=>{console.log(n),e.value=!1,u.status===1&&p.success({message:"新增成功",center:!0}),r()})}catch{}finally{e.value=!1}else try{e.value=!0,f.edit(t.value).then(a=>{e.value=!1,a.status===1&&p.success({message:"编辑成功",center:!0}),r()})}catch{}finally{e.value=!1}})})}}),(r,o)=>{const a=i("ElInput"),n=i("ElFormItem"),u=i("ElForm"),E=b("loading");return B((F(),I("div",null,[c(u,{ref_key:"formRef",ref:d,model:s(t),rules:s(h),"label-width":"3.75rem"},{default:v(()=>[c(n,{label:"标题",prop:"title"},{default:v(()=>[c(a,{modelValue:s(t).title,"onUpdate:modelValue":o[0]||(o[0]=w=>s(t).title=w),placeholder:"请输入标题"},null,8,["modelValue"])]),_:1})]),_:1},8,["model","rules"])])),[[E,s(e)]])}}}),M=C(D,[["__scopeId","data-v-4c3da454"]]);export{M as default};
