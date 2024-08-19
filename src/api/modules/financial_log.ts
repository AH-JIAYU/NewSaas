import api from '../index'

export default {
  list: (data:any) => api.post('staff-financial-record/getTenantStaffFinancialRecordList', data),
}
