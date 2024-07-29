import api from '../index'

export default {
  list: (data:any) => api.post('tenant-update-record/get/getTenantUpdateRecordList', data),
}
