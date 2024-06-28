import api from "../index";

export default {
  // 获取集合
  list: (data: AnalyserNode) =>
    api.post("tenantSupplierLevel/getTenantSupplierLevelList  ", data),
  // 新增
  create: (data: any) => api.post("tenantSupplierLevel/addTenantSupplierLevel", data),
  // 编辑
  edit: (data: any) => api.post("tenantSupplierLevel/updateTenantSupplierLevel", data),
  // 删除
  delete: (data: any) => api.post("tenantSupplierLevel/deleteTenantSupplierLevel", data),
  // 查询供应商等级-新增-修改供应商调用此接口
  getLevelNameList: (data: any) =>
    api.post("tenantSupplierLevel/getTenantSupplierLevelName", data),
};
