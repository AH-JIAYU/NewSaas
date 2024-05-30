import api from '../index'

export default {
  // 获取列表
  list: (data: any) => api.post('tenantCustomer/getTenantCustomerList', data),
// 新增
  create: (data: any) => api.post('tenantCustomer/addTenantCustomer', data),
// 修改
  edit: (data: any) => api.post('role/edit', data, {
    baseURL: '/mock/',
  }),
// 删除
  delete: (id: number | string) => api.post('role/delete', {
    id,
  }, {
    baseURL: '/mock/',
  }),
}
