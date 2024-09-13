import api from '../index'

export default {
  // 获取列表
  list: () => api.post('tenant-web-config/getTenantWebConfig'),
  // 修改
  edit: (data: any) => api.post('tenant-web-config/updateTenantWebConfig', data),
}
