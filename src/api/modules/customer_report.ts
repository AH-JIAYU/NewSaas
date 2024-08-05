import api from '../index'

export default {

  // 客户报告
  reportList: (data: any) => api.post('data-center/getDataCenterCustomer', data),

  // 客户审核
  auditingList: (data: any) => api.post('data-center/getDataCenterCustomerSettlement', data),
}
