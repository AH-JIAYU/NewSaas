import api from "../index";

export default {
  // 供应商账单列表
  list: (data: any) => api.post("bill/getTenantSupplierBillList", data),
  // 供应商账单状态修改
  changestatus: (data: any) => api.post("bill/updateTenantSupplierBill", data),
};
