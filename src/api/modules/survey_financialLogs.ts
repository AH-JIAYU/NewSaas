import api from '../index'

export default {
  // 获取会员财务日志
  vipList: (data:any) => api.post('financial-record/getRecordList', data),

  detail: (id: number | string) => api.get('survey/financial_logs/detail', {
    params: {
      id,
    },
    baseURL: '/mock/',
  }),

  create: (data: any) => api.post('survey/financial_logs/create', data, {
    baseURL: '/mock/',
  }),

  edit: (data: any) => api.post('survey/financial_logs/edit', data, {
    baseURL: '/mock/',
  }),

  delete: (id: number | string) => api.post('survey/financial_logs/delete', {
    id,
  }, {
    baseURL: '/mock/',
  }),
}
