
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{a as f}from"./configuration_homepageSetting-DzbnvAhr.js";import{d as y,r as o,k as x,E as p,a as i,p as b,q as F,i as l,o as I,b as k,f as c,w as v,R as D}from"./index-DYmXwPhA.js";const R=y({__name:"index",props:{id:{default:""},row:{default:""}},setup(_,{expose:g}){const m=_,e=o(!1),d=o(),t=o({id:m.id,title:"",css:"",html:"",rawData:""}),h=o({title:[{required:!0,message:"请输入标题",trigger:"blur"}]});return x(()=>{try{e.value=!0,t.value.id!==""&&(t.value=JSON.parse(m.row),e.value=!1)}catch{}finally{e.value=!1}}),g({submit(){return new Promise(r=>{d.value.validate(s=>{if(s)if(t.value.id==="")try{e.value=!0;const{id:a,...n}=t.value;f.create(n).then(u=>{e.value=!1,u.status===1&&p.success({message:"新增成功",center:!0}),r()})}catch{}finally{e.value=!1}else try{e.value=!0,f.edit(t.value).then(a=>{e.value=!1,a.status===1&&p.success({message:"编辑成功",center:!0}),r()})}catch{}finally{e.value=!1}})})}}),(r,s)=>{const a=i("ElInput"),n=i("ElFormItem"),u=i("ElForm"),E=b("loading");return F((I(),k("div",null,[c(u,{ref_key:"formRef",ref:d,model:l(t),rules:l(h),"label-width":"3.75rem"},{default:v(()=>[c(n,{label:"标题",prop:"title"},{default:v(()=>[c(a,{modelValue:l(t).title,"onUpdate:modelValue":s[0]||(s[0]=w=>l(t).title=w),placeholder:"请输入标题"},null,8,["modelValue"])]),_:1})]),_:1},8,["model","rules"])])),[[E,l(e)]])}}}),q=D(R,[["__scopeId","data-v-cc2288e2"]]);export{q as default};
