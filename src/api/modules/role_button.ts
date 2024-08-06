import api from '../index'

export default {
  list: () => api.get('role/getRoleButton',),
}
