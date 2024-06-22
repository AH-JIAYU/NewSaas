import api from '../index'

export default {
  // 获取
  list: (data: any) => api.post('staff/get/getStaffList',data),
  // 新增
  create: (data: any) => api.post('staff/insertStaff', data),
  // 修改
  edit: (data: any) => api.post('staff/updateStaff', data),
  // 删除
  delete: (data:any) => api.post('staff/deleteStaff', data),
  // 员工退出登录
  logout: () => api.post('staff/logout'),
}
