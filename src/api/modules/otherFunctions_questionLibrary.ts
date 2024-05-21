import api from '../index'

export default {
  list: (data: {
    title?: string
    from: number
    limit: number
  }) => api.get('otherFunctions/question_library/list', {
    params: data,
    baseURL: '/mock/',
  }),

  detail: (id: number | string) => api.get('otherFunctions/question_library/detail', {
    params: {
      id,
    },
    baseURL: '/mock/',
  }),

  create: (data: any) => api.post('otherFunctions/question_library/create', data, {
    baseURL: '/mock/',
  }),

  edit: (data: any) => api.post('otherFunctions/question_library/edit', data, {
    baseURL: '/mock/',
  }),

  delete: (id: number | string) => api.post('otherFunctions/question_library/delete', {
    id,
  }, {
    baseURL: '/mock/',
  }),
}
