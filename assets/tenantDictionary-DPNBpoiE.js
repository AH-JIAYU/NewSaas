
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{k as e}from"./index-AlQFjtA_.js";const a={list:t=>e.post("tenant-dict/get/getDict",t),create:t=>e.post("tenant-dict/insert/insertDict",t),edit:t=>e.post("tenant-dict/update/updateDictById",t),delete:t=>e.post("tenant-dict/delete/deleteDictById",{id:t}),itemlist:t=>e.post("tenant-dict/get/getDictDataSource",t),itemcreate:t=>e.post("tenant-dict/insert/insertDictDataSource",t),itemedit:t=>e.post("tenant-dict/update/updateDictDataSource",t),itemdelete:t=>e.post("tenant-dict/delete/deleteDictDataSource",{id:t})};export{a};
