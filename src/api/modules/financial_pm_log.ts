import api from '../index'

export default {
  // 查询组织架构业绩
  list: (data:any) => api.post('organizationalStructure/queryOrganizationalStructureRecordQueryAmount', data),
  // 更新成员账户
  updateDepartment: (data:any) => api.post('account/updateStaffAccount', data),
  // 查询组织架构财务日志
  getStaffFinancial: (data:any) => api.post('financial-record/queryOrganizationalStructureRecordQueryAmount', data),
}
