import api from '../index'

export default {
  list: (data:any) => api.post('notice/getNotice', data),

  create: (data: any) => api.post('notice/insertNotice', data,),

  edit: (data: any) => api.post('notice/updateNotice', data,),

  delete: (data:any) => api.post('notice/deleteNotice', data),
}
