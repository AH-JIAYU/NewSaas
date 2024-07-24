
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{d,o as r,b as g,f as t,w as n,g as i,at as k,L as $,aq as h,ak as C,aj as m}from"./index-BItR3vGR.js";import{u as P}from"./notification-RWfv6UJo.js";const x=d({name:"PersonalNotification",__name:"notification",setup(N){const e=P();function _(){e.$patch(o=>{o.message+=1})}function f(){e.$patch(o=>{o.message-=o.message>0?1:0})}function l(){e.$patch(o=>{o.todo+=1})}function u(){e.$patch(o=>{o.todo-=o.todo>0?1:0})}return(o,B)=>{const p=k,a=$,s=h,c=C;return r(),g("div",null,[t(p,{title:"通知中心",content:"本页面仅模拟右上角通知数变化，具体业务逻辑请到 /src/store/modules/notification.ts 文件中编写"}),t(c,{title:"消息"},{default:n(()=>[t(s,{onClick:_},{default:n(()=>[t(a,{name:"i-ep:plus"}),i(" 1 ")]),_:1}),t(s,{"ml-2":"",onClick:f},{default:n(()=>[t(a,{name:"i-ep:minus"}),i(" 1 ")]),_:1})]),_:1}),t(c,{title:"待办"},{default:n(()=>[t(s,{onClick:l},{default:n(()=>[t(a,{name:"i-ep:plus"}),i(" 1 ")]),_:1}),t(s,{"ml-2":"",onClick:u},{default:n(()=>[t(a,{name:"i-ep:minus"}),i(" 1 ")]),_:1})]),_:1})])}}});typeof m=="function"&&m(x);export{x as default};
