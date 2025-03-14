
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{d as f,r as y,o as d,b as s,s as l,bd as g,i,v as o,aa as p,j as u,aI as b,aJ as x,M as A,an as m}from"./index-KFsg0x_i.js";const r=a=>(b("data-v-96faee3b"),a=a(),x(),a),K=r(()=>o("h2",null,"邮件配置",-1)),h=r(()=>o("option",{value:"sendgrid"}," SendGrid ",-1)),k=r(()=>o("option",{value:"mailgun"}," Mailgun ",-1)),I=[h,k],P={key:0},S={key:1},c=f({name:"Email",__name:"index",setup(a){const e=y({emailProvider:"sendgrid",sendGridApiKey:"",mailgunApiKey:""});function _(){}function v(){}return(C,t)=>(d(),s("div",null,[K,l(o("select",{"onUpdate:modelValue":t[0]||(t[0]=n=>i(e).emailProvider=n)},I,512),[[g,i(e).emailProvider]]),i(e).emailProvider==="sendgrid"?(d(),s("div",P,[l(o("input",{"onUpdate:modelValue":t[1]||(t[1]=n=>i(e).sendGridApiKey=n),type:"text",placeholder:"SendGrid API Key"},null,512),[[p,i(e).sendGridApiKey]])])):u("",!0),i(e).emailProvider==="mailgun"?(d(),s("div",S,[l(o("input",{"onUpdate:modelValue":t[2]||(t[2]=n=>i(e).mailgunApiKey=n),type:"text",placeholder:"Mailgun API Key"},null,512),[[p,i(e).mailgunApiKey]])])):u("",!0),o("button",{onClick:_}," 发送测试邮件 "),o("button",{onClick:v}," 保存配置 ")]))}});typeof m=="function"&&m(c);const M=A(c,[["__scopeId","data-v-96faee3b"]]);export{M as default};
