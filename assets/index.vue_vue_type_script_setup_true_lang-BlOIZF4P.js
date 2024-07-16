
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{d as b,q as g,c as N,i as d,e as y,w as S,j as T,s as j,t as k,v as x,_ as I,o as h,x as w,y as _}from"./index-DTbZy0mB.js";const D=b({name:"I18nSelector",__name:"index",setup(B){const e=j(),t=g(),f=N(()=>Object.keys(_).map(a=>({label:_[a],disabled:t.lang===a,handle:()=>p(a)}))),n=k(x,Function,!0);function p(a){var i,s,o,r,l,m,c,u;t.setDefaultLang(a),t.settings.app.routeBaseOn!=="filesystem"?(s=(i=e.meta.breadcrumbNeste)==null?void 0:i.at(-1))!=null&&s.i18n||(r=(o=e.meta.breadcrumbNeste)==null?void 0:o.at(-1))!=null&&r.title?t.setTitle(n((m=(l=e.meta.breadcrumbNeste)==null?void 0:l.at(-1))==null?void 0:m.i18n,(u=(c=e.meta.breadcrumbNeste)==null?void 0:c.at(-1))==null?void 0:u.title)):t.setTitle(n(e.meta.i18n,e.meta.title)):(e.meta.i18n||e.meta.title)&&t.setTitle(n(e.meta.i18n,e.meta.title))}return(a,i)=>{const s=I;return d(t).settings.toolbar.i18n?(h(),y(s,{key:0,items:[d(f)]},{default:S(()=>[w(a.$slots,"default")]),_:3},8,["items"])):T("",!0)}}});export{D as _};
