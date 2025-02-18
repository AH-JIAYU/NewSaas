
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{a as f}from"./configuration_homepageSetting-D-9N8_cI.js";import{d as y,r as l,o as x,ai as p,a3 as i,al as b,a4 as B,i as s,b as F,j as I,g as c,w as v,z as C}from"./index-CZbucr5m.js";const D=y({__name:"index",props:{id:{default:""},row:{default:""}},setup(_,{expose:g}){const m=_,e=l(!1),d=l(),a=l({id:m.id,title:"",css:"",html:"",rawData:""}),h=l({title:[{required:!0,message:"请输入标题",trigger:"blur"}]});return l({1:"B2B",2:"B2C"}),x(()=>{try{e.value=!0,a.value.id!==""&&(a.value=JSON.parse(m.row),e.value=!1)}catch{}finally{e.value=!1}}),g({submit(){return new Promise(r=>{d.value.validate(o=>{if(o)if(a.value.id==="")try{e.value=!0;const{id:t,...n}=a.value;f.create(n).then(u=>{console.log(n),e.value=!1,u.status===1&&p.success({message:"新增成功",center:!0}),r()})}catch{}finally{e.value=!1}else try{e.value=!0,f.edit(a.value).then(t=>{e.value=!1,t.status===1&&p.success({message:"编辑成功",center:!0}),r()})}catch{}finally{e.value=!1}})})}}),(r,o)=>{const t=i("ElInput"),n=i("ElFormItem"),u=i("ElForm"),w=b("loading");return B((F(),I("div",null,[c(u,{ref_key:"formRef",ref:d,model:s(a),rules:s(h),"label-width":"3.75rem"},{default:v(()=>[c(n,{label:"标题",prop:"title"},{default:v(()=>[c(t,{modelValue:s(a).title,"onUpdate:modelValue":o[0]||(o[0]=E=>s(a).title=E),placeholder:"请输入标题"},null,8,["modelValue"])]),_:1})]),_:1},8,["model","rules"])])),[[w,s(e)]])}}}),R=C(D,[["__scopeId","data-v-4c3da454"]]);export{R as default};
