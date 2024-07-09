import api from "../index";

export default {
  // 获取列表
  list: (data: any) => api.post("tenantSupplier/getSupplierMemberChild", data),
};
