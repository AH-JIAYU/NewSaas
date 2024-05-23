import api from '../index'

export default {
  list: () => api.get('dictionary/list', {
    baseURL: '/mock/',
  }),

  detail: (id: number | string) => api.get('dictionary/detail', {
    params: {
      id,
    },
    baseURL: '/mock/',
  }),

  create: (data: any) => api.post('dictionary/create', data, {
    baseURL: '/mock/',
  }),

  edit: (data: any) => api.post('dictionary/edit', data, {
    baseURL: '/mock/',
  }),

  delete: (id: number | string) => api.post('dictionary/delete', {
    id,
  }, {
    baseURL: '/mock/',
  }),

  itemList: (data: {
    dictionary_id: number | string
    title?: string
    from: number
    limit: number
  }) => api.get('dictionary/item/list', {
    params: data,
    baseURL: '/mock/',
  }),

  itemDetail: (id: number | string) => api.get('dictionary/item/detail', {
    params: {
      id,
    },
    baseURL: '/mock/',
  }),

  itemCreate: (data: any) => api.post('dictionary/item/create', data, {
    baseURL: '/mock/',
  }),

  itemEdit: (data: any) => api.post('dictionary/item/edit', data, {
    baseURL: '/mock/',
  }),

  itemDelete: (id: number | number[] | string | string[]) => api.post('dictionary/item/delete', {
    id,
  }, {
    baseURL: '/mock/',
  }),

  itemChangeEnable: (data: {
    id: number
    enable: boolean
  }) => api.post('dictionary/item/change/enable', data, {
    baseURL: '/mock/',
  }),

  get: (code: string) => api.get('dictionary/get', {
    params: {
      code,
    },
    baseURL: '/mock/',
  }),
}
