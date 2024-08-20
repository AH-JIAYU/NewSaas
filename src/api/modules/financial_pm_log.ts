import api from '../index'

export default {
  list: (data:any) => api.post('account/getStaffAccount', data),
  // 更新成员账户
  updateDepartment: (data:any) => api.post('account/updateStaffAccount', data),
  // 员工财务日志列表
  getStaffFinancial: (data:any) => api.post('staff-financial-record/getTenantStaffFinancialRecordList', data),
}
