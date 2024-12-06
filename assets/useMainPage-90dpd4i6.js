
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{H as m,I as l,v as f,J as c}from"./index-CKRAJm3S.js";import{u as g}from"./useTabbar-p2C0mSqT.js";function d(){const s=m(),u=l(),t=f(),a=c(),o=g();function r(){u.push({name:"reload"})}function n(e){t.setCustomTitle(s.fullPath,e),t.settings.tabbar.enable&&a.setCustomTitle({tabId:o.getId(),title:e})}function i(){t.resetCustomTitle(s.fullPath),t.settings.tabbar.enable&&a.resetCustomTitle(o.getId())}function b(e){t.setMainPageMaximize(e)}return{reload:r,setCustomTitle:n,resetCustomTitle:i,maximize:b}}export{d as u};
