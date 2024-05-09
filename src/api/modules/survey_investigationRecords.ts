import api from '../index'

export default {
  list: (data: {
    title?: string
    from: number
    limit: number
  }) => api.get('survey/investigation_records/list', {
    params: data,
    baseURL: '/mock/',
  }),

  detail: (id: number | string) => api.get('survey/investigation_records/detail', {
    params: {
      id,
    },
    baseURL: '/mock/',
  }),

  create: (data: any) => api.post('survey/investigation_records/create', data, {
    baseURL: '/mock/',
  }),

  edit: (data: any) => api.post('survey/investigation_records/edit', data, {
    baseURL: '/mock/',
  }),

  delete: (id: number | string) => api.post('survey/investigation_records/delete', {
    id,
  }, {
    baseURL: '/mock/',
  }),
}
