import api from '../index'

export default {
  list: (data: {
    title?: string
    from: number
    limit: number
  }) => api.get('otherFunctions/screen_library/list', {
    params: data,
    baseURL: '/mock/',
  }),

  detail: (id: number | string) => api.get('otherFunctions/screen_library/detail', {
    params: {
      id,
    },
    baseURL: '/mock/',
  }),

  create: (data: any) => api.post('otherFunctions/screen_library/create', data, {
    baseURL: '/mock/',
  }),

  edit: (data: any) => api.post('otherFunctions/screen_library/edit', data, {
    baseURL: '/mock/',
  }),

  delete: (id: number | string) => api.post('otherFunctions/screen_library/delete', {
    id,
  }, {
    baseURL: '/mock/',
  }),
}
