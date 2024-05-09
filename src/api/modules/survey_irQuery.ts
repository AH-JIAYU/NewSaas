import api from '../index'

export default {
  list: (data: {
    title?: string
    from: number
    limit: number
  }) => api.get('survey/ir_query/list', {
    params: data,
    baseURL: '/mock/',
  }),

  detail: (id: number | string) => api.get('survey/ir_query/detail', {
    params: {
      id,
    },
    baseURL: '/mock/',
  }),

  create: (data: any) => api.post('survey/ir_query/create', data, {
    baseURL: '/mock/',
  }),

  edit: (data: any) => api.post('survey/ir_query/edit', data, {
    baseURL: '/mock/',
  }),

  delete: (id: number | string) => api.post('survey/ir_query/delete', {
    id,
  }, {
    baseURL: '/mock/',
  }),
}
