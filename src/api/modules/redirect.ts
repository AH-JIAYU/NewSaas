import api from '../index'

export default {
  // 重定向
  redirection: (params: any) => api.get('callback/redirection', {params}),
}
