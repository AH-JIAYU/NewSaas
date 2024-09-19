import api from '../index'

export default {
  // 获取列表
  list: () => api.post('tenant-web-config/getTenantWebConfig'),
  // 修改
  edit: (data: any) => api.post('tenant-web-config/updateTenantWebConfig', data),
  // 根据url获取解析列表
  getTenantWebConfigQueryAnalysis: (data: any) => api.post('tenant-web-config/getTenantWebConfigQueryAnalysis', data),
}
