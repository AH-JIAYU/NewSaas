import api from '../index'

export default {
  // 获取列表
  list: (data:any) => api.post('projectSettlement/get/getProjectSettlementList',data),

  // 项目结算审核
  review: (data:any) => api.post('projectSettlement/update/projectSettlement', data),

  // 项目结算修改
  edit: (data: any) => api.post('projectSettlement/update/updateProjectSettlement', data, ),

  delete: (id: number | string) => api.post('menu/delete', {
    id,
  }, {
    baseURL: '/mock/',
  }),
}
