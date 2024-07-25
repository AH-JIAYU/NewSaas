import api from '../index'

export default {
  // 获取个人信息
  list: () => api.post('user/getUserInfo'),
  // 修改个人信息
  edit: (data: any) => api.post('user/update', data,),
  // 上传头像
  uploadAvatar: (data: any) => api.post('user/uploadAvatar', data,),
}
