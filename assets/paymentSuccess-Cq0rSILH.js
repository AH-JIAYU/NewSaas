
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{d as u,r as c,n as r,b as v,y as e,f as l,g as _,z as m,i as f,w as h,a as w,aG as S,aH as g,o as y,_ as I,L as b}from"./index-wfZ6lyFc.js";const x=s=>(S("data-v-16a0e506"),s=s(),g(),s),k={class:"page"},C={class:"paymentSuccess"},B={class:"icon"},D={class:"paymentStatus"},N=x(()=>e("div",{class:"status"},"支付成功",-1)),P={class:"countDown"},V={class:"closePage"},z=u({__name:"paymentSuccess",setup(s){const o=c(0),a=c(null),i=()=>{let t=5;o.value=5,a.value=setInterval(()=>{t>0?(t--,o.value=t):(clearInterval(a.value),o.value=0,a.value=null,n())},1e3)},n=()=>{window.open("about:blank","_self"),window.close()};return r(()=>{i()}),(t,E)=>{const d=I,p=w("el-button");return y(),v("div",k,[e("div",C,[e("div",B,[l(d,{name:"i-ep:success-filled",size:"60px",color:"#70b61b"})]),e("div",D,[N,e("div",P,[_(" 倒计时"+m(f(o))+"秒关闭页面 . . .  ",1),e("div",V,[l(p,{type:"primary",link:"",onClick:n},{default:h(()=>[_(" 关闭页面 ")]),_:1})])])])])])}}}),H=b(z,[["__scopeId","data-v-16a0e506"]]);export{H as default};
