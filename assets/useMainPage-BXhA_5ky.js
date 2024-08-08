
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{n as l,G as m,l as f,H as c}from"./index-C4R2SyQS.js";import{u as g}from"./useTabbar-Y8D438u4.js";function d(){const s=l(),u=m(),t=f(),a=c(),o=g();function n(){u.push({name:"reload"})}function r(e){t.setCustomTitle(s.fullPath,e),t.settings.tabbar.enable&&a.setCustomTitle({tabId:o.getId(),title:e})}function i(){t.resetCustomTitle(s.fullPath),t.settings.tabbar.enable&&a.resetCustomTitle(o.getId())}function b(e){t.setMainPageMaximize(e)}return{reload:n,setCustomTitle:r,resetCustomTitle:i,maximize:b}}export{d as u};
