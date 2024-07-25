import api from '../index'

export default {
  // 获取列表
  list: (data:any) => api.post('projectSettlement/get/getProjectSettlementList',data),

  // 项目结算审核
  review: (data:any) => api.post('projectSettlement/update/projectSettlement', data),

  // 项目结算修改
  edit: (data: any) => api.post('projectSettlement/update/updateProjectSettlement', data, ),

  // 项目退款详情
  detail: (data: any) => api.post('projectSettlement/get/getProjectSettlementRefundList', data, ),

  // 新增遗漏项目
  omissionProject: (data: any) => api.post('projectSettlement/insert/insertProjectSettlement', data, ),

  // 项目结算-开票或者结算状态修改
  InvoicingSettlementEdit: (data: any) => api.post('projectSettlement/updateProjectSettlementStatus', data, ),

  delete: (id: number | string) => api.post('menu/delete', {
    id,
  }, {
    baseURL: '/mock/',
  }),
}
