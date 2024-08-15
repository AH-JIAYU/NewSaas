import api from '../index'

export default {
  list: (data:any) => api.post('position/getPositionPage', data),

  create: (data: any) => api.post('position/insertPosition', data,),

  edit: (data: any) => api.post('position/updatePosition', data,),

  delete: (data:any) => api.post('position/deletePosition', data),
}
