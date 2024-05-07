import api from '../index'

export default {
  list: (data: {
    title?: string
    from: number
    limit: number
  }) => api.get('other_functions/list', {
    params: data,
    baseURL: '/mock/',
  }),

  detail: (id: number | string) => api.get('other_functions/detail', {
    params: {
      id,
    },
    baseURL: '/mock/',
  }),

  create: (data: any) => api.post('other_functions/create', data, {
    baseURL: '/mock/',
  }),

  edit: (data: any) => api.post('other_functions/edit', data, {
    baseURL: '/mock/',
  }),

  delete: (id: number | string) => api.post('other_functions/delete', {
    id,
  }, {
    baseURL: '/mock/',
  }),
}
