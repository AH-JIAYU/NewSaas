
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{d as _,v as g,c as N,i as d,e as j,w as k,j as S,H as T,ab as y,ai as I,aj as h,o as w,M as x,ak as b}from"./index-C9ZUjx-r.js";const D=_({name:"I18nSelector",__name:"index",setup(B){const e=T(),t=g(),f=N(()=>Object.keys(b).map(a=>({label:b[a],disabled:t.lang===a,handle:()=>p(a)}))),n=y(I,Function,!0);function p(a){var i,s,o,r,l,m,c,u;t.setDefaultLang(a),t.settings.app.routeBaseOn!=="filesystem"?(s=(i=e.meta.breadcrumbNeste)==null?void 0:i.at(-1))!=null&&s.i18n||(r=(o=e.meta.breadcrumbNeste)==null?void 0:o.at(-1))!=null&&r.title?t.setTitle(n((m=(l=e.meta.breadcrumbNeste)==null?void 0:l.at(-1))==null?void 0:m.i18n,(u=(c=e.meta.breadcrumbNeste)==null?void 0:c.at(-1))==null?void 0:u.title)):t.setTitle(n(e.meta.i18n,e.meta.title)):(e.meta.i18n||e.meta.title)&&t.setTitle(n(e.meta.i18n,e.meta.title))}return(a,i)=>{const s=h;return d(t).settings.toolbar.i18n?(w(),j(s,{key:0,items:[d(f)]},{default:k(()=>[x(a.$slots,"default")]),_:3},8,["items"])):S("",!0)}}});export{D as _};
