import api from '../index'

export default {
  list: (data: {
    title?: string
    from: number
    limit: number
  }) => api.get('survey/bill_management/list', {
    params: data,
    baseURL: '/mock/',
  }),

  detail: (id: number | string) => api.get('survey/bill_management/detail', {
    params: {
      id,
    },
    baseURL: '/mock/',
  }),

  create: (data: any) => api.post('survey/bill_management/create', data, {
    baseURL: '/mock/',
  }),

  edit: (data: any) => api.post('survey/bill_management/edit', data, {
    baseURL: '/mock/',
  }),

  delete: (id: number | string) => api.post('survey/bill_management/delete', {
    id,
  }, {
    baseURL: '/mock/',
  }),
}
