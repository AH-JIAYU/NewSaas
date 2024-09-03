import api from '../index'

export default {
  list: (data:any) => api.post('role/getRoleList',data),

  create: (data: any) => api.post('role/insertRole', data),

  edit: (data: any) => api.post('role/updateRole', data),

  delete: (data:any) => api.post('role/deleteRole', data),

}
