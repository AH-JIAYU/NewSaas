import api from '../index'

export default {
  // 查询
  list: (data: any) => api.post('tenant-invoice/getTenantInvoices', data),
  // 新增
  create: (data: any) => api.post('tenant-invoice/insertTenantInvoice', data),
  // 修改
  edit: (data: any) => api.post('tenant-invoice/updateById', data),
  // 删除
  delete: (data:any) => api.post('tenant-invoice/deleteById', data),
  //客户下拉选
  queryAllInvitation: (data: any) => api.post('tenantBind/queryAllInvitation', data),
}
