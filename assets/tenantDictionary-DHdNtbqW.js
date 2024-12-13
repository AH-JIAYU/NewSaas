
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{k as e}from"./index-s461RT_G.js";const a={list:t=>e.post("tenant-dict/getDict",t),create:t=>e.post("tenant-dict/insertDict",t),edit:t=>e.post("tenant-dict/updateDictById",t),delete:t=>e.post("tenant-dict/deleteDictById",{id:t}),itemlist:t=>e.post("tenant-dict/getDictDataSource",t),itemcreate:t=>e.post("tenant-dict/insertDictDataSource",t),itemedit:t=>e.post("tenant-dict/updateDictDataSource",t),itemdelete:t=>e.post("tenant-dict/deleteDictDataSource",{id:t})};export{a};
