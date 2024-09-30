import api from '../index'

export default {
  // 获取列表
  list: () => api.post('tenant-web-config/getTenantWebConfig'),
  // 修改
  edit: (data: any) => api.post('tenant-web-config/updateTenantWebConfig', data),
  // 根据url获取解析列表
  getTenantWebConfigQueryAnalysis: (data: any) => api.post('tenant-web-config/getTenantWebConfigQueryAnalysis', data),
  // 上传证书
  uploadSSLCert: (data: any) => api.post('tenant-web-config/uploadSSLCert', data),
  // 判断域名是否备案
  getTenantWebConfigKeepOnRecord: (data: any) => api.post('tenant-web-config/getTenantWebConfigKeepOnRecord', data),
  // 获取记录值
  getBackgroundRecordList: (data: any) => api.post('record/getBackgroundRecordList', data),
  // 解析租户后台自定义域名
  addAnalyzeTenantBackground: (data: any) => api.post('record/addAnalyzeTenantBackground', data),
  // 解析供应商后台自定义域名
  addAnalyzeSupplierBackground: (data: any) => api.post('record/addAnalyzeSupplierBackground', data),
  // 解析租户会员后台自定义域名
  addAnalyzeMemberBackground: (data: any) => api.post('record/addAnalyzeMemberBackground', data),
}
