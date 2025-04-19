
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

async function l(t,n){let o=t,c=new Blob([o],{type:"application/vnd.ms-excel;charset=utf-8"}),a=window.URL.createObjectURL(c),e=document.createElement("a");e.href=a,e.download=n,e.click(),window.URL.revokeObjectURL(e)}export{l as f};
