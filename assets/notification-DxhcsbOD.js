
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{d as r,o as d,b as g,f as o,w as n,g as i,ar as $,K as k,ao as h,q as C,p as m}from"./index-Cw-g3-rV.js";import{u as P}from"./notification-CEjMGP92.js";const x=r({name:"PersonalNotification",__name:"notification",setup(N){const e=P();function _(){e.$patch(t=>{t.message+=1})}function f(){e.$patch(t=>{t.message-=t.message>0?1:0})}function l(){e.$patch(t=>{t.todo+=1})}function u(){e.$patch(t=>{t.todo-=t.todo>0?1:0})}return(t,B)=>{const p=$,a=k,s=h,c=C;return d(),g("div",null,[o(p,{title:"通知中心",content:"本页面仅模拟右上角通知数变化，具体业务逻辑请到 /src/store/modules/notification.ts 文件中编写"}),o(c,{title:"消息"},{default:n(()=>[o(s,{onClick:_},{default:n(()=>[o(a,{name:"i-ep:plus"}),i(" 1 ")]),_:1}),o(s,{"ml-2":"",onClick:f},{default:n(()=>[o(a,{name:"i-ep:minus"}),i(" 1 ")]),_:1})]),_:1}),o(c,{title:"待办"},{default:n(()=>[o(s,{onClick:l},{default:n(()=>[o(a,{name:"i-ep:plus"}),i(" 1 ")]),_:1}),o(s,{"ml-2":"",onClick:u},{default:n(()=>[o(a,{name:"i-ep:minus"}),i(" 1 ")]),_:1})]),_:1})])}}});typeof m=="function"&&m(x);export{x as default};
