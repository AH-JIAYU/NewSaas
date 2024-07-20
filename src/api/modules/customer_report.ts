import api from '../index'

export default {

  // 客户报告
  reportList: (data: any) => api.post('/data-center/get/getDataCenterCustomer', data),

  // 客户审核
  auditingList: (data: any) => api.post('/data-center/get/getDataCenterCustomerSettlement', data),
}
