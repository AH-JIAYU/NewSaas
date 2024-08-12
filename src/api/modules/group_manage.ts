import api from '../index'

export default {
  list: (data:any) => api.post('group/getGroupPage', data),

  create: (data: any) => api.post('group/insertGroup', data,),

  edit: (data: any) => api.post('group/updateGroup', data,),

  delete: (data:any) => api.post('group/deleteGroup', data),
}
