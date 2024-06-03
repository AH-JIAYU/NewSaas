import api from '../index'

export default {
  list: (data: any) => api.get('survey/data/list', {
    params: data,
    baseURL: '/mock/',
  }),

  detail: (id: number | string) => api.get('survey/data/detail', {
    params: {
      id,
    },
    baseURL: '/mock/',
  }),

  create: (data: any) => api.post('survey/data/create', data, {
    baseURL: '/mock/',
  }),

  edit: (data: any) => api.post('survey/data/edit', data, {
    baseURL: '/mock/',
  }),

  delete: (id: number | string) => api.post('survey/data/delete', {
    id,
  }, {
    baseURL: '/mock/',
  }),
}
