
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{r as o,a as l,o as g,e as z,w as c,f as e,i as s,I as v}from"./index-C66yBkEV.js";const h={__name:"index",setup(w,{expose:i}){const n=o(!1),t=o(""),u=o();function p(a){t.value=`${a.name}渠道的详情`,u.value=JSON.parse(JSON.stringify(a)),n.value=!0}function f(){u.value={},n.value=!1}const d=[{name:"name",cname:"amr",fz:"张三",num1:561,num2:435,num3:344,money1:1344.11,money2:111112},{name:"name",cname:"amr",fz:"张三",num1:561,num2:435,num3:344,money1:1344.11,money2:111112},{name:"name",cname:"amr",fz:"张三",num1:561,num2:435,num3:344,money1:1344.11,money2:111112},{name:"name",cname:"amr",fz:"张三",num1:561,num2:435,num3:344,money1:1344.11,money2:111112},{name:"name",cname:"amr",fz:"张三",num1:561,num2:435,num3:344,money1:1344.11,money2:111112},{name:"name",cname:"amr",fz:"张三",num1:561,num2:435,num3:344,money1:1344.11,money2:111112},{name:"name",cname:"amr",fz:"张三",num1:561,num2:435,num3:344,money1:1344.11,money2:111112}];return i({showEdit:p}),(a,r)=>{const m=l("el-table-column"),_=l("el-table"),y=l("el-dialog");return g(),z(y,{modelValue:s(n),"onUpdate:modelValue":r[0]||(r[0]=b=>v(n)?n.value=b:null),title:s(t),width:"1000px",onClose:f},{default:c(()=>[e(_,{data:d,border:"",style:{width:"100%"}},{default:c(()=>[e(m,{align:"center",prop:"name",label:"国家",width:"180"}),e(m,{align:"center",prop:"cname",label:"参与数",width:"180"}),e(m,{align:"center",prop:"fz",label:"完成数"}),e(m,{align:"center",prop:"num1",label:"完成金额"}),e(m,{align:"center",prop:"num2",label:"营业额"})]),_:1})]),_:1},8,["modelValue","title"])}}};export{h as default};
