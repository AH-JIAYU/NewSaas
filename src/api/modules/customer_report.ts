import api from '../index'

export default {
  list: (data:any) => api.post('/data-center/get/getDataCenterCustomer',data),
}
