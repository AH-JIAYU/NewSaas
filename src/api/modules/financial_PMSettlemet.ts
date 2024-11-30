import api from '../index'

export default {
  //组织架构结算
  queryOrganizationalStructureSettlementRecordList: (data:any) => api.post('financial-record/queryOrganizationalStructureSettlementRecordList', data),
  //组织架构结算
  organizationalStructureSettlement: (data:any) => api.post('organizationalStructure/organizationalStructureSettlement', data),
  //组织架构结算修改
  organizationalStructureSettlementUpdate: (data:any) => api.post('organizationalStructure/organizationalStructureSettlementUpdate', data),


}
