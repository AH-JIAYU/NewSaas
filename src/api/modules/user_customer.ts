import api from "../index";
import axios from "axios";

export default {
  // 获取列表
  list: (data: any) => api.post("tenantCustomer/getTenantCustomerList", data),
  // 查询单个
  detail: (data: any) => api.post("tenantCustomer/getTenantCustomerInfo", data),
  // 新增
  create: (data: any) => api.post("tenantCustomer/addTenantCustomer", data),
  // 修改 单个
  edit: (data: any) => api.post("tenantCustomer/updateTenantCustomer", data),
  // 修改 单个 状态
  changestatus: (data: any) =>
    api.post("tenantCustomer/updateTenantCustomerStatus", data),
  // 删除
  delete: (data: any) => api.post("tenantCustomer/deleteTenantCustomer", data),
  // 编辑类型日志
  getRecordList: (data: any) => api.post("tenantCustomer/getTenantCustomerOperationRecordList", data),
  // 获取客户列表-供应商页面用到
  getCustomerList: (data: any) => api.post("tenantCustomer/getTenantCustomerAccordList", data),
  // 获取加密方式
  getTenantSecretKeyConfigList: () => api.post('secret/getTenantSecretKeyConfigList'),
  //生成密钥
  generateKey: (data: any) => api.post('secret/generateKey', data),
};
