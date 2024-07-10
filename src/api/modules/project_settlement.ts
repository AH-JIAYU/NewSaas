import api from '../index'

export default {
  list: (data:any) => api.post('projectSettlement/get/getProjectSettlementList',data),

  // 项目结算审核
  review: (data:any) => api.post('projectSettlement/update/projectSettlement', data),

  edit: (data: any) => api.post('', data, ),

  delete: (id: number | string) => api.post('menu/delete', {
    id,
  }, {
    baseURL: '/mock/',
  }),
}
