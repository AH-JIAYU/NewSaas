
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

const i={luck:function(t,e){if(e=e||1,t.length<e)return 0;let o=t;const r=t.length;let n=[];for(let c=0;c<e;c++){const l=Math.floor(Math.random()*(r-c));n.push(o[l]),o.splice(l,1)}return n},copyText:function(t,e,o){navigator.clipboard.writeText(t).then(()=>{e&&e()}).catch(r=>{o&&o()})},uniqueArray:function(t){return t.filter((e,o,r)=>r.indexOf(e)===o)},getDataType:function(t){return Object.prototype.toString.call(t)},sortArrayNum:function(t,e){let o=t.length;for(let r=0;r<o-1;r++)for(let n=0;n<o-1-r;n++)t[n]>t[n+1]&&([t[n],t[n+1]]=[t[n+1],t[n]]);return e?t.reverse():t},sortByNumber:function(t,e,o){if(Object.prototype.toString.call(t[0][e])==="[object Number]"){let r=t.sort((n,c)=>n[e]-c[e]);return o?r.reverse():r}return t},sortByletter:function(t,e,o){let r=t.sort((n,c)=>n[e].localeCompare(c[e],"zh-Hans-CN"));return o?r.reverse():r},sortByTime:function(t,e,o){const r=new Date(t[0][e]);if(Object.prototype.toString.call(r)==="[object Date]"){let n=t.sort((c,l)=>new Date(c[e])-new Date(l[e]));return o?n.reverse():n}return t}};export{i as d};
