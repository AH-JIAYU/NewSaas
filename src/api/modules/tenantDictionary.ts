import api from "../index";

export default {
  // list: () => api.get('tenantDictionary/list', {
  //   baseURL: '/mock/',
  // }),
  list: (data: any) => api.post("dict/get/getDict", data),
  create: (data: any) => api.post("dict/insert/insertDict", data),
  edit: (data: any) => api.post("dict/update/updateDictById", data),
  delete: (id: any) => api.post("dict/delete/deleteDictById", { id }),

  itemlist: (data: any) => api.post("dict/get/getDictDataSource", data),
  itemcreate: (data: any) => api.post("dict/insert/insertDictDataSource", data),
  itemedit: (data: any) => api.post("dict/update/updateDictDataSource", data),
  itemdelete: (id: any) => api.post("dict/delete/deleteDictDataSource", { id }),

  // detail: (id: number | string) =>
  //   api.get("tenantDictionary/detail", {
  //     params: {
  //       id,
  //     },
  //     baseURL: "/mock/",
  //   }),

  // create: (data: any) =>
  //   api.post("tenantDictionary/create", data, {
  //     baseURL: "/mock/",
  //   }),

  // edit: (data: any) =>
  //   api.post("tenantDictionary/edit", data, {
  //     baseURL: "/mock/",
  //   }),

  // delete: (id: number | string) =>
  //   api.post(
  //     "tenantDictionary/delete",
  //     {
  //       id,
  //     },
  //     {
  //       baseURL: "/mock/",
  //     }
  //   ),

  // itemList: (data: {
  //   dictionary_id: number | string;
  //   title?: string;
  //   from: number;
  //   limit: number;
  // }) =>
  //   api.get("tenantDictionary/item/list", {
  //     params: data,
  //     baseURL: "/mock/",
  //   }),

  // itemDetail: (id: number | string) =>
  //   api.get("tenantDictionary/item/detail", {
  //     params: {
  //       id,
  //     },
  //     baseURL: "/mock/",
  //   }),

  // itemCreate: (data: any) =>
  //   api.post("tenantDictionary/item/create", data, {
  //     baseURL: "/mock/",
  //   }),

  // itemEdit: (data: any) =>
  //   api.post("tenantDictionary/item/edit", data, {
  //     baseURL: "/mock/",
  //   }),

  // itemDelete: (id: number | number[] | string | string[]) =>
  //   api.post(
  //     "tenantDictionary/item/delete",
  //     {
  //       id,
  //     },
  //     {
  //       baseURL: "/mock/",
  //     }
  //   ),

  // itemChangeEnable: (data: { id: number; enable: boolean }) =>
  //   api.post("tenantDictionary/item/change/enable", data, {
  //     baseURL: "/mock/",
  //   }),

  // get: (code: string) =>
  //   api.get("tenantDictionary/get", {
  //     params: {
  //       code,
  //     },
  //     baseURL: "/mock/",
  //   }),
};
