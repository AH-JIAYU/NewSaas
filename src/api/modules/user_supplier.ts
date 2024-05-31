import api from "../index";

export default {
  // 获取列表
  list: (data: any) => api.post("tenantSupplier/getTenantSupplierList", data),
  // 查询单个
  detail: (data: any) => api.post("tenantCustomer/getTenantCustomerInfo", data),
  // 新增
  create: (data: any) => api.post("tenantCustomer/addTenantCustomer", data),
  // 修改 单个
  edit: (data: any) => api.post("tenantCustomer/updateTenantCustomer", data),
  // 修改 单个 状态
  editState: (data: any) =>
    api.post("tenantCustomer/updateTenantCustomerStatus", data),
  // 删除
  delete: (data: any) => api.post("tenantCustomer/deleteTenantCustomer", data),
  // 编辑类型日志
  getRecordList: (data: any) => api.post("tenantCustomer/getTenantCustomerOperationRecordList", data),
};
