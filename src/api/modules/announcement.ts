import api from '../index'

export default {
  list: (data:any) => api.post('notice/get/getNotice', data),

  create: (data: any) => api.post('notice/insert/insertNotice', data,),

  edit: (data: any) => api.post('notice/update/updateNotice', data,),

  delete: (data:any) => api.post('notice/delete/deleteNotice', data),
}
