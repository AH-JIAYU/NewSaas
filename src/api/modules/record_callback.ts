import api from "../index";

export default {
  list: (data: any) => api.post("callback/getCustomerCallbackRecordList", data),
  // 获取客户列表-供应商页面用到
  getCustomerList: (data: any) => api.post("tenantCustomer/getTenantCustomerAccordList", data),
  // 客户列表集合
  getCustomerCooperation: (data: any) =>
    api.post("tenantSupplier/getCustomerCooperation", data),
};
