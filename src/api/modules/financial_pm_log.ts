import api from '../index'

export default {
  // 查询组织架构业绩
  list: (data:any) => api.post('organizationalStructure/queryOrganizationalStructureRecordQueryAmount', data),
  // 组织架构账户加减款
  additionAndSubtraction: (data:any) => api.post('organizationalStructure/additionAndSubtraction', data),
  // 查询组织架构财务日志
  getStaffFinancial: (data:any) => api.post('financial-record/queryOrganizationalStructureRecordQueryAmount', data),
  //组织架构结算
  organizationalStructureSettlement: (data:any) => api.post('organizationalStructure/organizationalStructureSettlement', data),
}
