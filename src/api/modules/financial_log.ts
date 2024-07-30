import api from '../index'

export default {
  list: (data:any) => api.post('financial-record/getTenantFinancialRecordList', data),
}
