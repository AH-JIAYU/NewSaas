
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{d as b,y as g,c as N,j as d,f as k,w as y,k as S,z as T,A as j,B,_ as C,o as I,C as h,D as f}from"./index-B7Avs_NU.js";const D=b({name:"I18nSelector",__name:"index",setup(w){const e=T(),t=g(),_=N(()=>Object.keys(f).map(a=>({label:f[a],disabled:t.lang===a,handle:()=>p(a)}))),n=j(B,Function,!0);function p(a){var o,s,i,r,l,m,c,u;t.setDefaultLang(a),t.settings.app.routeBaseOn!=="filesystem"?(s=(o=e.meta.breadcrumbNeste)==null?void 0:o.at(-1))!=null&&s.i18n||(r=(i=e.meta.breadcrumbNeste)==null?void 0:i.at(-1))!=null&&r.title?t.setTitle(n((m=(l=e.meta.breadcrumbNeste)==null?void 0:l.at(-1))==null?void 0:m.i18n,(u=(c=e.meta.breadcrumbNeste)==null?void 0:c.at(-1))==null?void 0:u.title)):t.setTitle(n(e.meta.i18n,e.meta.title)):(e.meta.i18n||e.meta.title)&&t.setTitle(n(e.meta.i18n,e.meta.title))}return(a,o)=>{const s=C;return d(t).settings.toolbar.i18n?(I(),k(s,{key:0,items:[d(_)]},{default:y(()=>[h(a.$slots,"default")]),_:3},8,["items"])):S("",!0)}}});export{D as _};
