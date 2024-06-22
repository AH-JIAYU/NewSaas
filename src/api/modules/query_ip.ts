import api from '../index'

export default {
  list: (data: any) => api.post('other-ip/get/getIpInfo', data),
}
