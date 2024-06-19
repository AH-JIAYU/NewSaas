import api from '../index'

export default {
  // 获取列表
  list: () => api.post('member-config/get/getMemberConfig'),
  // 新增
  create: (data: any) => api.post('member-config/insert/insertMemberConfig', data),
  // 修改
  edit: (data: any) => api.post('member-config/update/updateMemberConfig', data),
}
