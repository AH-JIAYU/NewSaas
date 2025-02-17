
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{d as _,u as g,F as N,i as d,c as k,w as S,k as T,s as h,a7 as y,af as I,ag as j,b as w,A as x,ah as f}from"./index-D3JQ81m5.js";const D=_({name:"I18nSelector",__name:"index",setup(B){const e=h(),t=g(),b=N(()=>Object.keys(f).map(a=>({label:f[a],disabled:t.lang===a,handle:()=>p(a)}))),n=y(I,Function,!0);function p(a){var i,s,o,r,l,m,c,u;t.setDefaultLang(a),t.settings.app.routeBaseOn!=="filesystem"?(s=(i=e.meta.breadcrumbNeste)==null?void 0:i.at(-1))!=null&&s.i18n||(r=(o=e.meta.breadcrumbNeste)==null?void 0:o.at(-1))!=null&&r.title?t.setTitle(n((m=(l=e.meta.breadcrumbNeste)==null?void 0:l.at(-1))==null?void 0:m.i18n,(u=(c=e.meta.breadcrumbNeste)==null?void 0:c.at(-1))==null?void 0:u.title)):t.setTitle(n(e.meta.i18n,e.meta.title)):(e.meta.i18n||e.meta.title)&&t.setTitle(n(e.meta.i18n,e.meta.title))}return(a,i)=>{const s=j;return d(t).settings.toolbar.i18n?(w(),k(s,{key:0,items:[d(b)]},{default:S(()=>[x(a.$slots,"default")]),_:3},8,["items"])):T("",!0)}}});export{D as _};
