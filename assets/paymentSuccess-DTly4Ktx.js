
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{d as u,r as c,l as r,e as v,t as e,g as l,h as _,H as m,j as h,w as f,b as w,aI as I,aJ as S,o as g,N as b,R as y}from"./index-Bop26ruM.js";const x=s=>(I("data-v-16a0e506"),s=s(),S(),s),k={class:"page"},C={class:"paymentSuccess"},N={class:"icon"},B={class:"paymentStatus"},D=x(()=>e("div",{class:"status"},"支付成功",-1)),P={class:"countDown"},V={class:"closePage"},j=u({__name:"paymentSuccess",setup(s){const o=c(0),a=c(null),i=()=>{let t=5;o.value=5,a.value=setInterval(()=>{t>0?(t--,o.value=t):(clearInterval(a.value),o.value=0,a.value=null,n())},1e3)},n=()=>{window.open("about:blank","_self"),window.close()};return r(()=>{i()}),(t,z)=>{const d=b,p=w("el-button");return g(),v("div",k,[e("div",C,[e("div",N,[l(d,{name:"i-ep:success-filled",size:"60px",color:"#70b61b"})]),e("div",B,[D,e("div",P,[_(" 倒计时"+m(h(o))+"秒关闭页面 . . .  ",1),e("div",V,[l(p,{type:"primary",link:"",onClick:n},{default:f(()=>[_(" 关闭页面 ")]),_:1})])])])])])}}}),H=y(j,[["__scopeId","data-v-16a0e506"]]);export{H as default};
