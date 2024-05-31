
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{k as e}from"./index-AWq_1fCc.js";const c={list:t=>e.post("dict/get/getDict",t),create:t=>e.post("dict/insert/insertDict",t),edit:t=>e.post("dict/update/updateDictById",t),delete:t=>e.post("dict/delete/deleteDictById",{id:t}),itemlist:t=>e.post("dict/get/getDictDataSource",t),itemcreate:t=>e.post("dict/insert/insertDictDataSource",t),itemedit:t=>e.post("dict/update/updateDictDataSource",t),itemdelete:t=>e.post("dict/delete/deleteDictDataSource",{id:t})};export{c as a};
