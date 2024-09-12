
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{d as u,r as c,k as r,b as v,s as e,f as l,g as _,H as m,i as f,w as h,a as w,aG as S,aH as g,o as I,N as b,R as y}from"./index-Czfzf8F4.js";const k=s=>(S("data-v-16a0e506"),s=s(),g(),s),x={class:"page"},C={class:"paymentSuccess"},N={class:"icon"},B={class:"paymentStatus"},D=k(()=>e("div",{class:"status"},"支付成功",-1)),P={class:"countDown"},V={class:"closePage"},H=u({__name:"paymentSuccess",setup(s){const o=c(0),a=c(null),i=()=>{let t=5;o.value=5,a.value=setInterval(()=>{t>0?(t--,o.value=t):(clearInterval(a.value),o.value=0,a.value=null,n())},1e3)},n=()=>{window.open("about:blank","_self"),window.close()};return r(()=>{i()}),(t,z)=>{const d=b,p=w("el-button");return I(),v("div",x,[e("div",C,[e("div",N,[l(d,{name:"i-ep:success-filled",size:"60px",color:"#70b61b"})]),e("div",B,[D,e("div",P,[_(" 倒计时"+m(f(o))+"秒关闭页面 . . .  ",1),e("div",V,[l(p,{type:"primary",link:"",onClick:n},{default:h(()=>[_(" 关闭页面 ")]),_:1})])])])])])}}}),G=y(H,[["__scopeId","data-v-16a0e506"]]);export{G as default};
