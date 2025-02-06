
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{d as v,r as y,a as d,i as s,a3 as l,bf as g,h as i,b as o,a4 as p,j as u,aH as b,aI as h,y as x,an as m}from"./index-5r5nO7Oz.js";const r=a=>(b("data-v-96faee3b"),a=a(),h(),a),A=r(()=>o("h2",null,"邮件配置",-1)),K=r(()=>o("option",{value:"sendgrid"}," SendGrid ",-1)),k=r(()=>o("option",{value:"mailgun"}," Mailgun ",-1)),I=[K,k],P={key:0},S={key:1},c=v({name:"Email",__name:"index",setup(a){const e=y({emailProvider:"sendgrid",sendGridApiKey:"",mailgunApiKey:""});function _(){}function f(){}return(C,t)=>(d(),s("div",null,[A,l(o("select",{"onUpdate:modelValue":t[0]||(t[0]=n=>i(e).emailProvider=n)},I,512),[[g,i(e).emailProvider]]),i(e).emailProvider==="sendgrid"?(d(),s("div",P,[l(o("input",{"onUpdate:modelValue":t[1]||(t[1]=n=>i(e).sendGridApiKey=n),type:"text",placeholder:"SendGrid API Key"},null,512),[[p,i(e).sendGridApiKey]])])):u("",!0),i(e).emailProvider==="mailgun"?(d(),s("div",S,[l(o("input",{"onUpdate:modelValue":t[2]||(t[2]=n=>i(e).mailgunApiKey=n),type:"text",placeholder:"Mailgun API Key"},null,512),[[p,i(e).mailgunApiKey]])])):u("",!0),o("button",{onClick:_}," 发送测试邮件 "),o("button",{onClick:f}," 保存配置 ")]))}});typeof m=="function"&&m(c);const V=x(c,[["__scopeId","data-v-96faee3b"]]);export{V as default};
