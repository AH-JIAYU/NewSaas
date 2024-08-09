import api from '../index'

export default {
  list: (data:any) => api.post('department/queryDepartment', data),

  create: (data: any) => api.post('department/insertDepartment', data,),

  edit: (data: any) => api.post('department/updateDepartment', data,),

  delete: (data:any) => api.post('department/deleteDepartment', data),
}
