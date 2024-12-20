import api from '../index'

export default {
  // 获取
  list: (data: any) => api.post('template/getHomePageTemplate', data),
  // 新增
  create: (data: any) => api.post('template/insertHomePageTemplate', data),
  // 修改
  edit: (data: any) => api.post('template/updateHomePageTemplate', data,),
  //删除
  del: (data: any) => api.post('template/deleteHomePageTemplate', data),
  //删除
  setHomePageTemplate: (data: any) => api.post('template/setHomePageTemplate', data),
    //上传图片
    uploadHomePageTemplateImage: (data: any) => api.post('template/uploadHomePageTemplateImage', data),
    //删除图片/api/template/deleteHomePageTemplate
    deleteHomePageTemplate: (data: any) => api.post('/template/deleteHomePageTemplate', data),
}
