import api from '../index'

export default {
  list: (data:any) => api.post('tenant-update-record/getTenantUpdateRecordList', data),

  create: (data: any) => api.post('notice/insertNotice', data,),

  edit: (data: any) => api.post('tenant-update-record/updateTenantUpdateRecord', data,),

  delete: (data:any) => api.post('notice/deleteNotice', data),
}
