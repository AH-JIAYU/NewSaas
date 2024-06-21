import api from '../index'

export default {
  list: () => api.post('role/get/getRoleList'),

  create: (data: any) => api.post('role/insert/insertRole', data),

  edit: (data: any) => api.post('role/update/updateRole', data),

  delete: (data:any) => api.post('role/delete/deleteRole', data),

}
