import api from '../index'

export default {
  list: () => api.get('menu/list', {
    baseURL: '/mock/',
  }),

  detail: (id: number | string) => api.get('menu/detail', {
    params: {
      id,
    },
    baseURL: '/mock/',
  }),

  create: (data: any) => api.post('menu/create', data, {
    baseURL: '/mock/',
  }),

  edit: (data: any) => api.post('menu/edit', data, {
    baseURL: '/mock/',
  }),

  delete: (id: number | string) => api.post('menu/delete', {
    id,
  }, {
    baseURL: '/mock/',
  }),
}
