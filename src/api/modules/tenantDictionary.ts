import api from "../index";

export default {
// 字典目录
  list: (data: any) => api.post("tenant-dict/getDict", data),
  create: (data: any) => api.post("tenant-dict/insertDict", data),
  edit: (data: any) => api.post("tenant-dict/updateDictById", data),
  delete: (id: any) => api.post("tenant-dict/deleteDictById", { id }),
// 目录数据
  itemlist: (data: any) => api.post("tenant-dict/getDictDataSource", data),
  itemcreate: (data: any) => api.post("tenant-dict/insertDictDataSource", data),
  itemedit: (data: any) => api.post("tenant-dict/updateDictDataSource", data),
  itemdelete: (id: any) => api.post("tenant-dict/deleteDictDataSource", { id }),

};
