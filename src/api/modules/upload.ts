import api from '../index'

export default {
  // 上传头像
  uploadAvatar: (data: any) => api.post('user/uploadAvatar', data,),
}
