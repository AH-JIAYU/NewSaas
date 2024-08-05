import api from '../index'

export default {
  // 获取列表
  list: () => api.post('supplier-config/getSupplierConfig'),
  // 新增
  create: (data: any) => api.post('supplier-config/insertSupplierConfig', data),
  // 修改
  edit: (data: any) => api.post('supplier-config/updateSupplierConfig', data),
}
