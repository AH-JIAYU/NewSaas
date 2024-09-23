
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{r as l,b as o,o as g,f as z,w as s,g as e,j as c,I as v}from"./index-BKVONNyH.js";const h={__name:"index",setup(w,{expose:f}){const n=l(!1),t=l(""),u=l();function i(a){t.value=`${a.name}渠道的详情`,u.value=JSON.parse(JSON.stringify(a)),n.value=!0}function p(){u.value={},n.value=!1}const d=[{name:"name",cname:"amr",fz:"张三",num1:561,num2:435,num3:344,money1:1344.11,money2:111112},{name:"name",cname:"amr",fz:"张三",num1:561,num2:435,num3:344,money1:1344.11,money2:111112},{name:"name",cname:"amr",fz:"张三",num1:561,num2:435,num3:344,money1:1344.11,money2:111112},{name:"name",cname:"amr",fz:"张三",num1:561,num2:435,num3:344,money1:1344.11,money2:111112},{name:"name",cname:"amr",fz:"张三",num1:561,num2:435,num3:344,money1:1344.11,money2:111112},{name:"name",cname:"amr",fz:"张三",num1:561,num2:435,num3:344,money1:1344.11,money2:111112},{name:"name",cname:"amr",fz:"张三",num1:561,num2:435,num3:344,money1:1344.11,money2:111112}];return f({showEdit:i}),(a,r)=>{const m=o("el-table-column"),_=o("el-table"),y=o("el-dialog");return g(),z(y,{modelValue:c(n),"onUpdate:modelValue":r[0]||(r[0]=b=>v(n)?n.value=b:null),title:c(t),width:"1000px",onClose:p},{default:s(()=>[e(_,{data:d,border:"",style:{width:"100%"}},{default:s(()=>[e(m,{align:"left",prop:"name",label:"国家",width:"180"}),e(m,{align:"left",prop:"cname",label:"参与数",width:"180"}),e(m,{align:"left",prop:"fz",label:"完成数"}),e(m,{align:"left",prop:"num1",label:"完成金额"}),e(m,{align:"left",prop:"num2",label:"营业额"})]),_:1})]),_:1},8,["modelValue","title"])}}};export{h as default};
