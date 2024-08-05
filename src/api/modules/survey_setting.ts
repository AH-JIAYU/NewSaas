import api from '../index'

export default {
  // 获取列表
  list: () => api.post('member-config/getMemberConfig'),
  // 新增
  create: (data: any) => api.post('member-config/insertMemberConfig', data),
  // 修改
  edit: (data: any) => api.post('member-config/updateMemberConfig', data),
}
