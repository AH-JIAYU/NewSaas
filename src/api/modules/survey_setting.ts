import api from '../index'

export default {
  list: (data: {
    title?: string
    from: number
    limit: number
  }) => api.get('survey/setting/list', {
    params: data,
    baseURL: '/mock/',
  }),

  detail: (id: number | string) => api.get('survey/setting/detail', {
    params: {
      id,
    },
    baseURL: '/mock/',
  }),

  create: (data: any) => api.post('survey/setting/create', data, {
    baseURL: '/mock/',
  }),

  edit: (data: any) => api.post('survey/setting/edit', data, {
    baseURL: '/mock/',
  }),

  delete: (id: number | string) => api.post('survey/setting/delete', {
    id,
  }, {
    baseURL: '/mock/',
  }),
}
