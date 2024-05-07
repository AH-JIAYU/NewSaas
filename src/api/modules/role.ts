import api from '../index'

export default {
  list: (data: {
    name?: string
    from: number
    limit: number
  }) => api.get('role/list', {
    params: data,
    baseURL: '/mock/',
  }),

  detail: (id: number | string) => api.get('role/detail', {
    params: {
      id,
    },
    baseURL: '/mock/',
  }),

  create: (data: any) => api.post('role/create', data, {
    baseURL: '/mock/',
  }),

  edit: (data: any) => api.post('role/edit', data, {
    baseURL: '/mock/',
  }),

  delete: (id: number | string) => api.post('role/delete', {
    id,
  }, {
    baseURL: '/mock/',
  }),

  allList: () => api.get('role/allList', {
    baseURL: '/mock/',
  }),
}
