import api from "../index";

export default {
// 字典目录
  list: (data: any) => api.post("tenant-dict/get/getDict", data),
  create: (data: any) => api.post("tenant-dict/insert/insertDict", data),
  edit: (data: any) => api.post("tenant-dict/update/updateDictById", data),
  delete: (id: any) => api.post("tenant-dict/delete/deleteDictById", { id }),
// 目录数据
  itemlist: (data: any) => api.post("tenant-dict/get/getDictDataSource", data),
  itemcreate: (data: any) => api.post("tenant-dict/insert/insertDictDataSource", data),
  itemedit: (data: any) => api.post("tenant-dict/update/updateDictDataSource", data),
  itemdelete: (id: any) => api.post("tenant-dict/delete/deleteDictDataSource", { id }),

};
