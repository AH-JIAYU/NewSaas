
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

async function d(n,t){const c=await(await fetch(n)).blob(),o=URL.createObjectURL(c),e=document.createElement("a");e.href=o,document.body.appendChild(e),e.download=t,e.click(),document.body.removeChild(e),URL.revokeObjectURL(o)}export{d as D};
