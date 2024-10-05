import api from '../index'

export default {
  // 查询组织架构
  list: (data: any) => api.post('organizationalStructure/queryOrganizationalStructure', data),
  // 根据组织架构id查询员工列表
  itemlist: (data: any) => api.post('staff/queryStaffListByStructureId', data),
  // 新增组织架构
  create: (data: any) => api.post('organizationalStructure/insertOrganizationalStructure', data,),
  // 修改组织架构
  edit: (data: any) => api.post('organizationalStructure/updateOrganizationalStructure', data,),
  // 删除组织架构
  delete: (data: any) => api.post('organizationalStructure/deleteOrganizationalStructure', data),
  // // 查询全部部门成员
  // createEvery: () => api.post('department/getDepartmentStaffList',),
  // // 查询部门小组
  // departmentGroup: (data: any) => api.post('department/getDepartmentGroupList',data),
  // // 查询部门详情
  // detail: (data: any) => api.post('department/getDepartmentQueryDetails', data),
}
