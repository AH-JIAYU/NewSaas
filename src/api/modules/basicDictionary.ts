import api from "../index";

export default {
  // 字典目录
  list: () => api.get("dict/getDict"),
  // 目录数据
  itemlist: (data: any) => api.post("dict/getDictDataSourceByDictId", data),
};
