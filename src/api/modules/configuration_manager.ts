import api from '../index'

export default {
  // 获取
  list: (data: any) => api.post('staff/getStaffList',data),
  // 获取
  getTenantStaffListData: (data: any) => api.post('staff/getTenantStaffListData',data),
  // 新增
  create: (data: any) => api.post('staff/insertStaff', data),
  // 修改
  edit: (data: any) => api.post('staff/updateStaff', data),
  // 删除
  delete: (data:any) => api.post('staff/deleteStaff', data),
  // 重置员工密码
  reset: (data:any) => api.post('staff/resetPasswordStaff', data),
  // 查询未分配部门成员 分配部门
  undistributedDepartment: () => api.post('staff/getStaffListByNotDepartment'),
  // 查询部门成员 分配小组
  undistributedGroup: (data:any) => api.post('staff/getDepartmentStaffList', data),
  // 查询所有员工列表
  getTenantStaffList: () => api.post('staff/getTenantStaffList'),
  // 详情
  detail: () => api.post('staff/getTenantStaffList'),
  // 员工退出登录
  logout: () => api.post('staff/logout'),
}
