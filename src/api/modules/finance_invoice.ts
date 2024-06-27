import api from '../index'

export default {
  // 查询
  list: (data: any) => api.post('tenant-invoice/get/getTenantInvoices', data),
  // 新增
  create: (data: any) => api.post('tenant-invoice/insert/insertTenantInvoice', data),
  // 修改
  edit: (data: any) => api.post('tenant-invoice/update/updateById', data),
  // 删除
  delete: (data:any) => api.post('tenant-invoice/delete/deleteById', data),
}
