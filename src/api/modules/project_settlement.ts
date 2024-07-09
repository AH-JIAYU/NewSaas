import api from '../index'

export default {
  list: (data:any) => api.post('projectSettlement/get/getProjectSettlementList',data),

  review: (data:any) => api.post('projectSettlement/get/getProjectSettlementByProjectId', data),

  // 全部失败
  fail: (data: any) => api.post('projectSettlement/update/projectSettlementByFail', data,),
  // 全部成功
  success: (data: any) => api.post('projectSettlement/update/projectSettlementBySuccess', data,),
  // 按失败id
  failById: (data: any) => api.post('projectSettlement/update/projectSettlementFailById', data,),
  // 按成功id
  successById: (data: any) => api.post('projectSettlement/update/projectSettlementSuccessById', data,),
  // 数据冻结
  freeze: (data: any) => api.post('projectSettlement/update/projectSettlementFrozen', data,),

  edit: (data: any) => api.post('menu/edit', data, {
    baseURL: '/mock/',
  }),

  delete: (id: number | string) => api.post('menu/delete', {
    id,
  }, {
    baseURL: '/mock/',
  }),
}
