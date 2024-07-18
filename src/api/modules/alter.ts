import api from '../index'

export default {
  list: (data:any) => api.post('tenant-update-record/get/getTenantUpdateRecordList', data),

  create: (data: any) => api.post('notice/insert/insertNotice', data,),

  edit: (data: any) => api.post('tenant-update-record/update/updateTenantUpdateRecord', data,),

  delete: (data:any) => api.post('notice/delete/deleteNotice', data),
}
