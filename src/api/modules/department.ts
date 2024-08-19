import api from '../index'

export default {
  list: (data: any) => api.post('department/queryDepartment', data),

  create: (data: any) => api.post('department/insertDepartment', data,),
  // 查询全部部门成员
  createEvery: () => api.post('department/getDepartmentStaffList',),
  // 查询部门小组
  departmentGroup: (data: any) => api.post('department/getDepartmentGroupList',data),

  edit: (data: any) => api.post('department/updateDepartment', data,),

  delete: (data: any) => api.post('department/deleteDepartment', data),
  // 查询部门详情
  detail: (data: any) => api.post('department/getDepartmentQueryDetails', data),
}
