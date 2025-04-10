import api from "../index";

export default {
  // 获取列表
  list: (data: any) => api.post("tenantSupplier/getTenantSupplierList", data),
  // 查询单个
  detail: (data: any) => api.post("tenantSupplier/getTenantSupplierInfo", data),
  // 新增
  create: (data: any) => api.post("tenantSupplier/addTenantSupplier", data),
  // 修改 单个
  edit: (data: any) => api.post("tenantSupplier/updateTenantSupplier", data),
  // 修改 单个 状态
  changestatus: (data: any) =>
    api.post("tenantSupplier/updateTenantSupplierStatus", data),
  // 项目分配查询状态开启的供应商列表
  getTenantSupplierProjectList: (data: any) =>
    api.post("tenantSupplier/getTenantSupplierProjectList", data),
  // 供应商加减款
  getSupplierPlusMinusPaymentsList: (data: any) =>
    api.post("tenantSupplier/additionSubtractionSupplier", data),
  // 客户列表集合
  getCustomerCooperation: (data: any) =>
    api.post("tenantSupplier/getCustomerCooperation", data),
  // 合租租户列表集合
  getTenantSupplierInfo: (data: any) =>
    api.post("tenantSupplier/getTenantSupplierInfo", data),
  //操作日志  少一个total
  getOperationList: (data: any) =>
    api.post("tenantSupplier/getOperationList", data),
  //重置密码
  supplierResetPassword: (data: any) =>
    api.post("tenantSupplier/supplierResetPassword", data),
};
