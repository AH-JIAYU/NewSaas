import api from "../index";

export default {
  // 字典目录
  list: (data: any) => api.get("dict/get/getDict"),
  // 目录数据
  itemlist: (id: string | number) =>
    api.get(`dict/get/getDictDataSourceByDictId/${id}`),
};
