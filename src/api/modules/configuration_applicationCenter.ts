import api from '../index'

export default {
  list: (data: any) => api.get('configuration/application_center/list', {
    params: data,
    baseURL: '/mock/',
  }),

  detail: (id: number | string) => api.get('configuration/application_center/detail', {
    params: {
      id,
    },
    baseURL: '/mock/',
  }),

  create: (data: any) => api.post('configuration/application_center/create', data, {
    baseURL: '/mock/',
  }),

  edit: (data: any) => api.post('configuration/application_center/edit', data, {
    baseURL: '/mock/',
  }),

  delete: (id: number | string) => api.post('configuration/application_center/delete', {
    id,
  }, {
    baseURL: '/mock/',
  }),
}
